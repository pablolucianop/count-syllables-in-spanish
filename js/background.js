////BACKGROUND COLOUR MANAGEMENT
var backgroundColorStage = 0
var backgroundColours = ['#a7d184', '#9bc6c3', '#edde9c']
var backgroundColoursShadows = ['#ddce92', '#8eb5b2', '#99c079']

changeBackground = () => {
  backgroundColorStage = backgroundColorStage + 1
  document.body.style.backgroundColor =
    backgroundColours[backgroundColorStage % 3]
  // ss
}

/////HTML integration
showSyllables = () => {
  var input = document.getElementById('userInput').value
  var inputWord = cutAWordInSylables(input)
  var presentedWord = []
  console.log(presentedWord)
  showNextSyllable = () => {
    presentedWord.push(inputWord[presentedWord.length])
    document.getElementById('texto').innerHTML = presentedWord.join(' - ')
  }

  for (let index = 0; index < inputWord.length; index++) {
    document.getElementById('spellBt').disabled = true
    setTimeout(function () {
      showNextSyllable()
      changeBackground()
    }, 0 + 1000 * index)
  }
  setTimeout(function () {
    document.getElementById('spellBt').disabled = false
  }, 0 + 1000 * inputWord.length)
}
