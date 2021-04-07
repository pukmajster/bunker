# Bunker
 My custom browser homepage. Very cool.

# Configuration

Here is an example of a valid Bunker configuration. Invalid JSON will be blocked, so make sure you get it right!

To remove the "Steam Games" section of the sidebar, simply remove the "steamGames" key. 

The "logoHash" attribute of games can be found on https://steamdb.info/.

sidebar.useFaviconKit switches from google's S2 to FaviconKit for fetching favicons.

```
{
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
        "blur": 0
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
}
```

# Screenshots

## Index
![Index](/media/example-main.PNG)

## Sidebar
![Sidebar](/media/example-sidebar.PNG)

## Config
![Config](/media/example-config.PNG)
