const findReenableButton = (letter, currentlyDisabled, anagramWords) => {
  console.log(letter, currentlyDisabled, "<<<TO BE REMOVED FROM DISABLED");
  for (let i = 0; i < currentlyDisabled.length; i++) {
    if (currentlyDisabled[i].letter === letter) {
      return i;
    }
  }
};

export default findReenableButton;
