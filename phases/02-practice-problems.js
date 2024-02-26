function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  let charFreq = {};
  for (let char of str1) {
    charFreq[char] = (charFreq[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!charFreq[char]) {
      return false;
    }
    charFreq[char] - 1;
  }
  return true;
}


function commonElements(arr1, arr2) {
  let uniqueSet = new Set(arr1);
  let common = [];
  for (let a of arr2) {
    if (uniqueSet.has(a)) {
      common.push(a);
      uniqueSet.delete(a);
    }
  }
  return common;
}


function duplicate(arr) {
  let seen = new Set();
  for (let a of arr) {
    if (seen.has(a)) {
      return a;
    } else {
      seen.add(a);
    }
  }
  return null;
}


function twoSum(nums, target) {
  let seen = new Set();
  for (let num of nums) {
    let complement = target - num;
    if (seen.has(complement)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}


function wordPattern(pattern, words) {
  const charToWordMap = new Map();
  const wordToCharMap = new Map();

  if (pattern.length !== words.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (!charToWordMap.has(char) && !wordToCharMap.has(word)) {
      charToWordMap.set(char, word);
      wordToCharMap.set(word, char);
    } else if (charToWordMap.get(char) !== word || wordToCharMap.get(word) !== char) {
      return false;
    }
  }
  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];