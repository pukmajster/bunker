document.addEventListener("DOMContentLoaded", function (event) {
    startTime()
    prepSpeachRecognition()
    prepSearchHandling();
});


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
    if(replace) document.getElementById('Search_Input').value = phrase;
    window.open(`https://www.google.com/search?q=${phrase}`);
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
//  Speach recognition for google search
// -------------------------------------------------------------------------

var activeSpeach = false;

// TODO: Fixed buggy toggling on the button

function prepSpeachRecognition() {
    try {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
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
        elem.innerHTML = '<i class="bi bi-mic"></i>'
    }

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            console.log('No speech was detected. Try again.');
        };

        let elem = document.getElementById('Search_VoiceRecognition');
        elem.innerHTML = '<i class="bi bi-mic"></i>'
    }

    recognition.onresult = function (event) {
        var transcript = event.results[event.resultIndex][0].transcript;
        console.log(transcript)
        searchForPhrase(transcript, false);
    }

    let elem = document.getElementById('Search_VoiceRecognition');
    elem.onclick = function (e) {
        if(activeSpeach) {
            recognition.stop();
        } else {
            recognition.start();
        }

        activeSpeach = !activeSpeach;
    };
}