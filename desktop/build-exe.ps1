Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$releaseDirectory = Join-Path $root "release"
$outDirectory = Join-Path $root "out"
$nodeExecutable = (Get-Command node -ErrorAction Stop).Source
$iexpressExecutable = Join-Path $env:WINDIR "System32\iexpress.exe"

if (-not (Test-Path -LiteralPath $iexpressExecutable -PathType Leaf)) {
    throw "IExpress was not found at $iexpressExecutable."
}

Write-Host "Building the static app..."
Push-Location $root
try {
    & pnpm run build
    if ($LASTEXITCODE -ne 0) {
        throw "The Next.js build failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}

if (-not (Test-Path -LiteralPath $outDirectory -PathType Container)) {
    throw "The build did not produce the expected out directory."
}

New-Item -ItemType Directory -Force -Path $releaseDirectory | Out-Null

# IExpress creates a single self-extracting executable, but its CAB payload is
# flat. The generated launcher restores the out/ directory before starting the
# bundled Node runtime, so the resulting EXE is still a portable app.
$stageDirectory = Join-Path ([IO.Path]::GetTempPath()) ("pokemon-title-atlas-exe-" + [Guid]::NewGuid().ToString("N"))
$temporaryExecutable = Join-Path ([IO.Path]::GetTempPath()) ("Pokemon-Title-Atlas-" + [Guid]::NewGuid().ToString("N") + ".exe")
$sedPath = Join-Path $stageDirectory "package.sed"
$outputExecutable = Join-Path $releaseDirectory "Pokemon-Title-Atlas.exe"
$flatFiles = [System.Collections.Generic.List[string]]::new()
$copyCommands = [System.Collections.Generic.List[string]]::new()
$createdDirectories = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)

New-Item -ItemType Directory -Force -Path $stageDirectory | Out-Null

function Add-PayloadFile {
    param(
        [Parameter(Mandatory = $true)] [string] $SourcePath,
        [Parameter(Mandatory = $true)] [string] $FlatName
    )

    Copy-Item -LiteralPath $SourcePath -Destination (Join-Path $stageDirectory $FlatName) -Force
    $flatFiles.Add($FlatName)
}

try {
    Add-PayloadFile -SourcePath $nodeExecutable -FlatName "node.exe"
    Add-PayloadFile -SourcePath (Join-Path $PSScriptRoot "serve.cjs") -FlatName "desktop-serve.cjs"

    $copyCommands.Add('if not exist "desktop" mkdir "desktop" >nul 2>nul')
    $copyCommands.Add('if not exist "out" mkdir "out" >nul 2>nul')
    $copyCommands.Add('copy /y "desktop-serve.cjs" "desktop\serve.cjs" >nul')

    $outFiles = @(Get-ChildItem -LiteralPath $outDirectory -File -Recurse | Sort-Object FullName)
    if ($outFiles.Count -eq 0) {
        throw "The out directory is empty."
    }

    $assetIndex = 0
    foreach ($file in $outFiles) {
        $relativePath = $file.FullName.Substring($outDirectory.Length).TrimStart('\', '/')
        $relativePath = $relativePath.Replace('/', '\')
        $flatName = "asset_{0:D6}.bin" -f $assetIndex
        $assetIndex++

        Add-PayloadFile -SourcePath $file.FullName -FlatName $flatName

        $targetPath = "out\$relativePath"
        $targetDirectory = Split-Path -Parent $targetPath
        if ($targetDirectory -and $createdDirectories.Add($targetDirectory)) {
            $copyCommands.Add(('if not exist "{0}" mkdir "{0}" >nul 2>nul' -f $targetDirectory))
        }
        $copyCommands.Add(('copy /y "{0}" "{1}" >nul' -f $flatName, $targetPath))
    }

    $launcherLines = [System.Collections.Generic.List[string]]::new()
    $launcherLines.Add('@echo off')
    $launcherLines.Add('setlocal EnableExtensions')
    $launcherLines.Add('cd /d "%~dp0"')
    $launcherLines.Add('if not exist "node.exe" (')
    $launcherLines.Add('  echo The bundled Node runtime could not be found.')
    $launcherLines.Add('  pause')
    $launcherLines.Add('  exit /b 1')
    $launcherLines.Add(')')
    foreach ($command in $copyCommands) {
        $launcherLines.Add($command)
    }
    $launcherLines.Add('if not exist "desktop\serve.cjs" (')
    $launcherLines.Add('  echo The app files could not be restored from the executable.')
    $launcherLines.Add('  pause')
    $launcherLines.Add('  exit /b 1')
    $launcherLines.Add(')')
    $launcherLines.Add('"node.exe" "desktop\serve.cjs" --open')
    $launcherLines.Add('set "exitCode=%ERRORLEVEL%"')
    $launcherLines.Add('if not "%exitCode%"=="0" (')
    $launcherLines.Add('  echo The local server stopped with exit code %exitCode%.')
    $launcherLines.Add('  pause')
    $launcherLines.Add(')')
    $launcherLines.Add('endlocal & exit /b %exitCode%')
    $launcherPath = Join-Path $stageDirectory "launch.cmd"
    Set-Content -LiteralPath $launcherPath -Value $launcherLines -Encoding ASCII
    $flatFiles.Add("launch.cmd")

    $sedLines = [System.Collections.Generic.List[string]]::new()
    $sedLines.Add('[Version]')
    $sedLines.Add('Class=IEXPRESS')
    $sedLines.Add('SEDVersion=3')
    $sedLines.Add('[Options]')
    $sedLines.Add('PackagePurpose=InstallApp')
    $sedLines.Add('ShowInstallProgramWindow=1')
    $sedLines.Add('HideExtractAnimation=1')
    $sedLines.Add('UseLongFileName=1')
    $sedLines.Add('InsideCompressed=1')
    $sedLines.Add('CAB_FixedSize=0')
    $sedLines.Add('CAB_ResvCodeSigning=0')
    $sedLines.Add('RebootMode=N')
    $sedLines.Add('InstallPrompt=%InstallPrompt%')
    $sedLines.Add('DisplayLicense=%DisplayLicense%')
    $sedLines.Add('FinishMessage=%FinishMessage%')
    $sedLines.Add('TargetName=%TargetName%')
    $sedLines.Add('FriendlyName=%FriendlyName%')
    $sedLines.Add('AppLaunched=%AppLaunched%')
    $sedLines.Add('PostInstallCmd=%PostInstallCmd%')
    $sedLines.Add('AdminQuietInstCmd=%AdminQuietInstCmd%')
    $sedLines.Add('UserQuietInstCmd=%UserQuietInstCmd%')
    $sedLines.Add('SourceFiles=SourceFiles')
    $sedLines.Add('[Strings]')
    $sedLines.Add('InstallPrompt=')
    $sedLines.Add('DisplayLicense=')
    $sedLines.Add('FinishMessage=')
    $sedLines.Add("TargetName=$temporaryExecutable")
    $sedLines.Add('FriendlyName=Pokemon Title Atlas')
    $sedLines.Add('AppLaunched=cmd.exe /d /s /c ""launch.cmd""')
    $sedLines.Add('PostInstallCmd=<None>')
    $sedLines.Add('AdminQuietInstCmd=')
    $sedLines.Add('UserQuietInstCmd=')

    for ($fileIndex = 0; $fileIndex -lt $flatFiles.Count; $fileIndex++) {
        $sedLines.Add(('FILE{0}={1}' -f $fileIndex, $flatFiles[$fileIndex]))
    }

    $sedLines.Add('[SourceFiles]')
    $sedLines.Add("SourceFiles0=$stageDirectory\")
    $sedLines.Add('[SourceFiles0]')
    for ($fileIndex = 0; $fileIndex -lt $flatFiles.Count; $fileIndex++) {
        $sedLines.Add(('%FILE{0}%' -f $fileIndex) + '=')
    }
    Set-Content -LiteralPath $sedPath -Value $sedLines -Encoding ASCII

    Write-Host "Creating $outputExecutable ..."
    $iexpressProcess = Start-Process -FilePath $iexpressExecutable -ArgumentList @('/N', '/Q', '/M', $sedPath) -Wait -PassThru
    if ($iexpressProcess.ExitCode -ne 0 -or -not (Test-Path -LiteralPath $temporaryExecutable -PathType Leaf)) {
        throw "IExpress failed to create the executable."
    }

    Copy-Item -LiteralPath $temporaryExecutable -Destination $outputExecutable -Force
    $sizeMb = [Math]::Round((Get-Item -LiteralPath $outputExecutable).Length / 1MB, 1)
    Write-Host "Created $outputExecutable ($sizeMb MB)."
    Write-Host "This executable is unsigned; Windows SmartScreen may show a warning on first launch."
}
finally {
    if (Test-Path -LiteralPath $stageDirectory) {
        Remove-Item -LiteralPath $stageDirectory -Recurse -Force
    }
    if (Test-Path -LiteralPath $temporaryExecutable) {
        Remove-Item -LiteralPath $temporaryExecutable -Force
    }
}
