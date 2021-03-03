function Root() {
    return html`
        ${BackgroundImageUrl({ url: 'https://images.wallpapersden.com/image/download/night-mountains-summer-illustration_a2plamaUmZqaraWkpJRsa25trWloaGU.jpg'})}
        <section id="main"  class="animate__animated animate__fadeIn">
            
            <div id="Top" >
                ${Clock()}
                ${SearchBox()}
            </div>

            <div id="Bookmarks2" >
                ${config.bookmarks.map(category => BookmarkCategory({ 
                    label: category.category,
                    children: category.bookmarks.map(bookmark => Bookmark2(bookmark)).join('')
                })).join('')}
            </div>
        </section>

        ${GamesDrawer()}
        ${EditorDialog({id: 'Config'})}

        <div id="Snow">
            ${Snow()}
        </div>
    `
}

function Bookmark2({ label, url, baseUrl, logoUrl }) {

    let displayUrl = (baseUrl ?? url).replace('https://', '')

    return html`
        <a target="_system" href="${url ?? baseUrl}"  >
            <div class="Bookmark" >
                <div class="BookmarkIcon" >
                    <img height="16" width="16" src='http://www.google.com/s2/favicons?sz=192&domain_url=${logoUrl ?? baseUrl ?? url}' />
                </div>

                <div class="BookmarkInfo" >
                    <div class="BookmarkInfo_Label" >${label}</div>
                    <div class="BookmarkInfo_Url" >${displayUrl}</div>
                </div>
            </div>
        </a>
    `
}

function BookmarkCategory({label, children}) {
    return html`
        <div class="BookmarkCategory" >
            <div class="BookmarkCategory_Label">${label}</div>
            <div class="BookmarkCategory_Bookmarks">${children}</div>
        </div>
    `;
}

function Clock() {
    return html`
        <div>
            <div id="TimePanel" >
                <div id="Clock"></div>
                <div id="Date"></div>
            </div>
        </div>
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
        <div id="Background_ImageUrl" style="${config?.background?.css ?? ''}" ></div>
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
                <input  id="Search_Input" type="text" placeholder="Google" />
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

            <div class="DrawerContent SteamDrawer" > ${config.steamgames.map(sg => SteamGame(sg)).join('')}</div>

            <div class="DrawerHeader" >
                <h3>Configuration</h3>    
            </div>

            <div class="DrawerContent SteamDrawer_Configuration" > 
                <button onclick="__ToggleConfigEditor()" > Configure Bunker </button>
            </div>
        </div>
    `
}

function SteamGame({ id, title, logoHash }) {

    let logo = !!logoHash ? `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${id}/${logoHash}.ico` :  'media/steam_icon_logo.svg'

    return html`
        <div>
            <a href="steam://rungameid/${id}" >
                <div class="SteamGame aSteamGame--expandable" >
                    <img  class="SteamGame_Backdrop" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg" width="300" />
                    <img class="SteamGame_Icon" width="46" src="${logo}" />
                    <div class="SteamGame_Label" >${title}</div>
                </div>
            </a>
        </div>
    `
}

function __ToggleConfigEditor() {
    let elem = document.getElementById('Editor_Config');
    allowKeyboard = elem.classList.toggle('open');
}

function __RevertEditorChanges() {
    let elem = document.getElementById('EditorTextarea_Config');
    elem.value = localStorage.getItem('saferoom_config') ?? defaultConfig;
    document.getElementById('Editor_AbortedSave').classList.remove('open');
}

function __LoadConfigBackup() {
    let elem = document.getElementById('EditorTextarea_Config');
    let backup = localStorage.getItem('saferoom_config_backup');
    if(backup) {
        elem.value = backup;
        document.getElementById('Editor_AbortedSave').classList.remove('open');
    }
}

function __SaveConfig() {
    let elem = document.getElementById('EditorTextarea_Config');
    let json = elem.value;

    try {
        JSON.parse(json);
        localStorage.setItem('saferoom_config_backup', localStorage.getItem('saferoom_config'));
        localStorage.setItem('saferoom_config', elem.value);
        location.reload();
    } catch (e) {
        console.log('Invalid JSON. Aborting.');
        document.getElementById('Editor_AbortedSave').classList.add('open');
    }
}

function EditorDialog({ id }) {

    let cfg = localStorage.getItem('saferoom_config') ?? defaultConfig;

    // https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea

    return html`
        <div class="EditorRoot" id="Editor_${id}" >
            <textarea
                spellcheck="false"
                id="EditorTextarea_${id}"

                onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'    '+v.substring(e);this.selectionStart=this.selectionEnd=s+4;return false;}"
            >${cfg}</textarea>

            <div class="Editor_Actions">
                <button onclick="__ToggleConfigEditor()" > Close </button>
                <button onclick="__RevertEditorChanges()" > Revert Changes </button>
                <button onclick="__LoadConfigBackup()" > Load Backup </button>
                <button onclick="__SaveConfig()" > Save </button>

                <span id="Editor_AbortedSave" >Invalid JSON! Save aborted.</span>
            </div>

        </div>
    `
}

function setLang(value) {
    localStorage.setItem(localKeys.vrLang, value);
    recognitionHandle = value;
    location.reload();
}

function LanguageSelector() {
    let defaultVrLang = localStorage.getItem(localKeys.vrLang);

    if(!defaultVrLang) {
        defaultVrLang = languages[0].code;
        localStorage.setItem(localKeys.vrLang, defaultVrLang)
    }
    
    return html`
        <select onchange="setLang(this.value)"  >
            ${ languages.map(lang => html`<option value=${lang.code} ${defaultVrLang === lang.code ? 'selected' : ''} >${lang.label}</option>>`) }
        </select>
    `
}

function Toolbar() {
    return html`
        <div id="Toolbar" >
            ${ToolbarItem({ 
                url: 'https://docs.google.com/spreadsheets',
                icon: 'bi-file-word'
            })}
            ${ToolbarItem({ 
                url: 'https://docs.google.com/spreadsheets',
                icon: 'bi-file-excel'
            })}
            ${ToolbarItem({ 
                url: 'https://docs.google.com/spreadsheets',
                icon: 'bi-file-fpowerpoint'
            })}
            ${ToolbarItem({ 
                url: 'https://docs.google.com/spreadsheets',
                icon: 'bi-google-drive gg-arrow-right'
            })}
            ${ToolbarItem({ 
                url: 'https://docs.google.com/spreadsheets',
                icon: 'file-word'
            })}
        </div>
    `
}

function ToolbarItem({url, icon}) {
    return html`
        <div class="Toolbar_Item" >
            <i  class="bi  fas ${icon}"></i>
        </div>
    `
}

function Snow() {
    return html`<div class="snow"></div>`.repeat( config.snow ? 200 : 0 )
}

function Render(html) {
    let root = document.querySelector('bunker');

    if( root ) {
        root.innerHTML = html;
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