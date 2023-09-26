const countOccurences = (letter, string) => {
  let count = 0;
  // Loop through each letter in the string
  for (let i = 0; i < string.length; i++) {
    // If that letter in the string is the letter we are looking at then add 1 to the count
    if (string[i] === letter) {
      count += 1;
    }
  }
  return count; // return the final count
};

export default countOccurences;
