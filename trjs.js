//Spanish Divide Into Syllables

//some constants realted to spanish language
var AlphabetEs= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var vowels = ['a','e','i','o','u','á','é','í','ó','ú']
var vowelsTilde = ['á','é','í','ó','ú']
var openVowels =['a','e','o','á','é','í','ó','ú']
var closedVowels= [ 'u', 'i','ü' ]
var consonants = ['b','c','d','f','g','h','j','k','l','m','n','ñ','p','q','r','s','t','v','w','x','y','z']
var possibleDobleLetters = ['r', 'l', 't']
var unsplittables = ['br','cr','dr', 'gr', 'fr', 'kr', 'tr','bl', 'cl', 'gl', 'fl', 'kl', 'pl', 'gü', 'ch']


////BACKGROUND COLOUR MANAGEMENT
var backgroundColorStage=0
var backgroundColours = ['#a7d184', '#9bc6c3', '#edde9c']
var backgroundColoursShadows = ['#ddce92', '#8eb5b2', '#99c079']

changeBackground= () =>{
	backgroundColorStage = backgroundColorStage + 1
		document.body.style.backgroundColor = backgroundColours[backgroundColorStage % 3];
		// ss
	
}


////WORD PROCESING FUNCTIONS
// takes a string and returns it splitted letter by letter 
aWsplittedF=(analizedWord) =>{
	 var analizedWordSplit = analizedWord.split('')
	 return analizedWordSplit
}

// takes a string and returns an array that distinguish between consonants , open vowels and closed vowals, making ['c', 'oV', 'cV'...]
VowelOrConsonant = (analizedWord) =>{
	var wordProcesed = []
	//tests every letter of the word
	for (var i = 0; i < analizedWord.length; i++) {
		var letterRecognized = false
		var isVowel = false
		//againts every vowel
		for (var e = 0; e < vowels.length; e++) {
			//is a vowel?
			if (vowels[e] === analizedWord[i] ) {
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
				if(closedVowels[d]===analizedWord[i] && letterRecognized ===false){
					wordProcesed.push('vC')
					letterRecognized = true
				} 
			}  
			if (letterRecognized === false){
					wordProcesed.push('vO')
					letterRecognized = true
			}
		}
	}
	return wordProcesed
}

//search for a string insde a string and return an index
getIndicesOf = (searchStr, str, caseSensitive) =>{
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

//finds vowels and returns an index of them
indexOfVowels = (aWvowelOrConsonant) =>{
	var ubicationVowels = []
	for (var i = 0; i < aWvowelOrConsonant.length; i++) {
		var repetition = 0
		if (aWvowelOrConsonant[i] === 'vO' || aWvowelOrConsonant[i] === 'vC' ) {
			ubicationVowels.push(i);
		}
	}
	return ubicationVowels
}

//finds diptongos and returns an index of them
findDiptongos = (aWSplitted) =>{
	var diptongosIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there is a closed vowel
		if (aWSplitted[i] === 'i' || aWSplitted[i] === 'u' ) {
			for (var e = 0; e < vowels.length; e++) {
				//finds if there is a vowel before the closed vowel
				if (aWSplitted[i-1]=== vowels[e] ) {
				diptongosIndex.push(i-1)
				//finds if there is a vowel after the closed vowel
				} else if (aWSplitted[i+1]=== vowels[e]){
					////console.log('hay diptongo vocal abierta despues,  ', aWSplitted[i-1],aWSplitted[i+1] )
					diptongosIndex.push(i)
				}
			}
		}
	}
	//eliminates duplicates caused by two closed vowels diptongos
	uniqueArray = diptongosIndex.filter((item, pos) => {
	    return diptongosIndex.indexOf(item) == pos;
	})

	return uniqueArray
}

//finds hiatos and returns an index of them
findHiatos=(aWSplitted)=>{
	var hiatosIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there is an open vowel
		for (var e = 0; e < openVowels.length; e++) {
			if (aWSplitted[i] === openVowels[e]) {
				for (var o = 0; o < openVowels.length; o++) {
					if (aWSplitted[i+1] === openVowels[o]) {
						hiatosIndex.push(i)
					}
				}
			}
		}

	}
	//eliminates duplicates caused by two closed vowels diptongos
	var uniqueArray = hiatosIndex.filter((item, pos) => {
	    return hiatosIndex.indexOf(item) == pos;
	})

	return uniqueArray
}

