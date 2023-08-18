import { STORAGE_KEYS } from "../utils/app_constants";
import { DerivedElements } from "./atoms";

export const setDataToLocalStorage = (derivedElements: DerivedElements) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,
      JSON.stringify(derivedElements)
    );
  } catch (error) {
    console.error(error);
  }
};
