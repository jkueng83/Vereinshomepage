// Your API token: f0d6d55d981a43c8a2a81d9657ce0e26

var myHeaders = new Headers();

myHeaders.append("x-auth-token", "f0d6d55d981a43c8a2a81d9657ce0e26");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let urlCompetitions = "https://api.football-data.org/v2/competitions";

function loadCompetitions() {
  fetch(urlCompetitions, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //appendData(data);

      // console.log(data);

      let html = "<ul>";

      data.competitions.forEach((competition) => {
        console.log(competition.name);

        if (
          competition.id == 2002 || // 2002  Bundesliga (Deutschland)
          competition.id == 2017 || // 2017 Primeira Liga (Portugal)
          competition.id == 2021 || // 2021 Premier League (England)
          competition.id == 2019 || // 2019 Seria A (Italien)
          competition.id == 2014 // 2014 Primera Division (Spain)
        ) {
          html +=
            "<li class='sidemenuebutton' onclick='openCompetition(" +
            competition.id +
            ")'>" +
            competition.name +
            " - " +
            competition.area.name +
            "</li>";
        }
      });

      // console.log(html);

      html += "</ul>";

      document.getElementById("idSidebarLeft").innerHTML = html;
      

    })

    .catch(function (err) {
      console.log(err);
    });
}

function openCompetition(competitionId) {
  openTableOfCompetition(competitionId);
  //loadTeamsOfCompetition(competitionId);
  loadTeamsOfCompetitionWithHandlebars(competitionId)
}

function openTableOfCompetition(competitionId) {
  let urlTable =
    "https://api.football-data.org/v2//competitions/" +
    competitionId +
    "/standings";

  fetch(urlTable, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //appendData(data);

      //console.log(data);

      let html = "<table>";
      html +=
        "<tr> <caption>" +
        data.competition.name +
        " - " +
        data.competition.area.name +
        "</caption> </tr>";
      html +=
        "<tr class='tableRowHead'>" +
        "<th class='columnWithMiddle'> Platz </th>" +
        "<th lass='columnWithTeam'> Verein </th>" +
        "<th class='columnWithSmall'> Spiele </th>" +
        "<th class='columnWithSmall'> S </th>" +
        "<th class='columnWithSmall'> U </th>" +
        "<th class='columnWithSmall'> N </th>" +
        "<th class='columnWithMiddle'> Tore </th>" +
        "<th class='columnWithSmall'> +/- </th>" +
        "<th class='columnWithSmall'> P </th>" +
        "</tr>";

      data.standings[0].table.forEach((place) => {
        html += "<tr>";
        html +=
          "<td class='textAlignCenter'>" +
          place.position +
          "</td> <td>" +
          place.team.name +
          "</td> <td class='textAlignCenter'>" +
          place.playedGames +
          "</td> <td class='textAlignCenter'>" +
          place.won +
          "</td> <td class='textAlignCenter'>" +
          place.draw +
          "</td> <td class='textAlignCenter'>" +
          place.lost +
          "</td> <td class='textAlignCenter'>" +
          place.goalsFor +
          " : " +
          place.goalsAgainst +
          "</td> <td class='textAlignCenter'>" +
          place.goalDifference +
          "</td> <td class='textAlignCenter'>" +
          place.points +
          "</td>";

        html += "</tr>";
      });

      html += "</table>";

      //console.log(html);
      document.getElementById("idTable").innerHTML = html;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function loadTeamsOfCompetition(competitionId) {

  

  let urlTeamsOfCompetition =
    "https://api.football-data.org/v2/competitions/" + competitionId + "/teams";

  fetch(urlTeamsOfCompetition, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //appendData(data);

      //console.log(data);

      let html = "" ;

      data.teams.forEach((team) => {

        //console.log(template(team));
        //html += template(team)
        html +=
        
        
          " <div class='sidemenuebutton' onclick='listTeamMembers(" +
          team.id +
          ")'> " +
          team.name +
          " </div> ";


      });

      
      //console.log(html);
      document.getElementById("teams").innerHTML = html;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function loadTeamsOfCompetitionWithHandlebars(competitionId){

  var source = document.getElementById("team-template").innerHTML;
  var template = Handlebars.compile(source);

  

  let urlTeamsOfCompetition =
    "https://api.football-data.org/v2/competitions/" + competitionId + "/teams";

  fetch(urlTeamsOfCompetition, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //appendData(data);

      //console.log(data);

      let html = "" ;

      data.teams.forEach((team) => {

        //console.log(template(team));
        html += template(team)
        //html +=
        //  " <div class='sidemenuebutton' onclick='listTeamMembers(" +
        //  team.id +
        //  ")'> " +
        //  team.name +
       //   " </div> ";


      });

      
      //console.log(html);
      document.getElementById("teamsHendlebars").innerHTML = html;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function listTeamMembers(teamId) {
  let url = "https://api.football-data.org/v2/teams/" + teamId;

  fetch(url, requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //appendData(data);

      //console.log(data);

      let html =
        " <div class='centertitle'> Spieler vom Verein: " +
        data.name +
        " </div> <ul class='playercardscontainer'> ";

      data.squad.forEach((player) => {
        let d = new Date(player.dateOfBirth);

        html +=
          "<li class='playercard'>" +
          "<div class='image'> <img src='../image/Ziege.jpg' alt='Ziege'/> </div>" +
          "<div class='name'>" +
          player.name +
          "</div>" +
          "<div class='position'>";
        if (player.position != null) {
          html += player.position;
        } else if (player.role != null) {
          html += player.role;
        }
        html +=
          "</div>" + "<div class='birthday'>" + d.toLocaleDateString() + "</div>" + "</li>";
      });

      html += " </ul";

      //console.log(html);

      document.getElementById("teamMembers").innerHTML = html;
    })
    .catch(function (err) {
      console.log(err);
    });
}

loadCompetitions();
openCompetition(2002);
loadTeamsOfCompetitionWithHandlebars(2002);
