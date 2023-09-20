import React, { useState } from "react";

function LetterArrayComponent() {
  // State for the initial array of arrays
  const initialArray = [
    ["h", "e", "l", "p"],
    ["m", "e"],
  ];
  const [firstArray, setFirstArray] = useState(initialArray);

  // State for the second array of letters (initially empty)
  const [secondArray, setSecondArray] = useState([]);

  // Function to handle clicking a letter in the first array
  const handleLetterClick = (letter, wordIndex) => {
    // Copy the current first array
    const updatedFirstArray = [...firstArray];

    // Replace the clicked letter with an empty string in the specified word
    updatedFirstArray[wordIndex] = updatedFirstArray[wordIndex].map((item) =>
      item === letter ? "" : item
    );

    // Add the clicked letter to the second array
    const updatedSecondArray = [...secondArray, letter];

    // Update the state of both arrays
    setFirstArray(updatedFirstArray);
    setSecondArray(updatedSecondArray);
  };

  return (
    <div>
      <div>
        <h2>First Array:</h2>
        {firstArray.map((word, wordIndex) => (
          <div key={wordIndex}>
            {word.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter, wordIndex)}
                disabled={letter === ""}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Second Array:</h2>
        {secondArray.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </div>
  );
}

export default LetterArrayComponent;
