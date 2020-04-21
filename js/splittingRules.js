//recives a string and returns an array, with the ['first Sylable', 'the rest of the string, left to beeing cut']
var cutASyllable = (analizedWord) => {
  var firstVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[0]
  var firstHiatoIndex = aWanalysis(analizedWord).indexOfHiatos[0]
  var firstDiptongoIndex = aWanalysis(analizedWord).indexOfDiptongos[0]
  var firstUnsplittableIndex = aWanalysis(analizedWord).indexOfunsplittables[0]
  var secondVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[1]
  var thirdVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[2]
  var firstRepeatedLetterIndex = aWanalysis(analizedWord).indexOfdobleLetters[0]
  var consonantsBetweenVowels =
    aWanalysis(analizedWord).aWindexOfVowels[1] -
    aWanalysis(analizedWord).aWindexOfVowels[0]
  var wordBeingCut = null
  var firstSyllable = null

  var cutFirstSyllableHere = (whereToCut) => {
    firstSyllable = analizedWord.substring(0, whereToCut)
    wordBeingCut = analizedWord.substring(whereToCut)
  }

  //////// HERE IS WHERE THE RULES OF SPLITTING A WORD APPLIES!!
  // if its there are no more than three letters to cut, 'cut' it in the end
  if (analizedWord.length < 2) {
    cutFirstSyllableHere(analizedWord.length)
    // if its there an hiato, cut the syllable between bowels
  } else if (firstVowelIndex === firstHiatoIndex) {
    cutFirstSyllableHere(firstHiatoIndex + 1)
    //else if its there a diptongo, cut the syllable one before the third vowel
  } else if (firstVowelIndex === firstDiptongoIndex) {
    cutFirstSyllableHere(thirdVowelIndex - 1)
    //else if, there is a repeated letter, cut the syllable two letter before the second vowel
  } else if (secondVowelIndex - 2 === firstRepeatedLetterIndex) {
    cutFirstSyllableHere(secondVowelIndex - 2)
    //else if, there are four consonants between the first vowel and the second, split it after the second consonant
  } else if (secondVowelIndex - 5 === firstVowelIndex) {
    cutFirstSyllableHere(secondVowelIndex - 2)
    //else if, there are three consonants between the first vowel and the second,
  } else if (secondVowelIndex - 4 === firstVowelIndex) {
    //if there is an unsplittable string right after the vowel
    if (firstUnsplittableIndex === firstVowelIndex + 1) {
      //split it after the unsplittable. The unsplittables have two characters
      cutFirstSyllableHere(firstVowelIndex + 3)
    }
    //if there is an unsplittable string a character after the vowel
    else if (firstUnsplittableIndex === firstVowelIndex + 2) {
      //split it before unsplittable.
      cutFirstSyllableHere(firstVowelIndex + 2)
    } else {
      //if none of the above, split it right after the three consonants.
      cutFirstSyllableHere(firstVowelIndex + 3)
    }
    //else if, there are two consonants between the first vowel and the second,
  } else if (secondVowelIndex - 3 === firstVowelIndex) {
    //is there an unsplittable there?
    if (firstUnsplittableIndex === firstVowelIndex + 1) {
      //split it after the vowel
      cutFirstSyllableHere(firstVowelIndex + 1)
    } else {
      //split the two consonants in halves
      cutFirstSyllableHere(firstVowelIndex + 2)
    }
    //if none of the avobe, (there is one consonant between two vowels)
  } else {
    //split it one character before the second vowel
    cutFirstSyllableHere(secondVowelIndex - 1)
  }

  if (firstSyllable === '') {
    wordProcess = [wordBeingCut]
  } else if (firstSyllable === '') {
    wordProcess = [wordBeingCut]
  } else {
    wordProcess = [firstSyllable, wordBeingCut]
  }
  return wordProcess
}
