document.addEventListener("DOMContentLoaded", function (event) {
    startTime()
    prepSpeechRecognition()
    prepSearchHandling();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

// -------------------------------------------------------------------------
//  Clockwork
// -------------------------------------------------------------------------

function startTime() {

    var today = new Date();

    let elem = document.getElementById('Clock');
    let elemDate = document.getElementById('Date');

    if (elem) {
        elem.innerHTML =  today.toLocaleTimeString();
    }

    if (elemDate) {
        elemDate.innerHTML = today.toLocaleTimeString();
        elemDate.innerHTML = today.toUTCString().split(' ').slice(0, 4).join(' ')
    }
    
    var t = setTimeout(startTime, 500);
}

// -------------------------------------------------------------------------
//  Google search
// -------------------------------------------------------------------------

const searchElem = document.getElementById('Search_Input'); 

function searchForPhrase(phrase, replace = false) {
    // if(replace) document.getElementById('Search_Input').value = phrase;
    window.open(`https://www.google.com/search?q=${phrase}`, '_blank');
}


function prepSearchHandling(e) {
    const searchElem = document.getElementById('Search_Input'); 

    searchElem.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            searchForPhrase(searchElem.value);
        }
    });
}


// -------------------------------------------------------------------------
//  Speech recognition for google search
// -------------------------------------------------------------------------

var activeSpeech = false;
var recognitionHandle;


let toggleVoiceRecognition = () => {

    let elem = document.getElementById('Search_VoiceRecognition');

    if(activeSpeech) {
        recognitionHandle.stop();
        elem.innerHTML = '<i class="bi bi-mic"></i>';
        activeSpeech = false;
    } else {
        recognitionHandle.start();
        elem.innerHTML = '<i class="bi bi-mic-mute"></i>';
        activeSpeech = true;
    }

}

// TODO: Fixed buggy toggling on the button
function prepSpeechRecognition() {
    try {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.lang = config.voiceRegLanguage;

        recognitionHandle = recognition;
    }
    catch (e) {
        console.error(e);
    }

    recognition.onstart = function () {
        let elem = document.getElementById('Search_VoiceRecognition');
        elem.innerHTML = '<i class="bi bi-mic-mute"></i>';
    }

    recognition.onspeechend = function () {
        let elem = document.getElementById('Search_VoiceRecognition');
        elem.innerHTML = '<i class="bi bi-mic"></i>';
        activeSpeech = false;
    }

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            console.log('No speech was detected. Try again.');
        };

        let elem = document.getElementById('Search_VoiceRecognition');
        elem.innerHTML = '<i class="bi bi-mic"></i>';
        activeSpeech = false;
    }

    recognition.onresult = function (event) {
        activeSpeech = false;
        var transcript = event.results[event.resultIndex][0].transcript;
        console.log(transcript)
        searchForPhrase(transcript, false);
    }

    let elem = document.getElementById('Search_VoiceRecognition');
    elem.onclick = () => toggleVoiceRecognition();
}

// -------------------------------------------------------------------------
//  Focus on the search input when pressing anykey if not already focused
// -------------------------------------------------------------------------

let allowKeyboard = false;

document.addEventListener("keydown", (e) => {

    if(allowKeyboard) return;

    if( e.keyCode === 18 ) {
        e.preventDefault();
        toggleVoiceRecognition();   
    } else document.getElementById('Search_Input')?.focus();
}, false);

const defaultConfig = `{
    "bookmarks": [],
    "steamgames": [],
    "voiceRegLanguage": "en-US",
    "snow": false
}`;

const config = JSON.parse(localStorage.getItem('saferoom_config') ?? defaultConfig);