//Spanish Divide Into Syllables

//some constants realted to spanish language
var AlphabetEs = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]
var vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú']
var vowelsTilde = ['á', 'é', 'í', 'ó', 'ú']
var openVowels = ['a', 'e', 'o', 'á', 'é', 'í', 'ó', 'ú']
var closedVowels = ['u', 'i', 'ü']
var consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
]
var possibleDobleLetters = ['r', 'l', 't']
var unsplittables = [
  'br',
  'cr',
  'dr',
  'gr',
  'fr',
  'kr',
  'tr',
  'bl',
  'cl',
  'gl',
  'fl',
  'kl',
  'pl',
  'gü',
  'ch',
]

//recives a string and returs an array of its sylables
var cutAWordInSylables = (analizedWord) => {
  var IsThereLeftToCut = true
  var splittedWord = []
  var leftToCut = analizedWord

  var cutAgaing = () => {
    var cutted = cutASyllable(leftToCut)
    splittedWord.push(cutted[0])
    leftToCut = cutted[1]
    if (cutted.length <= 1 || analizedWord.length < 2) {
      IsThereLeftToCut = false
    }
    if (IsThereLeftToCut) {
      cutAgaing()
    }
  }
  cutAgaing()

  return splittedWord
}
