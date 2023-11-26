function findObjects(){
    const mainDiv = document.getElementById('mainDiv');

    const addPlayerButton = document.getElementById('addPlayerButton');
    const addPlayerInput = document.getElementById('addPlayerInput');
    const PlayerList = document.getElementById('PlayerList');

    const teamsDiv = document.getElementById('teamsDiv');

    const TimerDiv = document.getElementById("TimerDiv");
    const WoordenDiv = document.getElementById("WoordenDiv");

    const PlayerText = document.getElementById("PlayerText");

    const TeamPunten = document.getElementById("TeamPunten");

}

function setupObjects(){
    addPlayerButton.addEventListener('click', addPlayer);
    addPlayerInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addPlayer();
        }
    });
}

function setupData(){
    players = []
    teams = []
    teamPlayerIndex = []
    currTeam = 0
    countDownTime = 0
    punten = []

    setWords();

}

function addPlayer(){
    players.push(addPlayerInput.value);

    ShowPlayerInList()

    addPlayerInput.value = '';
}

// Visuals
function ShowPlayerInList(){
    PlayerList.innerHTML = "";

    for (let i = 0; i < players.length; i++) {
        const newPlayerItem = document.createElement('li');
        newPlayerItem.innerText = players[i];
        PlayerList.appendChild(newPlayerItem);
    }
}

function ShowTeamsInList(){
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

function createTeams() {
    teams = [];

    playersLeft = []
    for (let i = 0; i < players.length; i++){
        playersLeft.push(players[i])
    } 
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
    
    mainDiv.className = "TeamsActive"
    ShowTeamsInList()
}

function startGame() {
    for (let i = 0; i < teams.length; i++) {
        teamPlayerIndex.push(0);
        punten.push(0);
    }
    mainDiv.className = "PlayerPageActive";
    PlayerText.innerText = teams[currTeam][teamPlayerIndex[currTeam]] + " ( Team " + (currTeam + 1) + " )";
}

function NextPlayer(){
    currTeam += 1;
    if (currTeam >= teams.length) {
        currTeam = 0;
    }
    teamPlayerIndex[currTeam] += 1;
    if (teamPlayerIndex[currTeam] >= teams[currTeam].length) {
        teamPlayerIndex[currTeam] = 0;
    }
    mainDiv.className = "PlayerPageActive";
    PlayerText.innerText = teams[currTeam][teamPlayerIndex[currTeam]] + " ( Team " + (currTeam + 1) + " )";

    puntenText = ""
    for (let i = 0; i < teams.length; i++){
        puntenText += "Team "+ (i+1) + ": " + punten[i] + " - "
    }
    TeamPunten.innerText = puntenText
}

function AddPunten(){
    punten[currTeam] += document.querySelectorAll('input[type="checkbox"]:checked').length
    NextPlayer()
}

function startTime() {
    countDownTime = new Date().getTime() + 30000;
    mainDiv.className = "WoordenPageActive"
    WoordenDiv.innerHTML = ""
    for (let i = 0; i < 5; i++) {
        const newWoordItem = document.createElement('li');
        const text = mogelijkeWoorden[Math.floor(Math.random() * mogelijkeWoorden.length)];
        newWoordItem.innerHTML = text+'<input type="checkbox" name="woordGeraden" />';
        WoordenDiv.appendChild(newWoordItem);
    }
}

function ShowTimeleft() {

    var now = new Date().getTime();
    var distance = countDownTime - now;
    TimerDiv.innerHTML = "" + (distance/1000).toFixed(0) + " seconden";

    if (distance < 0) {
        TimerDiv.innerHTML = "Tijd voorbij!";
    }
}


function onLoad(){
    findObjects();
    setupObjects();
    setupData();
    var loop1 = setInterval(ShowTimeleft, 100);

}

document.addEventListener('DOMContentLoaded', onLoad);

function setWords(){
    mogelijkeWoorden = [
        "Sterrenhemel", "Melkweg", "Danser", "Schildpad", "Koffiekopje",
        "Ruimteschip", "Laptop", "Dolfijn", "Trui", "Brug", "Kussen", "Struisvogel",
        "Kerstboom", "Lach", "Kasteel", "Sleutel", "Zwaan", "Kampvuur", "Wolk",
        "Gletsjer", "Maan", "Piano", "Fontein", "Satelliet", "Sneeuwvlok",
        "Luchtballon", "Raceauto", "Giraffe", "Watermeloen", "Puzzel", "Komeet",
        "Klif", "Robot", "Kermis", "Pinguïn", "Bibliotheek", "Struisvogel",
        "Telescoop", "Kleuren", "Zonnestelsel", "Eekhoorn", "Safari", "Vulkan",
        "Kameleon", "Theepot", "Regisseur", "Strandstoel", "Sprookje", "Klokkenluider",
        "Kokosnoot", "Waterglijbaan", "Microscoop", "Spiraal", "Einstein",
        "Fjord", "Mango", "Bamboe", "Zoetrope", "Boulevard", "Slang",
        "Stethoscoop", "Avocado", "Labyrint", "Sculptuur", "Kabouter", "Zwerm",
        "Ventilator", "Kanon", "Mammoet", "Tornado", "Zweep", "Rum", "Ark",
        "Arcade", "Wildebeest", "Mysterie", "Feniks", "Baksteen", "Pegasus",
        "Reflectie", "Vortex", "Jachtluipaard", "Wing Chun", "Mandarijn",
        "Bijenkorf", "Tapijt", "Pepermunt", "Ananas", "Landschap", "Bolero",
        "Cupcake", "Honingraat", "Komeet", "Compassie", "Geluk", "Harmonie",
        "Optimisme", "Sereniteit", "Tranquilliteit", "Vreugde", "Wijsheid"
    ]
}