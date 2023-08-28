import { UpdateActions, UpdateActionType } from "@lib/shared";

export const updateReducer = (actions:UpdateActions) => {
  switch (actions.type) {
    case UpdateActionType.MEMBERS_UPDATE:
        console.log(`alloria siamo in ${actions.payload.count} a ballare l'alligalli`)
      break;
  }
}