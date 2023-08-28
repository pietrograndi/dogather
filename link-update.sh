#!/bin/bash

LIBRARY_PATH="lib/shared"

APP_WORKSPACE=("apps/client" "apps/ws")

for workspace in "${WORKSPACE[@]}"
do
  pnpm link "$LIBRARY_PATH" --cwd "$workspace"
done