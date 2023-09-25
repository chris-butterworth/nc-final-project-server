import findQuestionIndices from "./findQuestionIndices";

const findHintIndices = (
  formattedAnswerArray,
  fullAnswerArray,
  anagramWords
) => {
  for (let i = 0; i < formattedAnswerArray.length; i++) {
    for (let j = 0; j < formattedAnswerArray[i].length; j++) {
      if (formattedAnswerArray[i][j] !== fullAnswerArray[i][j]) {
        let wrongLetter = formattedAnswerArray[i][j];
        let correctLetter = fullAnswerArray[i][j];
        // Check if there is a letter being replaced in the formattedAnswerArray
        // if (wrongLetter) {
          // If there is,
          //      Find the word and letter index in the question
          //      Go into the disabled buttons array, find the one that matches that
        //   [reenableWordIndex, reenableLetterIndex] = findQuestionIndices(
        //     wrongLetter,
        //     anagramWords
        //   );
          //      remove this from the disabled buttons array
        // }
        // No matter what, find the word and letter index in the question of the correct letter
        const [disableWordIndex, disableLetterIndex] = findQuestionIndices(
          correctLetter,
          anagramWords
        );

        const output = [
          { answerWord: i, answerLetter: j, correctLetter },
          {
            disableWordIndex,
            disableLetterIndex,
            disableLetter: correctLetter,
          },
        ];
        // If there is a wrong letter (aka there is a letter in the spot already which needs to be replaced) we want to push this into the output to reenable this button
        if (wrongLetter) {
          output.push(wrongLetter);
        }
        return output;
      }
    }
  }
};

export default findHintIndices;
