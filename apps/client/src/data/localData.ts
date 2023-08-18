import { pipe } from "fp-ts/lib/function";
import { storedDataCodec } from "../types/decoder";
import { STORAGE_KEYS } from "../utils/app_constants";
import { isRight } from "fp-ts/Either";

export const setDataToLocalStorage = (jsonOfDerivedElements: string) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,
      jsonOfDerivedElements
    );
  } catch (error) {
    console.error(error);
  }
};

export const getDataFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS);
    const decodedData = pipe(
      data,
      (d) => (d ? JSON.parse(d) : null),
      storedDataCodec.decode,
      (result) => (isRight(result) ? result.right : null)
    );
    if (decodedData !== null) {
      return decodedData;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