//finds rr or ll and returns an index of them
findDobleLetters = (aWSplitted) =>{
	var dobleLettersIndex = []
	for (var i = 0; i < aWSplitted.length; i++) {
		//finds if there a possible doble letter

		for (var e = 0; e < possibleDobleLetters.length; e++) {
			// ////console.log('aWSplitted[i]', aWSplitted[i])
			// ////console.log('possibleDobleLetters[e]',aWSplitted[e] )
			if (aWSplitted[i] === possibleDobleLetters[e]) {
				////console.log('rrr o llll',aWSplitted[i] )
				if (aWSplitted[i] === aWSplitted[i+1]) {
					dobleLettersIndex.push(i)
				}
				
			}
		}
	}

	//eliminates duplicates caused by two closed vowels diptongos
	var uniqueArray = dobleLettersIndex.filter((item, pos) => {
	    return dobleLettersIndex.indexOf(item) == pos;
	})
	return uniqueArray
}

//finds an array of strings and returns an index of them
getIndicesOfThese = (findThese, text) =>{
	arr = []
	for (var i = 0; i < findThese.length; i++) {
		findThese[i]
		arr.push(getIndicesOf(findThese[i], text))
	}
	var merged = [].concat.apply([], arr)
	var mergedNsorted = merged.sort((a, b) =>{return a - b})
	uniqueArray = mergedNsorted.filter((item, pos) =>{
	    return mergedNsorted.indexOf(item) == pos;
	})
	return uniqueArray
}

//finds unsplittables strings and returns an index of them
findUnsplittables = (analizedWord) =>{
	return getIndicesOfThese(unsplittables,analizedWord)
}

//returns a full word analysis based in the info returned by functions above
aWanalysis = (analizedWord) =>{
	var analizedWordObj = {
		aWoriginal:analizedWord,
		analizedWord:analizedWord.toLowerCase(),
		aWSplitted: aWsplittedF (analizedWord.toLowerCase()),
		aWvowelOrConsonant:VowelOrConsonant(analizedWord.toLowerCase()),
		aWindexOfVowels: indexOfVowels(VowelOrConsonant(analizedWord.toLowerCase())),
		indexOfDiptongos:findDiptongos(aWsplittedF (analizedWord.toLowerCase())),
		indexOfHiatos:findHiatos(aWsplittedF (analizedWord.toLowerCase())),
		indexOfdobleLetters:findDobleLetters(aWsplittedF (analizedWord.toLowerCase())),
		indexOfunsplittables:findUnsplittables(analizedWord),
		aWTotalySplitted:false,
	}
	return analizedWordObj
}


//recives a string and returns an array, with the ['first Sylable', 'the rest of the string, left to beeing cut']
cutASyllable = (analizedWord) =>{
	var firstVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[0]
	var firstHiatoIndex = aWanalysis(analizedWord).indexOfHiatos[0]
	var firstDiptongoIndex = aWanalysis(analizedWord).indexOfDiptongos[0]
	var firstUnsplittableIndex = aWanalysis(analizedWord).indexOfunsplittables[0]
	var secondVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[1]
	var thirdVowelIndex = aWanalysis(analizedWord).aWindexOfVowels[2]
	var firstRepeatedLetterIndex = aWanalysis(analizedWord).indexOfdobleLetters[0]
	var consonantsBetweenVowels =aWanalysis(analizedWord).aWindexOfVowels[1] -aWanalysis(analizedWord).aWindexOfVowels[0]
	var wordBeingCut = null
	var firstSyllable = null

	cutFirstSyllableHere = (whereToCut) =>{
			firstSyllable = analizedWord.substring(0,whereToCut);
			wordBeingCut= analizedWord.substring(whereToCut);
	}

	//////// HERE IS WHERE THE RULES OF SPLITTING A WORD APPLIES!!
	// if its there are no more than three letters to cut, 'cut' it in the end
	if (analizedWord.length < 2 ){
		cutFirstSyllableHere(analizedWord.length)
	// if its there an hiato, cut the syllable between bowels
	} else if (firstVowelIndex === firstHiatoIndex ){
		cutFirstSyllableHere(firstHiatoIndex+1)
	//else if its there a diptongo, cut the syllable one before the third vowel	
	} else if (firstVowelIndex === firstDiptongoIndex) {
		cutFirstSyllableHere(thirdVowelIndex-1)
	//else if, there is a repeated letter, cut the syllable two letter before the second vowel 
	} else if(secondVowelIndex-2 === firstRepeatedLetterIndex){
		cutFirstSyllableHere(secondVowelIndex-2)
		//else if, there are four consonants between the first vowel and the second, split it after the second consonant
	} else if(secondVowelIndex-5 === firstVowelIndex){
		cutFirstSyllableHere(secondVowelIndex-2)
	//else if, there are three consonants between the first vowel and the second, 
	} else if(secondVowelIndex-4 === firstVowelIndex){
		//if there is an unsplittable string right after the vowel
		if(firstUnsplittableIndex === firstVowelIndex+1 ){
			//split it after the unsplittable. The unsplittables have two characters
			cutFirstSyllableHere(firstVowelIndex+3)}
		//if there is an unsplittable string a character after the vowel
		else if(firstUnsplittableIndex === firstVowelIndex+2 ){
		//split it before unsplittable.
			cutFirstSyllableHere(firstVowelIndex+2)
		}else{
		//if none of the above, split it right after the three consonants.
			cutFirstSyllableHere(firstVowelIndex+3)
		}
	//else if, there are two consonants between the first vowel and the second, 
	} else if(secondVowelIndex-3 === firstVowelIndex){
		//is there an unsplittable there?
		if(firstUnsplittableIndex === firstVowelIndex+1 ){
		//split it after the vowel
		cutFirstSyllableHere(firstVowelIndex+1)
		}else{
		//split the two consonants in halves
			cutFirstSyllableHere(firstVowelIndex+2)
		}		
	//if none of the avobe, (there is one consonant between two vowels)
	}else{
		//split it one character before the second vowel
		cutFirstSyllableHere(secondVowelIndex-1)
	}

	if(firstSyllable === ''){
		var wordProcess = [wordBeingCut]
	}else if (firstSyllable === ''){
		var wordProcess = [wordBeingCut]
	} else {
		var wordProcess = [firstSyllable ,wordBeingCut ]
	}
	return wordProcess
}

