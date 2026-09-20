export type PhaseId = "orre" | "gba-ds" | "bank" | "alola" | "switch" | "champions";

export type TitleStep = {
  id: string;
  title: string;
  ribbon: string;
  game: string;
  location?: string;
  phase: PhaseId;
  how: string;
  detail?: string;
  bankCritical?: boolean;
  conditional?: boolean;
  source: string;
};

export type CandidateGap = {
  titleId: string;
  reason: string;
  source: string;
};

export type Candidate = {
  id: string;
  name: string;
  number: string;
  generation: 1 | 2 | 3 | 4;
  shadowBase: string;
  originGame: "Colosseum" | "XD";
  route: string;
  tags: string[];
  sprite: string;
  spritePage: string;
  availabilitySource: string;
  gaps: CandidateGap[];
  maxTitles: number;
  regularTitles: number;
};

export type RedditCallout = {
  label: string;
  title: string;
  summary: string;
  items: string[];
  note?: string;
  source: string;
};

export const SOURCES = {
  reddit: "https://www.reddit.com/r/PokemonHome/comments/1apiuee/pok%C3%A9mon_bank_exclusives_masterpost/",
  ribbons: "https://bulbapedia.bulbagarden.net/wiki/List_of_Ribbons_in_the_games",
  marks: "https://bulbapedia.bulbagarden.net/wiki/Mark",
  shadow: "https://bulbapedia.bulbagarden.net/wiki/List_of_Shadow_Pok%C3%A9mon",
  originMarks: "https://bulbapedia.bulbagarden.net/wiki/Origin_mark",
  homeChallenges: "https://bulbapedia.bulbagarden.net/wiki/Challenge_(HOME)",
  transfer: "https://bulbapedia.bulbagarden.net/wiki/Transfer",
  championsTitles: "https://www.serebii.net/pokemonchampions/pokemontitles.shtml",
  championsRoster: "https://www.serebii.net/pokemonchampions/pokemon.shtml",
  sprites: "https://pokemondb.net/sprites",
  bankDeadline: "https://support.pokemon.com/hc/en-us/articles/52629477077012-Pok%C3%A9mon-Bank-and-Pok%C3%A9mon-HOME",
};

export const PHASES: Record<PhaseId, { label: string; short: string; generation: string }> = {
  orre: { label: "Orre", short: "GameCube", generation: "Colosseum / XD" },
  "gba-ds": { label: "Legacy", short: "GBA + DS", generation: "Generations III–IV" },
  bank: { label: "Bank route", short: "3DS", generation: "Generation VI" },
  alola: { label: "Alola", short: "3DS", generation: "Generation VII" },
  switch: { label: "HOME", short: "Switch", generation: "Generations VIII–IX" },
  champions: { label: "Champions", short: "Final", generation: "Pokémon Champions" },
};

