document.addEventListener("DOMContentLoaded", function (event) {
    startTime()
    prepSpeechRecognition()
    prepSearchHandling();
});

const defaultConfig = `{
    "bookmarks": [
        {
            "category": "Social Media",
            "bookmarks": [
                { "label": "Facebook",              "url": "https://www.facebook.com" },
                { "label": "Messenger",             "url": "https://www.messenger.com" },
                { "label": "Instagram",             "url": "https://www.instagram.com" },
                { "label": "Reddit",                "url": "https://www.reddit.com" },
                { "label": "Twitter",               "url": "https://www.twitter.com" }
            ]
        },
        {
            "category": "Entertainment",
            "bookmarks": [
                { "label": "YouTube",               "url": "https://www.youtube.com" },
                { "label": "Twitch",                "url": "https://www.twitch.com" }
            ]
        }
    ],

    "steamGames": [
        { "id": 730,          "title": "Counter-Strike: Global Offensive",  "logoHash": "d1159d1a4d0e18da4d74f85dbb4934d7a92ace2b" }
    ],

    "voiceRecognitionLanguage": "en-US",

    "background": {
        "url": "https://images.wallpapersden.com/image/download/night-mountains-summer-illustration_a2plamaUmZqaraWkpJRsa25trWloaGU.jpg",
        "snow": {
            "enabled": true,
            "count": 200
        },
        "mist": {
            "enabled": false,
            "opacity": 5
        },
        "css": "filter: blur(0px) saturate(150%); transform: scale(1.1); opacity: 1"
    }
}`;

const baseConfig = `{
    "bookmarks": [
        
    ],

    "steamGames": [
        
    ],

    "voiceRecognitionLanguage": "en-US",

    "glass": {
        "background": "rgba(47, 43, 48, 0.568)",
        "backgroundHover": "rgba(47, 43, 48, 0.568)",
        "blur": 12
    },

    "background": {
        "url": "https://images.wallpapersden.com/image/download/night-mountains-summer-illustration_a2plamaUmZqaraWkpJRsa25trWloaGU.jpg",
        "snow": {
            "enabled": false,
            "count": 200
        },
        "mist": {
            "enabled": false,
            "opacity": 5
        },
        "css": ""
    }
}`;


const configLoad = JSON.parse(localStorage.getItem('saferoom_config') ?? defaultConfig);
// const config = {...JSON.parse(baseConfig), ...configLoad}
const config = Object.assign(JSON.parse(baseConfig), configLoad)
console.log(config);


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
        recognition.lang = config.voiceRecognitionLanguage ?? 'en-US';

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

