# Bunker
 My custom browser homepage. Very cool.

## Configuration

Here is an example of a valid Bunker configuration. Invalid JSON will be blocked, so make sure you get it right!

### Steam Games

To remove the "Steam Games" section of the sidebar, simply remove the "steamGames" key. 
The "logoHash" attribute of games can be found on https://steamdb.info/.

```
{
    "bookmarks": [
        {
            "category": "Social Media",
            "bookmarks": [
                { "label": "Facebook",              "url": "https://www.facebook.com" },
                { "label": "Messenger",             "url": "https://www.messenger.com" },
                { "label": "Instagram",             "url": "https://www.instagram.com" }
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
        { "id": 730,          "title": "Counter-Strike: Global Offensive",  "logoHash": "d1159d1a4d0e18da4d74f85dbb4934d7a92ace2b" },
        { "id": 550,          "title": "Left 4 Dead 2",                     "logoHash": "1a8d50f6078b5d023582ea1793b0e53813d57b7f" }
    ],

    "voiceRecognitionLanguage": "en-US",

    "glass": {
        "background": "rgba(43,43,43, 0.25)",
        "backgroundHover": "rgba(47, 43, 48, 0.35)",
        "blur": 30
    },

    "background": {
        "url": "https://cdn.hipwallpaper.com/i/65/76/HErnXq.jpg",
        "snow": {
            "enabled": false,
            "count": 200
        },
        "mist": {
            "enabled": true,
            "opacity": 6
        },
        "css": "filter: blur(3px) saturate(100%); transform: scale(1.1); opacity: .65"
    }
}
```

## Screenshots

### Index
![Index](/media/example-main.PNG)

### Sidebar
![Sidebar](/media/example-sidebar.PNG)

### Config
![Config](/media/example-config.PNG)