export const TITLE_STEPS: TitleStep[] = [
  {
    id: "national",
    title: "the Triumphant",
    ribbon: "National Ribbon",
    game: "Pokémon Colosseum / Pokémon XD",
    location: "Purification Chamber / Relic Stone",
    phase: "orre",
    how: "Purify the Shadow Pokémon.",
    detail: "Only an individual originally caught as a Shadow Pokémon can receive this Ribbon.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "earth",
    title: "the 100× Victorious",
    ribbon: "Earth Ribbon",
    game: "Pokémon Colosseum / Pokémon XD",
    location: "Mt. Battle",
    phase: "orre",
    how: "Clear all 100 Mt. Battle Trainers in one continuous challenge with the same party.",
    detail: "In XD, do not change the party or evolve a party member during the challenge.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "champion",
    title: "the Champion",
    ribbon: "Champion Ribbon",
    game: "Ruby / Sapphire / Emerald / FireRed / LeafGreen",
    location: "Pokémon League",
    phase: "gba-ds",
    how: "Enter the Hoenn or Kanto Hall of Fame with the Pokémon in your party.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "artist",
    title: "the Model for Paintings",
    ribbon: "Artist Ribbon",
    game: "Ruby / Sapphire / Emerald",
    location: "Lilycove Museum",
    phase: "gba-ds",
    how: "Speak to the curator, win a Master Rank or Link Contest with at least 800 points, and accept the portrait.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "effort",
    title: "the Once Well-Trained",
    ribbon: "Effort Ribbon",
    game: "Ruby / Sapphire / Emerald",
    location: "Slateport City Market",
    phase: "gba-ds",
    how: "Reach 510 total EVs, then show the Pokémon to the Ribbon-giving NPC.",
    source: SOURCES.ribbons,
  },
  {
    id: "contest-memory",
    title: "the Treasured Memory",
    ribbon: "Contest Memory Ribbon",
    game: "RSE + Diamond / Pearl / Platinum → X / Y or ORAS",
    location: "Contests and Super Contests",
    phase: "gba-ds",
    how: "Earn at least one old Contest Ribbon, then transfer the Pokémon into a Generation VI game through Poké Transporter and Bank.",
    detail: "For the gold historical variant, earn all 20 Hoenn Contest Ribbons and all 20 Sinnoh Super Contest Ribbons. The 40 old Ribbons become one title.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "battle-memory",
    title: "the Exciting Memory",
    ribbon: "Battle Memory Ribbon",
    game: "RSE + Diamond / Pearl / Platinum / HGSS → X / Y or ORAS",
    location: "Battle Towers",
    phase: "gba-ds",
    how: "Earn at least one old Battle Tower Ribbon, then transfer the Pokémon into a Generation VI game through Bank.",
    detail: "Winning, Victory, and the six Ability Ribbons collapse into one title. World Ability is not officially obtainable today; seven of eight old Ribbons can still display the gold variant in Scarlet/Violet.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "sinnoh-champion",
    title: "the Sinnoh Champion",
    ribbon: "Sinnoh Champion Ribbon",
    game: "Diamond / Pearl / Platinum or BDSP",
    location: "Sinnoh Pokémon League",
    phase: "gba-ds",
    how: "Enter the Sinnoh Hall of Fame with the Pokémon in your party.",
    source: SOURCES.ribbons,
  },
  ...[
    ["alert", "the Once Vigilant", "Alert Ribbon", "Monday"],
    ["shock", "the Once Cowardly", "Shock Ribbon", "Tuesday"],
    ["downcast", "the Once Shaken", "Downcast Ribbon", "Wednesday"],
    ["careless", "the Once Imperfect", "Careless Ribbon", "Thursday"],
    ["relax", "the Once Well-Rested", "Relax Ribbon", "Friday"],
    ["snooze", "the Once Sleepy", "Snooze Ribbon", "Saturday"],
    ["smile", "the Once Cheery", "Smile Ribbon", "Sunday"],
  ].map(([id, title, ribbon, day]) => ({
    id,
    title,
    ribbon,
    game: "Diamond / Pearl / Platinum or BDSP",
    location: "Julia in Sunyshore City",
    phase: "gba-ds" as PhaseId,
    how: `Speak to Julia in Sunyshore City on ${day}.`,
    source: SOURCES.ribbons,
  })),
  {
    id: "gorgeous",
    title: "the Gorgeous",
    ribbon: "Gorgeous Ribbon",
    game: "Diamond / Pearl / Platinum or BDSP",
    location: "Ribbon Syndicate",
    phase: "gba-ds",
    how: "Buy the first Ribbon from the Ribbon Syndicate for ₽10,000.",
    source: SOURCES.ribbons,
  },
  {
    id: "royal",
    title: "the Royal",
    ribbon: "Royal Ribbon",
    game: "Diamond / Pearl / Platinum or BDSP",
    location: "Ribbon Syndicate",
    phase: "gba-ds",
    how: "After obtaining the Gorgeous Ribbon, buy the Royal Ribbon for ₽100,000.",
    source: SOURCES.ribbons,
  },
  {
    id: "gorgeous-royal",
    title: "the Gorgeous Royal",
    ribbon: "Gorgeous Royal Ribbon",
    game: "Diamond / Pearl / Platinum or BDSP",
    location: "Ribbon Syndicate",
    phase: "gba-ds",
    how: "After obtaining both earlier Ribbons, buy the Gorgeous Royal Ribbon for ₽999,999.",
    source: SOURCES.ribbons,
  },
  {
    id: "footprint",
    title: "the Strutter",
    ribbon: "Footprint Ribbon",
    game: "Diamond / Pearl / Platinum",
    location: "Dr. Footstep on Route 213",
    phase: "gba-ds",
    how: "Reach maximum friendship and show the Pokémon to Dr. Footstep before transferring it to Generation V.",
    detail: "Doing this early avoids the later rule that normally requires gaining 30 levels after the Pokémon was met or received.",
    source: SOURCES.ribbons,
  },
  {
    id: "legend",
    title: "the Living Legend",
    ribbon: "Legend Ribbon",
    game: "HeartGold / SoulSilver",
    location: "Mt. Silver",
    phase: "gba-ds",
    how: "Defeat Red with the Pokémon in your party.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "kalos-champion",
    title: "the Kalos Champion",
    ribbon: "Kalos Champion Ribbon",
    game: "Pokémon X / Y",
    location: "Kalos Pokémon League",
    phase: "bank",
    how: "Enter the Kalos Hall of Fame with the Pokémon in your party.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "hoenn-champion",
    title: "the Hoenn Champion",
    ribbon: "Hoenn Champion Ribbon",
    game: "Omega Ruby / Alpha Sapphire",
    location: "Hoenn Pokémon League",
    phase: "bank",
    how: "Enter the Hoenn Hall of Fame with the Pokémon in your party.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  ...[
    ["coolness-master", "the Former Star", "Coolness Master Ribbon", "Coolness"],
    ["beauty-master", "the Vintage Beauty", "Beauty Master Ribbon", "Beauty"],
    ["cuteness-master", "the Former Idol", "Cuteness Master Ribbon", "Cuteness"],
    ["cleverness-master", "the Historic Genius", "Cleverness Master Ribbon", "Cleverness"],
    ["toughness-master", "the Formerly Buff", "Toughness Master Ribbon", "Toughness"],
  ].map(([id, title, ribbon, contest]) => ({
    id,
    title,
    ribbon,
    game: "Omega Ruby / Alpha Sapphire or BDSP",
    location: "Pokémon Contest Spectacular / Super Contest Show",
    phase: "bank" as PhaseId,
    how: `Win the ${contest} category at Master Rank.`,
    source: SOURCES.ribbons,
  })),
  {
    id: "contest-star",
    title: "the Shining Star",
    ribbon: "Contest Star Ribbon",
    game: "Omega Ruby / Alpha Sapphire or BDSP",
    location: "Pokémon Contest Spectacular / Super Contest Show",
    phase: "bank",
    how: "Earn all five Master Rank Contest Ribbons on the same Pokémon.",
    source: SOURCES.ribbons,
  },
  {
    id: "best-friends",
    title: "the Great Friend",
    ribbon: "Best Friends Ribbon",
    game: "X / Y or Omega Ruby / Alpha Sapphire",
    location: "Friendship / affection evaluator",
    phase: "bank",
    how: "Max out friendship—or affection in games where the systems are separate—then speak to the evaluator.",
    source: SOURCES.ribbons,
  },
  {
    id: "training",
    title: "the Tried and True",
    ribbon: "Training Ribbon",
    game: "X / Y or Omega Ruby / Alpha Sapphire",
    location: "Super Training",
    phase: "bank",
    how: "Earn every Super Training medal, then show the Pokémon to the corresponding NPC.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "skillful",
    title: "the Veteran",
    ribbon: "Skillful Battler Ribbon",
    game: "X / Y or Omega Ruby / Alpha Sapphire",
    location: "Battle Maison",
    phase: "bank",
    how: "Defeat a Battle Chatelaine in battle 20 of a normal-format challenge.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "expert",
    title: "the Master",
    ribbon: "Expert Battler Ribbon",
    game: "X / Y or Omega Ruby / Alpha Sapphire",
    location: "Battle Maison",
    phase: "bank",
    how: "Defeat a Battle Chatelaine in battle 50 of a Super-format challenge.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "alola-champion",
    title: "the Alola Champion",
    ribbon: "Alola Champion Ribbon",
    game: "Sun / Moon or Ultra Sun / Ultra Moon",
    location: "Alola Pokémon League",
    phase: "alola",
    how: "Enter the Alola Hall of Fame with the Pokémon in your party.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "royal-master",
    title: "the Royal Master",
    ribbon: "Battle Royal Master Ribbon",
    game: "Sun / Moon or Ultra Sun / Ultra Moon",
    location: "Battle Royal Dome",
    phase: "alola",
    how: "Win a Battle Royal at Master Rank.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "tree-great",
    title: "the Tree Victor",
    ribbon: "Battle Tree Great Ribbon",
    game: "Sun / Moon or Ultra Sun / Ultra Moon",
    location: "Battle Tree",
    phase: "alola",
    how: "Defeat the Battle Legend in battle 20 of a normal-format challenge.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "tree-master",
    title: "the Tree Master",
    ribbon: "Battle Tree Master Ribbon",
    game: "Sun / Moon or Ultra Sun / Ultra Moon",
    location: "Battle Tree",
    phase: "alola",
    how: "Defeat the Battle Legend in battle 50 of a Super-format challenge.",
    bankCritical: true,
    source: SOURCES.ribbons,
  },
  {
    id: "galar-champion",
    title: "the Galar Champion",
    ribbon: "Galar Champion Ribbon",
    game: "Sword / Shield",
    location: "Champion Cup at Wyndon Stadium",
    phase: "switch",
    how: "Win the Champion Cup with the Pokémon in your party.",
    source: SOURCES.ribbons,
  },
  {
    id: "tower-master",
    title: "the Tower Master",
    ribbon: "Tower Master Ribbon",
    game: "Sword / Shield or BDSP",
    location: "Battle Tower",
    phase: "switch",
    how: "Defeat Leon at MAX Rank in Galar or Palmer at Rank 10 of the BDSP Master Class.",
    source: SOURCES.ribbons,
  },
  {
    id: "twinkling-star",
    title: "the Twinkling Star",
    ribbon: "Twinkling Star Ribbon",
    game: "Brilliant Diamond / Shining Pearl",
    location: "Super Contest Show",
    phase: "switch",
    how: "After earning the Contest Star Ribbon, win a Master Rank Brilliant Contest in BD or Shining Contest in SP.",
    source: SOURCES.ribbons,
  },
  {
    id: "hisui",
    title: "of the Distant Past",
    ribbon: "Hisui Ribbon",
    game: "Pokémon Legends: Arceus",
    location: "Jubilife Village Photography Studio",
    phase: "switch",
    how: "Prepare the Pokémon for a photograph at Dagero's studio; taking the photo is not required.",
    source: SOURCES.ribbons,
  },
  {
    id: "paldea-champion",
    title: "the Paldea Champion",
    ribbon: "Paldea Champion Ribbon",
    game: "Scarlet / Violet",
    location: "Pokémon League / Academy Ace Tournament",
    phase: "switch",
    how: "Clear the Paldea Pokémon League or the Academy Ace Tournament with the Pokémon in your party.",
    source: SOURCES.ribbons,
  },
  {
    id: "rank-master",
    title: "the Rank Master",
    ribbon: "Master Rank Ribbon",
    game: "Sword / Shield or Scarlet / Violet",
    location: "Ranked Battles",
    phase: "switch",
    how: "Win a Ranked Battle in the Master Ball Tier with the Pokémon on the Battle Team used.",
    detail: "The species must be legal in the current regulation or season. Earn it before Champions: Serebii warns that a HOME Pokémon awarded this title in Champions cannot be transferred back through HOME.",
    conditional: true,
    source: SOURCES.ribbons,
  },
  {
    id: "itemfinder",
    title: "the Treasure Hunter",
    ribbon: "Itemfinder Mark",
    game: "Scarlet / Violet",
    location: "Let's Go auto-battle mode",
    phase: "switch",
    how: "Have the lead Pokémon find an item with Let's Go; each item gives a 1/100 chance.",
    conditional: true,
    source: SOURCES.marks,
  },
  {
    id: "partner-mark",
    title: "the Reliable Partner",
    ribbon: "Partner Mark",
    game: "Scarlet / Violet",
    location: "Overworld travel",
    phase: "switch",
    how: "With friendship at 200 or higher, keep the Pokémon in your party; every 10,000 player steps gives it a 1/100 chance.",
    conditional: true,
    source: SOURCES.marks,
  },
  {
    id: "gourmand",
    title: "the Gourmet",
    ribbon: "Gourmand Mark",
    game: "Scarlet / Violet",
    location: "Picnics and food shops",
    phase: "switch",
    how: "Make a sandwich or buy food with the Pokémon in your party; the documented chance is 3/101 per meal for each party member.",
    conditional: true,
    source: SOURCES.marks,
  },
  {
    id: "size-extreme",
    title: "the Great / the Teeny",
    ribbon: "Jumbo Mark or Mini Mark",
    game: "Scarlet / Violet",
    location: "Size judge near West Mesagoza Pokémon Center",
    phase: "switch",
    how: "Show the judge a Pokémon whose Scale value is exactly 255 or 0.",
    detail: "This contributes exactly one title: a single individual cannot have both size Marks. For legacy Pokémon, HOME assigns Scale, so this theoretical 47th slot is not guaranteed.",
    conditional: true,
    source: SOURCES.marks,
  },
  {
    id: "champion-tiered",
    title: "the Champion-Tiered",
    ribbon: "Pokémon Champions title",
    game: "Pokémon Champions",
    location: "Ranked Battle",
    phase: "champions",
    how: "Reach Champion Rank with the Pokémon on the Battle Team used.",
    detail: "This is the one distinct Champions-only title in this route. Rank Master is already counted through its HOME Ribbon.",
    conditional: true,
    source: SOURCES.championsTitles,
  },
];

