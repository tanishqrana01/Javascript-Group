async function searchPlayer() {
    const playerName = document.getElementById('playerName').value;
    if (!playerName) {
        alert("Please enter a player name!");
        return;
    }

    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${encodeURIComponent(playerName.trim())}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3cead017bfmshaea480faeaded56p18b918jsnc107642224c1',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const players = result.player;

        if (players && players.length > 0) {
            displayPlayers(players);
        } else {
            console.log("Player not found!");
        }
    } catch (error) {
        console.error("Error fetching player:", error);
    }
}

function displayPlayers(players) {
    const playerList = document.getElementById('playerList');
    const playerInfoContainer = document.getElementById('playerInfoContainer');
    playerList.innerHTML = ''; // Clear previous results
    playerInfoContainer.style.display = 'none'; // Hide player info container

    players.forEach(player => {
        const playerSection = document.createElement('div');
        playerSection.className = 'section';

        playerSection.innerHTML = `
            <strong>${player.name}</strong> <br>
            <em>${player.teamName}</em>
        `;

        playerSection.addEventListener('click', () => {
            fetchPlayerInfo(player.id);
        });

        playerList.appendChild(playerSection);
    });
}

async function fetchPlayerInfo(playerId) {
    const infoUrl = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`;
    const infoOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '840c39e63amsh57a071eaed17766p113247jsnffa5d671e507',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    try {
        const infoResponse = await fetch(infoUrl, infoOptions);
        const playerInfo = await infoResponse.json();

        const playerDetails = `
            <img src="${playerInfo.image || 'https://via.placeholder.com/100'}" alt="${playerInfo.name}" style="width:100px; height:auto;"><br>
            <div class="player-info">
                <strong>Name:</strong> ${playerInfo.name || 'N/A'}<br>
                <strong>Nickname:</strong> ${playerInfo.nickName || 'N/A'}<br>
                <strong>Role:</strong> ${playerInfo.role || 'N/A'}<br>
                <strong>Batting Style:</strong> ${playerInfo.bat || 'Not available'}<br>
                <strong>Bowling Style:</strong> ${playerInfo.bowl || 'Not available'}<br>
                <strong>Height:</strong> ${playerInfo.height || 'N/A'}<br>
                <strong>Birth Place:</strong> ${playerInfo.birthPlace || 'N/A'}<br>
                <strong>Country:</strong> ${playerInfo.intlTeam || 'N/A'}<br>
                <strong>Date of Birth:</strong> ${playerInfo.DoB || 'N/A'}<br>
                <strong>Teams:</strong> ${playerInfo.teams || 'N/A'}<br><br>
                <strong>Bio:</strong> <div style="text-align: left;">${playerInfo.bio || 'N/A'}</div>
            </div>
        `;

        document.getElementById('playerInfo').innerHTML = playerDetails;

        // Hide player list and show player info container
        document.getElementById('playerList').style.display = 'none';
        document.getElementById('playerInfoContainer').style.display = 'block';
    } catch (error) {
        console.error("Error fetching player info:", error);
    }
}

function showPlayerList() {
    document.getElementById('playerList').style.display = 'block';
    document.getElementById('playerInfoContainer').style.display = 'none';
}
