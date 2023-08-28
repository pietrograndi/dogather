export const ioEvents = {
  WS_CONNECT: "connect",
  WS_DISCONNECT: "disconnect",
  WS_JOIN_ROOM: "join-room",
  WS_FIRST_IN_ROOM: "first-in-room",
  WS_NEW_USER: "new-user",
  WS_UPDATE: 'update'
} as const;

export enum UpdateActionType {
  'MEMBERS_UPDATE' = 'MEMBERS_UPDATE'
}

interface MemberUpdateAction{
  type: UpdateActionType.MEMBERS_UPDATE,
  payload: {
    count: number
  }
}

export type UpdateActions = MemberUpdateAction

export const membersUpdate = (memberCount:number):MemberUpdateAction => ({
  type: UpdateActionType.MEMBERS_UPDATE,
  payload: {
    count: memberCount
  }
})