// Every candidate exists in Generation IV, so HGSS supplies one consistent pixel-art set.
const sprite = (name: string) =>
  `https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/${name}.png`;
const spritePage = (name: string) => `https://pokemondb.net/sprites/${name}`;
const speciesPage = (name: string) =>
  `https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(name.replaceAll(" ", "_"))}_(Pok%C3%A9mon)`;

type CandidateInput = {
  id: string;
  name: string;
  number: string;
  generation: 1 | 2 | 3 | 4;
  shadowBase: string;
  originGame: "Colosseum" | "XD";
  route: string;
  tags: string[];
  gaps?: CandidateGap[];
};

const noHisui = (name: string): CandidateGap => ({
  titleId: "hisui",
  reason: `${name} cannot enter Pokémon Legends: Arceus, so this individual cannot earn the Hisui Ribbon.`,
  source: speciesPage(name),
});
const noGalar = (name: string): CandidateGap => ({
  titleId: "galar-champion",
  reason: `${name} cannot enter Pokémon Sword or Shield, so this individual cannot earn the Galar Champion Ribbon.`,
  source: speciesPage(name),
});
const noChampions = (name: string): CandidateGap => ({
  titleId: "champion-tiered",
  reason: `${name} is not on Serebii's current Pokémon Champions roster.`,
  source: SOURCES.championsRoster,
});

