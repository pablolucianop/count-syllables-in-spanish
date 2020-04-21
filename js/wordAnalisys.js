////WORD PROCESING FUNCTIONS
// takes a string and returns it splitted letter by letter
var aWsplittedF = (analizedWord) => {
  var analizedWordSplit = analizedWord.split('')
  return analizedWordSplit
}

// takes a string and returns an array that distinguish between consonants , open vowels and closed vowals, making ['c', 'oV', 'cV'...]
var VowelOrConsonant = (analizedWord) => {
  var wordProcesed = []
  //tests every letter of the word
  for (var i = 0; i < analizedWord.length; i++) {
    var letterRecognized = false
    var isVowel = false
    //againts every vowel
    for (var e = 0; e < vowels.length; e++) {
      //is a vowel?
      if (vowels[e] === analizedWord[i]) {
        isVowel = true
      }
    }
    //if it istn a vowel, its a consonant
    if (isVowel === false) {
      // console.log('consonante')
      wordProcesed.push('c')
    }
    //if its a vowel, its closed?
    if (isVowel) {
      for (var d = 0; d < closedVowels.length; d++) {
        if (closedVowels[d] === analizedWord[i] && letterRecognized === false) {
          wordProcesed.push('vC')
          letterRecognized = true
        }
      }
      if (letterRecognized === false) {
        wordProcesed.push('vO')
        letterRecognized = true
      }
    }
  }
  return wordProcesed
}

//search for a string insde a string and return an index
var getIndicesOf = (searchStr, str, caseSensitive) => {
  var searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  var startIndex = 0,
    index,
    indices = []
  if (!caseSensitive) {
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + searchStrLen
  }
  return indices
}

//finds vowels and returns an index of them
var indexOfVowels = (aWvowelOrConsonant) => {
  var ubicationVowels = []
  for (var i = 0; i < aWvowelOrConsonant.length; i++) {
    var repetition = 0
    if (aWvowelOrConsonant[i] === 'vO' || aWvowelOrConsonant[i] === 'vC') {
      ubicationVowels.push(i)
    }
  }
  return ubicationVowels
}

//finds diptongos and returns an index of them
var findDiptongos = (aWSplitted) => {
  var diptongosIndex = []
  for (var i = 0; i < aWSplitted.length; i++) {
    //finds if there is a closed vowel
    if (aWSplitted[i] === 'i' || aWSplitted[i] === 'u') {
      for (var e = 0; e < vowels.length; e++) {
        //finds if there is a vowel before the closed vowel
        if (aWSplitted[i - 1] === vowels[e]) {
          diptongosIndex.push(i - 1)
          //finds if there is a vowel after the closed vowel
        } else if (aWSplitted[i + 1] === vowels[e]) {
          ////console.log('hay diptongo vocal abierta despues,  ', aWSplitted[i-1],aWSplitted[i+1] )
          diptongosIndex.push(i)
        }
      }
    }
  }
  //eliminates duplicates caused by two closed vowels diptongos
  var uniqueArray = diptongosIndex.filter((item, pos) => {
    return diptongosIndex.indexOf(item) == pos
  })

  return uniqueArray
}

//finds hiatos and returns an index of them
var findHiatos = (aWSplitted) => {
  var hiatosIndex = []
  for (var i = 0; i < aWSplitted.length; i++) {
    //finds if there is an open vowel
    for (var e = 0; e < openVowels.length; e++) {
      if (aWSplitted[i] === openVowels[e]) {
        for (var o = 0; o < openVowels.length; o++) {
          if (aWSplitted[i + 1] === openVowels[o]) {
            hiatosIndex.push(i)
          }
        }
      }
    }
  }
  //eliminates duplicates caused by two closed vowels diptongos
  var uniqueArray = hiatosIndex.filter((item, pos) => {
    return hiatosIndex.indexOf(item) == pos
  })

  return uniqueArray
}

//finds rr or ll and returns an index of them
var findDobleLetters = (aWSplitted) => {
  var dobleLettersIndex = []
  for (var i = 0; i < aWSplitted.length; i++) {
    //finds if there a possible doble letter

    for (var e = 0; e < possibleDobleLetters.length; e++) {
      // ////console.log('aWSplitted[i]', aWSplitted[i])
      // ////console.log('possibleDobleLetters[e]',aWSplitted[e] )
      if (aWSplitted[i] === possibleDobleLetters[e]) {
        ////console.log('rrr o llll',aWSplitted[i] )
        if (aWSplitted[i] === aWSplitted[i + 1]) {
          dobleLettersIndex.push(i)
        }
      }
    }
  }

  //eliminates duplicates caused by two closed vowels diptongos
  var uniqueArray = dobleLettersIndex.filter((item, pos) => {
    return dobleLettersIndex.indexOf(item) == pos
  })
  return uniqueArray
}

//finds an array of strings and returns an index of them
var getIndicesOfThese = (findThese, text) => {
  arr = []
  for (var i = 0; i < findThese.length; i++) {
    findThese[i]
    arr.push(getIndicesOf(findThese[i], text))
  }
  var merged = [].concat.apply([], arr)
  var mergedNsorted = merged.sort((a, b) => {
    return a - b
  })
  uniqueArray = mergedNsorted.filter((item, pos) => {
    return mergedNsorted.indexOf(item) == pos
  })
  return uniqueArray
}

//finds unsplittables strings and returns an index of them
var findUnsplittables = (analizedWord) => {
  return getIndicesOfThese(unsplittables, analizedWord)
}

//returns a full word analysis based in the info returned by functions above
var aWanalysis = (analizedWord) => {
  var analizedWordObj = {
    aWoriginal: analizedWord,
    analizedWord: analizedWord.toLowerCase(),
    aWSplitted: aWsplittedF(analizedWord.toLowerCase()),
    aWvowelOrConsonant: VowelOrConsonant(analizedWord.toLowerCase()),
    aWindexOfVowels: indexOfVowels(
      VowelOrConsonant(analizedWord.toLowerCase())
    ),
    indexOfDiptongos: findDiptongos(aWsplittedF(analizedWord.toLowerCase())),
    indexOfHiatos: findHiatos(aWsplittedF(analizedWord.toLowerCase())),
    indexOfdobleLetters: findDobleLetters(
      aWsplittedF(analizedWord.toLowerCase())
    ),
    indexOfunsplittables: findUnsplittables(analizedWord),
    aWTotalySplitted: false,
  }
  return analizedWordObj
}
