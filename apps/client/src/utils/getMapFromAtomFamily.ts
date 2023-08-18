import { Getter } from "jotai";
import { elements } from "../data/atoms";
import { ListItem } from "../types";

export const mapElementsById = (get: Getter, todos: string[]) => {
  return todos.reduce((acc, id) => {
    acc.set(id, get(elements({ id })));
    return acc;
  }, new Map<string, ListItem>());
};