//recives a string and returs an array of its sylables
cutAWordInSylables = (analizedWord) =>{
	var IsThereLeftToCut = true
	var splittedWord = []
	var leftToCut = analizedWord

	cutAgaing= () =>{
	 	var cutted = cutASyllable(leftToCut)
	 	splittedWord.push(cutted[0])
	 	leftToCut = cutted[1]
	 	if(cutted.length <= 1 || analizedWord.length<2){ IsThereLeftToCut = false}
		 if (IsThereLeftToCut) {cutAgaing()}	
		 console.log('cortado')
	 }
	 cutAgaing()
 return  splittedWord
}


//TESTING PART!
//array of words and correct spelling
 var testedValues = [[['a'], [ 'a']],[['águila'], [ 'á','gui','la']],[['abril'], [ 'a','bril']],[['averigüéis'], [ 'a','ve','ri','güéis']],[['ren'], [ 'ren']],[['contra'], [ 'con','tra']],[['instaurar'], [ 'ins','tau','rar']],[['acróbata'], [ 'a' ,'cró','ba','ta']],[['esdrújulo'], [ 'es' ,'drú','ju','lo']], [['gato'], [ 'ga' ,'to']],[['perro'], [ 'pe' ,'rro']],[['alerta'], [ 'a','ler','ta']],[['atraco'], [ 'a' ,'tra','co']],[['centellear'], [ 'cen', 'te', 'lle', 'ar' ]],[['plenitud'], [ 'ple' ,'ni','tud']],[['Esti'], [ 'Es','ti']],[['terremoto'], [ 'te','rre','mo','to']],[['perro'], [ 'pe' ,'rro']],[['canario'], [ 'ca' ,'na', 'rio']],[['callo'], [ 'ca' ,'llo']],[['abstracto'], [ 'abs' ,'trac','to']],[['perrito'], [ 'pe' ,'rri','to']]]

 //function that checks if arrays match
var arraysMatch = (arr1, arr2) => {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	// Otherwise, return true
	return true;
}

//test individual word and result and log error
testWordSplitting = (analizedWord, wordSpelledCorrect) =>{
	var autoCuttedWord = cutAWordInSylables(analizedWord)
	if(arraysMatch(autoCuttedWord,wordSpelledCorrect)){
		console.log('ok')
		return true
	}else{
		console.log('error')
		return [analizedWord, autoCuttedWord,wordSpelledCorrect ]
	}
}
//test all the array
test = (testedValues) =>{
	var errorsArray = []
	for (var i = 0; i < testedValues.length; i++) {
		var wordTestResult = testWordSplitting(testedValues[i][0][0],testedValues[i][1])
		if(wordTestResult != true){
			errorsArray.push(wordTestResult)
		}
	}
	return errorsArray
}


test(testedValues)


/////HTML integration
showSyllables=() =>{
	var input = document.getElementById("userInput").value;
	var inputWord = cutAWordInSylables(input)
	var presentedWord = []
	console.log(presentedWord)
	showNextSyllable=()=>{
		presentedWord.push(inputWord[presentedWord.length])
		document.getElementById("texto").innerHTML = presentedWord.join(" - ");  
	  }
	
	for (let index = 0; index < inputWord.length; index++) {
		
		setTimeout(function () { showNextSyllable()
			changeBackground()
		}, 0 + (1000 * index));	
	}
		


 }


