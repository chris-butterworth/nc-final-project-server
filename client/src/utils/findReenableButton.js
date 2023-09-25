const findReenableButton = (letter, currentlyDisabled) => {
  // Go through the disabledButtons
  for (let i = 0; i < currentlyDisabled.length; i++) {
    // Find the index of the button in the disabledButtons array which is the be reenabled
    if (currentlyDisabled[i].letter === letter) {
      return i;
    }
  }
};

export default findReenableButton;
