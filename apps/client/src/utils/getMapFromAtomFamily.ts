import { Getter } from "jotai";
import { elementsFamily } from "../data/atoms";
import { ListItem } from "../types";

export const mapElementsById = (
  get: Getter,
  todos: string[]
): Record<string, ListItem> => {
  return todos.reduce((acc, id) => {
    return { ...acc, [id]: get(elementsFamily({ id })) };
  }, {});
};
