////BACKGROUND COLOUR MANAGEMENT
var backgroundColorStage = 0
var backgroundColours = ['#a7d184', '#9bc6c3', '#edde9c']
var backgroundColoursShadows = ['#ddce92', '#8eb5b2', '#99c079']

changeBackground = () => {
  backgroundColorStage = backgroundColorStage + 1
  document.body.style.backgroundColor =
    backgroundColours[backgroundColorStage % 3]
}

showDiptongos = () => {
  var input = document.getElementById('userInput').value
  var IndexToShow = aWanalysis(input).indexOfDiptongos
  var divDiptongo = document.getElementById('textoDiptongo')
  // var divDiptongo = document.getElementyById()
  IndexToShow.forEach((element, index) => {
    var div = document.createElement('div')
    div.textContent =
      'Hay diptongo en la palabra ' +
      input +
      ' : ' +
      input[IndexToShow[index]] +
      input[IndexToShow[index] + 1]
    div.setAttribute('class', 'note')
    divDiptongo.appendChild(div)
  })
}
showHiatos = () => {
  var input = document.getElementById('userInput').value
  var IndexToShow = aWanalysis(input).indexOfHiatos
  var divDiptongo = document.getElementById('textoHiato')
  // var divDiptongo = document.getElementyById()
  IndexToShow.forEach((element, index) => {
    var div = document.createElement('div')
    div.textContent =
      'Hay hiato en la palabra ' +
      input +
      ' : ' +
      input[IndexToShow[index]] +
      input[IndexToShow[index] + 1]
    div.setAttribute('class', 'note')
    divDiptongo.appendChild(div)
  })
}

/////HTML integration
showSyllables = () => {
  showDiptongos()
  showHiatos()
  var input = document.getElementById('userInput').value
  var inputWord = cutAWordInSylables(input)

  console.log('indexOfHiatos ', aWanalysis(input).indexOfHiatos)

  console.log('indexO indivisibles', aWanalysis(input).indexOfunsplittables)
  var presentedWord = []
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
