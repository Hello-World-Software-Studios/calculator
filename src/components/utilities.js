import NO_NAME_TO_DISPLAY from "./constants";

export default   function checkForNameToDisplay (displayName){
  return displayName == null ? NO_NAME_TO_DISPLAY : displayName;
}
export function errorAndLoadingHandler(data, isLoading, error, ifLoading) {
  const errorCheckedData = !error ? data : error;
  const loadingCheckedData = isLoading === false ? errorCheckedData : ifLoading;
  return loadingCheckedData;
}



