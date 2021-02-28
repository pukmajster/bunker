


function Root() {
    return html`
    ${BackgroundImageUrl({ url: 'https://images.wallpapersden.com/image/download/night-mountains-summer-illustration_a2plamaUmZqaraWkpJRsa25trWloaGU.jpg'})}
        <section id="main"  class="animate__animated animate__fadeIn">

            
            <div id="Toolbar" >
                ${Clock()}
                ${SearchBox()}
            </div>
            
            <div id="Bookmarks" >
                ${Bookmark({
                    label: 'YouTube',
                    url: 'https://www.youtube.com'
                })}
                ${Bookmark({
                    label: 'Facebook',
                    url: 'https://www.facebook.com'
                })}
                ${Bookmark({
                    label: 'Instagram',
                    url: 'https://www.instagram.com'
                })}
                ${Bookmark({
                    label: 'Reddit',
                    url: 'https://www.reddit.com'
                })}
                
                ${Bookmark({
                    label: 'Twitch',
                    url: 'https://www.twitch.com'
                })}
                ${Bookmark({
                    label: 'Gmail',
                    url: 'https://mail.google.com'
                })}
                ${Bookmark({
                    label: 'Messages',
                    url: 'https://messages.google.com/web/conversations',
                    baseUrl: 'https://messages.google.com'
                })}
                ${Bookmark({
                    label: 'VSS',
                    url: 'http://vss.scv.si/sl',
                    baseUrl: 'https://vss.scv.si',
                })}
            </div>
        </section>

        ${GamesDrawer()}
    `
}

function Bookmark({ label, url, baseUrl,  }) {

    let displayUrl = (baseUrl ?? url).replace('https://', '')

    return html`
        <a target="_blank" href="${baseUrl ?? url}"  >
            <div class="Bookmark" >
                <div class="BookmarkIcon" >
                    <img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${baseUrl ?? url}' />
                </div>

                <div class="BookmarkInfo" >
                    <div class="BookmarkInfo_Label" >${label}</div>
                    <div class="BookmarkInfo_Url" >${displayUrl}</div>
                </div>
            </div>
        </a>
    `
}

function Clock() {
    return html`
        <div id="Clock"></div>
        <div id="Date"></div>
    `;
}

function BackgroundLocalVideo() {
    return html`
        <div id="Background_LocalVideo" >
            <video autoplay muted loop src="media/openingscreen.webm"></video>
        </div>
    `
}

function BackgroundImageUrl({url}) {
    return html`
        <div id="Background_ImageUrl" >
            
        </div>
    `
}

function GoogleSearchBarIframe() {
    return html`
        <div id="GoogleIframeContainer" >
            <iframe
            width="500"
            src="https://www.google.com/webhp?igu=1" ></iframe>
        </div>
    `
}


function SearchBox() {
    return html`
        <div id="SearchBox" >
            <div class="blur" >
                <input id="Search_Input" type="text" placeholder="Google" />
            </div>

            <button id="Search_VoiceRecognition" class="iconButton"  > <i class="bi bi-mic"></i> </button>

        </div>
    `
}

function GamesDrawer() {
    return html`
        <div class="DrawerRoot" >

            <div class="DrawerHeader" >
                <h3>Steam Games</h3>    
            </div>

            <div class="DrawerContent SteamDrawer" > 
                ${SteamGame({ id: 730,          title: 'Counter-Strike: Global Offensive',  logoHash: 'd1159d1a4d0e18da4d74f85dbb4934d7a92ace2b'})}
                ${SteamGame({ id: 550,          title: 'Left 4 Dead 2',                     logoHash: '1a8d50f6078b5d023582ea1793b0e53813d57b7f'})}
                ${SteamGame({ id: 232090,       title: 'Killing Floor 2',                   logoHash: '98ab6d7da74551839cba1896f012f5e7398072a8'})}
                ${SteamGame({ id: 1238840,      title: 'Battlefield 1',                     logoHash: '435ac4a7011c6d09328d70f9a2cc7616ab6c10ca'})}
                ${SteamGame({ id: 1238810,      title: 'Battlefield V',                     logoHash: 'efa4f81c3558c637a107e9ac36fd11996022110c'})}
                ${SteamGame({ id: 1172470,      title: 'Apex Legends',                      logoHash: 'b43afd1b01edf1bcea4556ef9c8c15570c8fd940'})}
            </div>
        </div>
    `
}

function SteamGame({ id, title, logoHash }) {
    return html`
        <a href="steam://rungameid/${id}" target="_blank" >
            
            <div class="SteamGame" >
            <img  class="SteamGame_Backdrop" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg" width="300" />
                <img class="SteamGame_Icon" width="46" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${id}/${logoHash}.ico" />
                <div class="SteamGame_Label" >${title}</div>
            </div>
        </a>
    `
}

function Render(html) {
    let root = document.querySelector('bunker');

    if( root ) {
        root.innerHTML = html;
        console.log(html)
    }
}

function html(strings, ...values) {
    let str = '';
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
}

Render(Root());