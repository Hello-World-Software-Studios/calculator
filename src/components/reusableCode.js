const NO_NAME_TO_DISPLAY = "No Project Selected";

const checkForNameToDisplay = (displayName) => displayName == null
    ? NO_NAME_TO_DISPLAY
    : displayName;

export default checkForNameToDisplay;