const makeCandidate = (input: CandidateInput): Candidate => {
  const gaps = input.gaps ?? [];
  const maxTitles = TITLE_STEPS.length - gaps.length;
  const sizeAlreadyUnavailable = gaps.some((gap) => gap.titleId === "size-extreme");
  return {
    ...input,
    gaps,
    sprite: sprite(input.id),
    spritePage: spritePage(input.id),
    availabilitySource: speciesPage(input.name),
    maxTitles,
    regularTitles: maxTitles - (sizeAlreadyUnavailable ? 0 : 1),
  };
};

export const CANDIDATES: Candidate[] = [
  makeCandidate({ id: "heracross", name: "Heracross", number: "#0214", generation: 2, shadowBase: "Heracross", originGame: "Colosseum", route: "Catch Heracross directly as a Shadow Pokémon; no evolution is required for this final form.", tags: ["47-title ceiling", "Direct route"] }),
  makeCandidate({ id: "snorlax", name: "Snorlax", number: "#0143", generation: 1, shadowBase: "Snorlax", originGame: "XD", route: "Catch Snorlax directly as a Shadow Pokémon in Pokémon XD: Gale of Darkness.", tags: ["47-title ceiling", "Direct route"] }),
  makeCandidate({ id: "ninetales", name: "Ninetales", number: "#0038", generation: 1, shadowBase: "Vulpix", originGame: "XD", route: "Start with the Shadow Vulpix from Pokémon XD and evolve that same individual.", tags: ["47-title ceiling", "Evolution required"] }),
  makeCandidate({ id: "scizor", name: "Scizor", number: "#0212", generation: 2, shadowBase: "Scyther", originGame: "XD", route: "Start with the Shadow Scyther from Pokémon XD and evolve that same individual into Scizor.", tags: ["47-title ceiling", "Trade evolution"] }),
  makeCandidate({ id: "rhyperior", name: "Rhyperior", number: "#0464", generation: 4, shadowBase: "Rhydon", originGame: "XD", route: "Start with the Shadow Rhydon from Pokémon XD and evolve that same individual after it reaches Generation IV.", tags: ["47-title ceiling", "Trade evolution"] }),
  makeCandidate({ id: "weavile", name: "Weavile", number: "#0461", generation: 4, shadowBase: "Sneasel", originGame: "Colosseum", route: "Start with the Shadow Sneasel from Pokémon Colosseum and evolve that same individual in Generation IV or later.", tags: ["47-title ceiling", "Evolution required"] }),
  makeCandidate({ id: "mamoswine", name: "Mamoswine", number: "#0473", generation: 4, shadowBase: "Swinub", originGame: "XD", route: "Start with the Shadow Swinub from Pokémon XD and evolve the same line through Mamoswine.", tags: ["47-title ceiling", "Evolution required"] }),
  makeCandidate({ id: "gardevoir", name: "Gardevoir", number: "#0282", generation: 3, shadowBase: "Ralts", originGame: "XD", route: "Start with the Shadow Ralts from Pokémon XD and evolve that same individual into Gardevoir.", tags: ["47-title ceiling", "Evolution required"] }),
  makeCandidate({ id: "gallade", name: "Gallade", number: "#0475", generation: 4, shadowBase: "Ralts ♂", originGame: "XD", route: "Start with a male Shadow Ralts from Pokémon XD, evolve it into Kirlia, then into Gallade.", tags: ["47-title ceiling", "Male Ralts"] }),
  makeCandidate({ id: "glalie", name: "Glalie", number: "#0362", generation: 3, shadowBase: "Snorunt", originGame: "XD", route: "Start with the Shadow Snorunt from Pokémon XD and evolve that same individual into Glalie.", tags: ["47-title ceiling", "Evolution required"] }),
  makeCandidate({ id: "froslass", name: "Froslass", number: "#0478", generation: 4, shadowBase: "Snorunt ♀", originGame: "XD", route: "Start with a female Shadow Snorunt from Pokémon XD and evolve that same individual into Froslass.", tags: ["47-title ceiling", "Female Snorunt"] }),

  makeCandidate({ id: "altaria", name: "Altaria", number: "#0334", generation: 3, shadowBase: "Altaria", originGame: "XD", route: "Catch Altaria directly as a Shadow Pokémon in Pokémon XD.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Altaria")] }),
  makeCandidate({ id: "blissey", name: "Blissey", number: "#0242", generation: 2, shadowBase: "Chansey", originGame: "XD", route: "Start with the Shadow Chansey from Pokémon XD and evolve that same individual into Blissey.", tags: ["46 titles", "Current roster gap"], gaps: [noChampions("Blissey")] }),
  makeCandidate({ id: "dragonite", name: "Dragonite", number: "#0149", generation: 1, shadowBase: "Dragonite", originGame: "XD", route: "Catch Dragonite directly as the final Shadow Pokémon in Pokémon XD.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Dragonite")] }),
  makeCandidate({ id: "electivire", name: "Electivire", number: "#0466", generation: 4, shadowBase: "Electabuzz", originGame: "XD", route: "Start with the Shadow Electabuzz from Pokémon XD and evolve it after reaching Generation IV.", tags: ["46 titles", "Current roster gap"], gaps: [noChampions("Electivire")] }),
  makeCandidate({ id: "gliscor", name: "Gliscor", number: "#0472", generation: 4, shadowBase: "Gligar", originGame: "Colosseum", route: "Start with the Shadow Gligar from Pokémon Colosseum and evolve it after reaching Generation IV.", tags: ["46 titles", "Missing Galar"], gaps: [noGalar("Gliscor")] }),
  makeCandidate({ id: "magmortar", name: "Magmortar", number: "#0467", generation: 4, shadowBase: "Magmar", originGame: "XD", route: "Start with the Shadow Magmar from Pokémon XD and evolve it after reaching Generation IV.", tags: ["46 titles", "Current roster gap"], gaps: [noChampions("Magmortar")] }),
  makeCandidate({ id: "metagross", name: "Metagross", number: "#0376", generation: 3, shadowBase: "Metagross", originGame: "Colosseum", route: "Catch Metagross directly as a Shadow Pokémon in Pokémon Colosseum.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Metagross")] }),
  makeCandidate({ id: "qwilfish", name: "Qwilfish", number: "#0211", generation: 2, shadowBase: "Qwilfish", originGame: "Colosseum", route: "Catch the Johtonian Qwilfish directly as a Shadow Pokémon in Pokémon Colosseum.", tags: ["46 titles", "Johtonian form"], gaps: [noHisui("Qwilfish")] }),
  makeCandidate({ id: "sableye", name: "Sableye", number: "#0302", generation: 3, shadowBase: "Sableye", originGame: "XD", route: "Catch Sableye directly as a Shadow Pokémon in Pokémon XD.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Sableye")] }),
  makeCandidate({ id: "salamence", name: "Salamence", number: "#0373", generation: 3, shadowBase: "Salamence", originGame: "XD", route: "Catch the level 50 Shadow Salamence from Cipher Admin Eldes on Citadark Isle.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Salamence")] }),
  makeCandidate({ id: "skarmory", name: "Skarmory", number: "#0227", generation: 2, shadowBase: "Skarmory", originGame: "Colosseum", route: "Catch Skarmory directly as a Shadow Pokémon in Pokémon Colosseum.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Skarmory")] }),
  makeCandidate({ id: "tyranitar", name: "Tyranitar", number: "#0248", generation: 2, shadowBase: "Tyranitar", originGame: "Colosseum", route: "Catch the level 55 Tyranitar directly as Pokémon Colosseum's final Shadow Pokémon.", tags: ["46 titles", "Missing Hisui"], gaps: [noHisui("Tyranitar")] }),

  makeCandidate({ id: "ambipom", name: "Ambipom", number: "#0424", generation: 4, shadowBase: "Aipom", originGame: "Colosseum", route: "Start with the Shadow Aipom from Pokémon Colosseum and evolve it after reaching Generation IV.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Ambipom"), noChampions("Ambipom")] }),
  makeCandidate({ id: "ampharos", name: "Ampharos", number: "#0181", generation: 2, shadowBase: "Flaaffy", originGame: "Colosseum", route: "Start with the Shadow Flaaffy from Pokémon Colosseum and evolve that same individual into Ampharos.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Ampharos"), noHisui("Ampharos")] }),
  makeCandidate({ id: "flygon", name: "Flygon", number: "#0330", generation: 3, shadowBase: "Vibrava", originGame: "Colosseum", route: "Start with the Shadow Vibrava from Pokémon Colosseum and evolve that same individual into Flygon.", tags: ["45 titles", "Two later-game gaps"], gaps: [noHisui("Flygon"), noChampions("Flygon")] }),
  makeCandidate({ id: "honchkrow", name: "Honchkrow", number: "#0430", generation: 4, shadowBase: "Murkrow", originGame: "Colosseum", route: "Start with the Shadow Murkrow from Pokémon Colosseum and evolve it after reaching Generation IV.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Honchkrow"), noChampions("Honchkrow")] }),
  makeCandidate({ id: "houndoom", name: "Houndoom", number: "#0229", generation: 2, shadowBase: "Houndoom", originGame: "Colosseum", route: "Catch Houndoom directly as a Shadow Pokémon in Pokémon Colosseum.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Houndoom"), noHisui("Houndoom")] }),
  makeCandidate({ id: "medicham", name: "Medicham", number: "#0308", generation: 3, shadowBase: "Meditite", originGame: "Colosseum", route: "Start with the Shadow Meditite from Pokémon Colosseum and evolve that same individual into Medicham.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Medicham"), noHisui("Medicham")] }),
  makeCandidate({ id: "mismagius", name: "Mismagius", number: "#0429", generation: 4, shadowBase: "Misdreavus", originGame: "Colosseum", route: "Start with the Shadow Misdreavus from Pokémon Colosseum and evolve it after reaching Generation IV.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Mismagius"), noChampions("Mismagius")] }),
  makeCandidate({ id: "yanmega", name: "Yanmega", number: "#0469", generation: 4, shadowBase: "Yanma", originGame: "Colosseum", route: "Start with the Shadow Yanma from Pokémon Colosseum and evolve it after reaching Generation IV.", tags: ["45 titles", "Two later-game gaps"], gaps: [noGalar("Yanmega"), noChampions("Yanmega")] }),
];

