let output = document.querySelector('.output');
let inputTranslate = document.querySelector('#phrase');
let inputDefine = document.querySelector('#word');

// To be combined to use just one sendRequest function
const UrlOptions = {
  'translate': 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=',

  'define': 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q='
}

let regex = /\s/g;



inputTranslate.addEventListener('keypress', debounce(sendRequest, 600));
inputDefine.addEventListener('keypress', debounce(sendRequestDefine, 600));


// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  };

  function sendRequest() {

    // inputTranslate.getAttribute('id')

    let content = inputTranslate.value;
    content.replace(regex, "+")
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${content}`)
    .then(data => data.json()).then(data => output.textContent = data[0][0][0]);
}
  function sendRequestDefine() {

    // inputTranslate.getAttribute('id')

    let content = inputDefine.value;
    content.replace(regex, "+")
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${content}`)
    
    .then(data => data.json())
    
    .then(data => output.textContent = data[0].meanings.map(scopes => { 
      
        console.log(scopes);
        
      return `Part of Speech: ${scopes.partOfSpeech} - Definition:  ${scopes.definitions[0].definition}` 
    
    }));
}

// to implement, unofficial dictionary api

// https://api.dictionaryapi.dev/api/<--version-->/entries/<--language_code-->/<--word-->
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
