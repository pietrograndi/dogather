import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { ListItem } from "../types";
import { nanoid } from "nanoid";
import { mapElementsById } from "../utils/getMapFromAtomFamily";

export const inputAtom = atom<string>("");

export const todoList = atom<string[]>([]);

export const isUniqueInputValue = atom((get) => {
  const input = get(inputAtom);
  const isPresent = get(todoList)
    .map((id) => {
      return get(elements({ id })).title;
    })
    .includes(input);

  return !isPresent;
});

type Param = {
  id: string;
  title?: string;
};

export const elements = atomFamily(
  (param: Param) =>
    atom<ListItem>({
      title: param.title || "No title",
      completed: false,
    }),
  (a: Param, b: Param) => a.id === b.id
);

export type ElementsType = ReturnType<typeof elements>;

export type DerivedElements = {
  elementList: string[];
  elementMap: Map<string, ListItem>;
  versionId: string;
};

export const derivedElements = atom((get): DerivedElements => {
  const elementList = get(todoList);
  const elementMap = mapElementsById(get, elementList);
  return { elementList, elementMap, versionId: nanoid() };
});
