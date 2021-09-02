const NO_NAME_TO_DISPLAY = "Nothing To Display";

const checkForNameToDisplay = (displayName) => displayName == null
    ? NO_NAME_TO_DISPLAY
    : displayName;

export default checkForNameToDisplay;
