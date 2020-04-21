//TESTING PART!
//array of words and correct spelling
var testedValues = [
  [['a'], ['a']],
  [['águila'], ['á', 'gui', 'la']],
  [['abril'], ['a', 'bril']],
  [['averigüéis'], ['a', 've', 'ri', 'güéis']],
  [['ren'], ['ren']],
  [['contra'], ['con', 'tra']],
  [['instaurar'], ['ins', 'tau', 'rar']],
  [['acróbata'], ['a', 'cró', 'ba', 'ta']],
  [['esdrújulo'], ['es', 'drú', 'ju', 'lo']],
  [['gato'], ['ga', 'to']],
  [['perro'], ['pe', 'rro']],
  [['alerta'], ['a', 'ler', 'ta']],
  [['atraco'], ['a', 'tra', 'co']],
  [['centellear'], ['cen', 'te', 'lle', 'ar']],
  [['plenitud'], ['ple', 'ni', 'tud']],
  [['Esti'], ['Es', 'ti']],
  [['terremoto'], ['te', 'rre', 'mo', 'to']],
  [['perro'], ['pe', 'rro']],
  [['canario'], ['ca', 'na', 'rio']],
  [['callo'], ['ca', 'llo']],
  [['abstracto'], ['abs', 'trac', 'to']],
  [['perrito'], ['pe', 'rri', 'to']],
]

//function that checks if arrays match
var arraysMatch = (arr1, arr2) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  // Otherwise, return true
  return true
}

//test individual word and result and log error
testWordSplitting = (analizedWord, wordSpelledCorrect) => {
  var autoCuttedWord = cutAWordInSylables(analizedWord)
  if (arraysMatch(autoCuttedWord, wordSpelledCorrect)) {
    console.log('ok')
    return true
  } else {
    console.log('error', analizedWord, autoCuttedWord, wordSpelledCorrect)
    return [analizedWord, autoCuttedWord, wordSpelledCorrect]
  }
}
//test all the array
var test = (testedValues) => {
  var errorsArray = []
  for (var i = 0; i < testedValues.length; i++) {
    var wordTestResult = testWordSplitting(
      testedValues[i][0][0],
      testedValues[i][1]
    )
    if (wordTestResult != true) {
      errorsArray.push(wordTestResult)
    }
  }
  return errorsArray
}

// test(testedValues)
