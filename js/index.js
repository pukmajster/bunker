document.addEventListener("DOMContentLoaded", function (event) {
    startTime()
    prepSpeechRecognition()
    prepSearchHandling();
});

// The default config the user starts with, also the config used when a user resets the config
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

    "bookmarkOptions": {
        "alwaysOpenInNewTab": true,
        "useFaviconKit": false
    },

    "steamGames": [
        { "id": 730,          "title": "Counter-Strike: Global Offensive",  "logoHash": "d1159d1a4d0e18da4d74f85dbb4934d7a92ace2b" }
    ],

    "sidebar": {
        "idleOpacity": 0.06
    },

    "voiceReg": {
        "enabled": true,
        "language": "en-US"
    },

    "glass": {
        "background": "rgba(47, 43, 48, 0.568)",
        "backgroundHover": "rgba(47, 43, 48, 0.568)",
        "editorBackground": "rgba(0,0,0, 0.868)",
        "blur": 12
    },

    "background": {
        "url": "https://wallpaperaccess.com/full/7285.jpg",
        "snow": {
            "enabled": false,
            "count": 200
        },
        "mist": {
            "enabled": false,
            "opacity": 5
        },
        "css": "filter: blur(0px) saturate(150%); transform: scale(1.1); opacity: 1"
    }
}`;


// The user config is merged with this one to make sure some important bits aren't missing
const baseConfig = `{
    "bookmarks": [
        
    ],

    "bookmarkOptions": {
        "alwaysOpenInNewTab": true,
        "useFaviconKit": false
    },

    "steamGames": [
        
    ],

    "sidebar": {
        "idleOpacity": 0.06
    },

    "voiceReg": {
        "enabled": true,
        "language": "en-US"
    },

    "glass": {
        "background": "rgba(47, 43, 48, 0.568)",
        "backgroundHover": "rgba(47, 43, 48, 0.568)",
        "editorBackground": "rgba(0,0,0, 0.868)",
        "blur": 12
    },

    "background": {
        "url": "https://wallpaperaccess.com/full/7285.jpg",
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

    if(!config.voiceReg.enabled) return;

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

    // Don't init anything if voiceReg is disabled
    if(!config.voiceReg.enabled) return;

    try {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.lang = config.voiceReg.language ?? 'en-US';

        recognitionHandle = recognition;
    }
    catch (e) {
        console.error(e);
        return;
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

