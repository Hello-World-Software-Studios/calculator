import {NO_NAME_TO_DISPLAY} from "./constants";

export const checkForNameToDisplay = (displayName) =>
  displayName == null ? NO_NAME_TO_DISPLAY : displayName;

export const errorAndLoadingHandler = (data, isLoading, error, ifLoading) => {
  const errorCheckedData = !error ? data : error;
  const loadingCheckedData = isLoading === false ? errorCheckedData : ifLoading;
  return loadingCheckedData;
};

export const newListGenerator = (array) => {
  const arr = [];
  for (let i = 0; i < array.length; i += 1) {
    arr.push(array[i]);
  }
  return arr;
};

export const contextHelper = (unit, length) => unit ? length : length * 25.4;