export const PRE_SWITCH_TITLE_STEPS = TITLE_STEPS.filter(
  (step) => step.phase !== "switch" && step.phase !== "champions",
);

export function titleStepsFor(candidate: Candidate) {
  const unavailable = new Set(candidate.gaps.map((gap) => gap.titleId));
  return TITLE_STEPS.filter((step) => !unavailable.has(step.id));
}

export const REDDIT_CALLOUTS: RedditCallout[] = [
  {
    label: "VIRTUAL CONSOLE",
    title: "Game Boy provenance",
    summary: "The post counts 275 species and later evolutions that can carry the Game Boy origin mark and the “Good Old Days” description from the 3DS Virtual Console route.",
    items: ["Transferred VC Pokémon normally receive their Hidden Ability", "Crystal contains the legal in-game Shiny Celebi hunt", "VC Pokémon do not add Ribbon titles"],
    note: "The post labels glitch-obtained VC Mew as illegal; it is not treated as a normal collection route here.",
    source: SOURCES.reddit,
  },
  {
    label: "GENERATION III",
    title: "Rare hunts with historical access",
    summary: "The masterpost highlights several Gen III specimens whose provenance cannot be recreated through a modern Switch playthrough.",
    items: ["Faraway Island Mew in Japanese Emerald", "Birth Island Deoxys in FRLG or non-Japanese Emerald", "WISHMKR or Pokémon Channel Jirachi"],
    note: "Event-island hunts require the relevant historical event access; distinguish preserved distribution methods from ordinary in-game availability.",
    source: SOURCES.reddit,
  },
  {
    label: "ORRE / GAMECUBE",
    title: "Shadow hunts and Mt. Battle prizes",
    summary: "Colosseum and XD provide the Shadow provenance used by every ranked route in this tracker, plus several separate collector goals.",
    items: ["Colosseum Shadow Pokémon can be Shiny", "Mt. Battle Ho-Oh after purifying the regular Shadow set", "XD Johto starters with Frenzy Plant, Blast Burn, or Hydro Cannon"],
    note: "Japanese Colosseum e-Reader cards add special Shadow Togepi, Mareep, and Scizor encounters.",
    source: SOURCES.reddit,
  },
  {
    label: "GENERATION IV + WII",
    title: "One-off legacy specimens",
    summary: "The post calls out several distinctive Gen IV and Wii routes worth completing independently from a Ribbon Master.",
    items: ["Ranger Egg Manaphy's trade-before-hatch Shiny hunt", "Hayley's Phione and Mew from My Pokémon Ranch", "Sinjoh Ruins level-1 Dialga, Palkia, or Giratina", "PKTOPIA Pikachu, Electivire, and Magmortar"],
    source: SOURCES.reddit,
  },
  {
    label: "DS COLLECTIONS",
    title: "Named trades and linked-game sets",
    summary: "These collections preserve an original Trainer, game linkage, or acquisition method rather than adding a unique title.",
    items: ["HGSS trades: Hornlette, Volty, Iron, and Rusty", "N's Pokémon from B2W2 Memory Link", "Yancy and Curtis Hidden Ability trades", "Dream Radar legendaries unlocked with DS cartridges"],
    source: SOURCES.reddit,
  },
  {
    label: "GENERATION VI–VII",
    title: "3DS-only gifts and forms",
    summary: "Later Bank-era highlights include demo, QR, and special-distribution Pokémon whose exact provenance is tied to the 3DS games.",
    items: ["ORAS demo Glalie or Steelix", "SM demo Battle Bond Greninja", "QR Magearna and Partner Cap Pikachu", "Shiny Type: Null and Poipole hunts", "Mantine Surf Pikachu"],
    source: SOURCES.reddit,
  },
  {
    label: "SIMPLIFIED WATCHLIST",
    title: "Six species or forms flagged by the post",
    summary: "In its current simplified list, the post names six targets that are not obtainable from Switch games themselves and therefore depend on transfer routes or Pokémon GO caveats.",
    items: ["Spinda", "Partner Cap Pikachu", "Poké Ball Pattern Vivillon", "Ash-Greninja", "Deoxys", "Victini"],
    note: "This is a dated summary from the post, updated August 20, 2026—not a claim that every target is wholly unavailable through Pokémon GO or past events.",
    source: SOURCES.reddit,
  },
];

export const SPECIES_UNION_LEADERS = ["Magneton", "Magnezone", "Magmar", "Magmortar"];
