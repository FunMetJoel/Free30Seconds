function AddPlayerScript() {
    const addButton = document.getElementById('addButton');
    const newItemInput = document.getElementById('newItemInput');
    const myList = document.getElementById('PlayerList');

    if (!addButton || !newItemInput || !myList) {
        return;
    }

    function addPlayer() {
        const newItem = document.createElement('li');
        newItem.innerText = newItemInput.value;
        myList.appendChild(newItem);
        players.push(document.getElementById('newItemInput').value);
        newItemInput.value = '';
    }

    addButton.addEventListener('click', addPlayer);
    newItemInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addPlayer();
        }
    });
}

function ShowPlayerInList(){
    const myList = document.getElementById('PlayerList');
    if (!myList) {
        return;
    }
    for (let i = 0; i < players.length; i++) {
        const newItem = document.createElement('li');
        newItem.innerText = players[i];
        myList.appendChild(newItem);
    }
}

function ShowTeamsInList(){
    teamsDiv = document.getElementById("teams");
    if (!teamsDiv) {
        return;
    }
    teamsDiv.innerHTML = "";

    for (let i = 0; i < teams.length; i++) {
        let teamDiv = document.createElement("div");
        teamDiv.className = "team";
        addHTML = "";
        addHTML = "<H2>Team " + (i + 1) + "</H2><ul>";
        for (let j = 0; j < teams[i].length; j++) {
            addHTML += "<li>" + teams[i][j] + "</li>";
        }
        addHTML += "</ul>";
        teamDiv.innerHTML = addHTML;
        teamsDiv.appendChild(teamDiv);
    }
}

function NextPlayer() {
    currPlayerDiv = document.getElementById("currPlayer");
    if (!currPlayerDiv) {
        return;
    }
    currPlayerDiv.innerHTML = "";
    
    currTeam += 1;
    if (currTeam >= teams.length) {
        currTeam = 0;
    }
    setJSONCookie("currTeam", currTeam, 1);
    teamPlayerIndex[currTeam] += 1;
    if (teamPlayerIndex[currTeam] >= teams[currTeam].length) {
        teamPlayerIndex[currTeam] = 0;
    }
    setJSONCookie("teamPlayerIndex", teamPlayerIndex, 1);
    currPlayerDiv.innerHTML = "<p>De volgende speler is:</p>";
    currPlayerDiv.innerHTML += "<H2>" + teams[currTeam][teamPlayerIndex[currTeam]] + " ( Team " + (currTeam + 1) + " )</H2>";
    currPlayerDiv.innerHTML += "<p>Ben je er klaar voor?!</p>";
}

function getTimeleft() {
    let timeleftHTML = getElementById("woorden");
    if (timeleftHTML == null) {
        return;
    }
    
    timeleftHTML.innerHTML = timeleft;
}

function onStart() {
    alert("Test");
    AddPlayerScript();
    ShowPlayerInList();
    ShowTeamsInList();
    NextPlayer();
    var x = setInterval(getTimeleft, 100);
}

// Function to set a JSON cookie
function setJSONCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
}

// Function to get a JSON cookie
function getJSONCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return JSON.parse(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return null;
}

function createTeams() {
    setJSONCookie("players", players, 1);
    teams = [];
    playersLeft = players;
    while (playersLeft.length > 0) {
        let team = [];
        for (let i = 0; i < 2; i++) {
            let randomPlayer = playersLeft[Math.floor(Math.random() * playersLeft.length)];
            team.push(randomPlayer);
            playersLeft.splice(playersLeft.indexOf(randomPlayer), 1);
        }
        if (playersLeft.length == 1) {
            team.push(playersLeft[0]);
            playersLeft.splice(0, 1);
        }
        teams.push(team);
    }
    
    setJSONCookie("teams", teams, 1);
    window.location.href = "teams.html";
}

function startGame() {
    setJSONCookie("players", players, 1);
    setJSONCookie("teams", teams, 1);
    for (let i = 0; i < teams.length; i++) {
        teamPlayerIndex.push(0);
    }
    setJSONCookie("teamPlayerIndex", teamPlayerIndex, 1);
    window.location.href = "game.html";
}

function startTime() {
    window.location.href = "woorden.html";
}

function resetGame() {
    setJSONCookie("players", [], 1);
    window.location.href = "index.html";
}

let players = getJSONCookie("players"); 
if (players == null) {
    players = [];
}

let teams = getJSONCookie("teams"); 
if (teams == null) {
    teams = [];
}

let teamPlayerIndex = getJSONCookie("teamPlayerIndex");
if (teamPlayerIndex == null) {
    teamPlayerIndex = [];
}

let currTeam = getJSONCookie("currTeam");
if (currTeam == null) {
    currTeam = 0;
}

let countDownTime = new Date().getTime() + 30000;

document.addEventListener('DOMContentLoaded', onStart);


