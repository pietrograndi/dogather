export type ListItem = {
  title: string;
  completed: boolean;
};

export enum LocalStorageActionType {
  DESERIALIZE = "DESERIALIZE",
  SERIALIZE = "SERIALIZE",
}

interface SerializeAction {
  type: LocalStorageActionType.SERIALIZE;
  callback: (value: string) => void;
}
interface DeserializeAction {
  type: LocalStorageActionType.DESERIALIZE;
  value: string;
}

export type Action = SerializeAction | DeserializeAction;
