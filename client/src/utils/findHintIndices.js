const findHintIndices = (formattedAnswerArray, fullAnswerArray) => {
  for (let i = 0; i < formattedAnswerArray.length; i++) {
    for (let j = 0; j < formattedAnswerArray[i].length; j++) {
      if (formattedAnswerArray[i][j] !== fullAnswerArray[i][j]) {
        return [i, j];
      }
    }
  }
};

export default findHintIndices;
