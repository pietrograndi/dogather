import { Getter, Setter, atom, createStore } from "jotai";
import { atomFamily } from "jotai/utils";
import { Action, ListItem, LocalStorageActionType } from "../types";
import { nanoid } from "nanoid";
import { mapElementsById } from "../utils/getMapFromAtomFamily";
import { getDataFromLocalStorage } from "./localData";
import { STORAGE_KEYS } from "../utils/app_constants";
import { isRight } from "fp-ts/lib/Either";
import { storedDataCodec } from "../types/decoder";

export const inputAtom = atom<string>("");

export const elementListAtom = atom<string[]>([]);

export const isUniqueInputValue = atom((get) => {
  const input = get(inputAtom);
  const isPresent = get(elementListAtom)
    .map((id) => {
      return get(elementsFamily({ id })).title;
    })
    .includes(input);

  return !isPresent;
});

type Param = {
  id: string;
  title?: string;
};

export const elementsFamily = atomFamily(
  (param: Param) =>
    atom<ListItem>({
      title: param.title || "No title",
      completed: false,
    }),
  (a: Param, b: Param) => a.id === b.id
);

export type ElementsType = ReturnType<typeof elementsFamily>;

export type DerivedElements = {
  elementList: string[];
  elementMap: Map<string, ListItem>;
  versionId: string;
};

const serializer = (get: Getter) => {
  const elementList = get(elementListAtom);
  const elementMap = mapElementsById(get, elementList);
  return { elementList, elementMap, versionId: nanoid() };
};

const deserializer = (set: Setter) => {
  return new Promise((res, rej) => {
    try {
      const storedData = getDataFromLocalStorage();
      if (storedData) {
        set(elementListAtom, storedData.elementList);
        storedData.elementList.forEach((id) => {
          const element = storedData.elementMap[id];
          set(elementsFamily({ id, ...element }), element);
        });
        res("");
      }
    } catch (e) {
      rej(e);
    }
  });
};

export const provaAtom = atom((get) => {
  const elementList = get(elementListAtom);
  const elementMap = mapElementsById(get, elementList);
  const versionId = nanoid();
  const obj = {
    elementList,
    elementMap,
    versionId,
  };
  return obj;
});

export const serializeDeserializeAtom = atom(
  null,
  (get: Getter, set: Setter, action: Action) => {
    switch (action.type) {
      case LocalStorageActionType.SERIALIZE:
        action.callback(JSON.stringify(serializer(get)));
        break;
      case LocalStorageActionType.DESERIALIZE:
        deserializer(set).then(action.callback);
        break;
    }
  }
);
