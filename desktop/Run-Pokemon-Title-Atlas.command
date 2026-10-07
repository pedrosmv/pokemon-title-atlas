#!/usr/bin/env sh

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
"$SCRIPT_DIR/run-pokemon-title-atlas.sh"
status=$?

if [ "$status" -ne 0 ]; then
  printf '\nThe launcher stopped with exit code %s. Press Return to close.\n' "$status"
  read -r _answer
fi

exit "$status"
