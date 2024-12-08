import ScrollReveal from 'scrollreveal';
import { format } from 'date-fns';
const axios = require('axios/dist/browser/axios.cjs');
const api_key = 'cc335d2e5cb1f5c23226c2b2502287ad';
const league_id = 128;  // ID de la liga que quieres consultar
const season = 2024;    // Temporada que quieres consultar

$(function() {
  $("#tabs").tabs(); // Inicializa las pestañas
});

axios.get('https://v3.football.api-sports.io/standings', {
	"headers": {
		"x-rapidapi-key": api_key
	},
	"params": {
		"league": league_id,
		"season": season
	}
})
.then(function (response) {
    const data = response.data;
    const standings = data.response[0].league.standings[0];
    createBoxs(standings);
    createTable(standings);
})
.catch(function (error) {
    console.error('Error al obtener la tabla de posiciones:', error);
})
.finally(function () {
    console.log('Solicitud finalizada.');
});

axios.get(`https://v3.football.api-sports.io/fixtures/?season=2024&league=128&next=10`, {
	"headers": {
		"x-rapidapi-key": api_key
	}
})
.then(function (response) {
    const data = response.data.response;
    showFixture(data);
})
.catch(function (error) {
    console.error('Error al obtener el fixture:', error);
})
.finally(function () {
    console.log('Solicitud finalizada.');
});

axios.get(`https://v3.football.api-sports.io/leagues`, {
	"headers": {
		"x-rapidapi-key": api_key
	}
})
.then(function (response) {
  const leagues = response.data.response;
  const league = leagues.find(league => league.league.id === 128);
  showInfoLeague(league);
})
.catch(function (error) {
    console.error('Error al obtener la liga:', error);
})
.finally(function () {
    console.log('Solicitud finalizada.');
});

function createBoxs(standings) {
    const container = document.getElementById("standings");
    let boxs = '';
    standings.forEach(teams => {
        boxs += `
<div class="box headline">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="${teams.team.logo}" alt="${teams.team.name}" />
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <h6>${teams.rank}</h6>
        <p>
          <strong>${teams.team.name}</strong> <small>${teams.team.id}</small>
          <br />
          Puntos:
          ${teams.points}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item has-text-primary" aria-label="reply">
            <span>
              G: ${teams.all.win}
            </span>
          </a>
          <a class="level-item has-text-primary" aria-label="retweet">
            <span>
              E: ${teams.all.draw}
            </span>
          </a>
          <a class="level-item has-text-primary" aria-label="like">
            <span>
              P: ${teams.all.lose}
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>  
        `;   
    });
    container.innerHTML = boxs;
    scrollReveal();
}

function showFixture(data) {
    const container = document.getElementById('fixtures');
    let boxes = '';
    data.forEach(element => {
        const timestamp = `${element.fixture.timestamp}` * 1000;
        const formattedDate = format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');

        boxes += `
<div class="box is-flex is-flex-direction-column is-justify-content-center is-align-items-center slide-up">
  <h5>${element.league.round}</h5>
  <p class="mb-3 has-text-primary">${formattedDate}</p>
  <div class="columns is-flex is-justify-content-center">
    <div class="column is-flex is-align-items-center">
      <img src="${element.teams.home.logo}" width="80" height="80">
      <h2 class="mx-2">${element.teams.home.name}</h2>
      <h1 class="mx-auto">VS</h1>
    </div>
    <div class="column is-flex is-align-items-center">
      <h2 class="mx-2">${element.teams.away.name}</h2>
      <img src="${element.teams.away.logo}" width="80" height="80">
    </div>
  </div>
  <p>${element.fixture.venue.name}</p>
  <p>${element.fixture.referee}</p>
</div> 
`;
    });
    container.innerHTML = boxes;
}

function showTable() {
  const table = document.getElementById('table');

  table.innerHTML = `
               <table class="table">
                <thead>
                  <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Logo</th>
                    <th>Team</th>
                    <th><abbr title="Played">Pld</abbr></th>
                    <th><abbr title="Won">W</abbr></th>
                    <th><abbr title="Drawn">D</abbr></th>
                    <th><abbr title="Lost">L</abbr></th>
                    <th><abbr title="Goals for">GF</abbr></th>
                    <th><abbr title="Goals against">GA</abbr></th>
                    <th><abbr title="Goal difference">GD</abbr></th>
                    <th><abbr title="Points">Pts</abbr></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Logo</th>
                    <th>Team</th>
                    <th><abbr title="Played">Pld</abbr></th>
                    <th><abbr title="Won">W</abbr></th>
                    <th><abbr title="Drawn">D</abbr></th>
                    <th><abbr title="Lost">L</abbr></th>
                    <th><abbr title="Goals for">GF</abbr></th>
                    <th><abbr title="Goals against">GA</abbr></th>
                    <th><abbr title="Goal difference">GD</abbr></th>
                    <th><abbr title="Points">Pts</abbr></th>
                  </tr>
                </tfoot>
                <tbody id="tbody"></tbody>
              </table>  
  `;
}

function createTable(data) {
  showTable()
  const tbody = document.getElementById('tbody');
  let trs = '';
  data.forEach(element => {
    trs += `
    <tr>
      <th>${element.rank}</th>
      <td><img src="${element.team.logo}" width="20" height="20"></td>
      <td>${element.team.name}</td>
      <td>${element.all.played}</td>
      <td>${element.all.win}</td>
      <td>${element.all.draw}</td>
      <td>${element.all.lose}</td>
      <td>${element.all.goals.for}</td>
      <td>${element.all.goals.against}</td>
      <td class="has-text-primary">${element.goalsDiff}</td>
      <td>${element.points}</td>
    </tr>
    `;
  });
  tbody.innerHTML = trs;
}

function showInfoLeague(data) {
  console.log(data);
  document.getElementById('title').textContent = `${data.league.name}`;
  document.getElementById('subtitle').textContent = `${data.country.name}`;
  document.getElementById('logo').src = `${data.league.logo}`;
  document.getElementById('flag').src = `${data.country.flag}`;
}

function scrollReveal() {
    ScrollReveal().reveal('.headline', {
        duration: 1000,
        origin: 'bottom',
        distance: '200px',
        opacity: 0.2,
        reset: true
    });  
}

$(function() {
  $("#tabs").tabs( "refresh" );
});