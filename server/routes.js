const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
config.connectTimeout = 60000;
config.acquireTimeout = 60000;
config.timeout = 60000;
console.log('Connecting to rds');
const connection = mysql.createConnection(config);
console.log('Connected to rds');

  
/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Query 1, top 20 Athletes ---- */
const getTop20Atheletes = (req, res) => {
  console.log('Top 20 performing atheletes:');
  const query = `
    WITH winners AS(
      SELECT Athlete_ID 
      FROM Participates 
      WHERE medal = 'Gold'),
      top AS(
      SELECT a.ID, COUNT(*)  
      FROM Athlete a JOIN winners w
      ON a.ID = w.Athlete_ID
      GROUP BY a.ID
      ORDER BY COUNT(*) DESC
      LIMIT 20)
    SELECT a.Name 
    FROM Athlete a
    JOIN top t ON a.ID = t.ID;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};


<<<<<<< HEAD
/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop10Countries = (req, res) => {
  const query = `
    SELECT Country_name FROM Country ORDER BY GDP DESC LIMIT 10
    `;
    connection.query(query, (err, rows, fields) => {
      if (err) console.log(err);
      else res.json(rows);
    });
  };

const getTop20Athletes = (req, res) => {
=======
/* ---- Query 2 top 20 countries ---- */
const getTop20Countries = (req, res) => {
  console.log('Top 20 performing countries:');
>>>>>>> 917e7afdbeb2df8a1a7a2eec455f2ea76664ce0e
  const query = `
      WITH winners AS(
      SELECT Athlete_ID, Olympic_ID, Event_ID 
      FROM Participates 
      WHERE medal = "Gold"),
      topcountry AS
      (SELECT * 
      FROM Athlete a JOIN winners w
      ON a.ID = w.Athlete_ID
      WHERE NOC <> "ERR"
      GROUP BY NOC, Olympic_ID, Event_ID),
      medal AS (
      SELECT NOC, COUNT(*) AS medals
      FROM topcountry t
      GROUP BY NOC
      ORDER BY COUNT(*) DESC
      LIMIT 20)
      SELECT c.Country_name, m.medals
      FROM medal m
      JOIN Country c
      ON m.NOC = c.NOC
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 1', top 20 Athletes by input sport ---- */
const getTop20AtheletesBySport = (req, res) => {
  var sportName = req.params.sportName;
  const query = `
      WITH sport AS(
      SELECT Olympic_ID, Event_ID
      FROM Game_Event
      WHERE sport = "` + sportName `"), 
      winners AS(
      SELECT Athlete_ID
      FROM Participates p
      JOIN sport d
      ON d.Olympic_ID = p.Olympic_ID AND d.Event_ID = p.Event_ID 
      WHERE medal = "Gold"
      GROUP BY Athlete_ID
      ORDER BY COUNT(*) DESC
      LIMIT 20)
      SELECT a.Name 
      FROM winners w
      JOIN Athlete a
      ON a.ID = w.Athlete_ID
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
    ;
  });
};

/* ---- Query 3 name of top 20 sports given input country ---- */
const getTop20SportsGivenCountry = (req, res) => {
  var countryName = req.params.countryName;
  const query = `
      WITH winners AS(
      SELECT Athlete_ID, Olympic_ID, Event_ID 
      FROM Participates p
      JOIN Athlete a ON a.ID = p.Athlete_ID 
      WHERE medal = "Gold" AND a.NOC = "` + countryName + `"
      GROUP BY a.NOC, p.Olympic_ID, p.Event_ID)
      SELECT ge.Sport, COUNT(*) AS medals
      FROM winners w
      JOIN Game_Event ge 
      ON w.Olympic_ID = ge.Olympic_ID AND w.Event_ID = ge.Event_ID 
      GROUP BY Sport 
      ORDER BY COUNT(*) DESC 
      LIMIT 20
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 4 Distribution of medals based on countries in an input sport in an input decade with input medal type
  ---- */
const getMedalsGivenSportandDecade = (req, res) => {
  var decade = req.params.decade;
  var sport = req.params.sport;
  var medalType =req.params.medalType
  const query = `
      WITH sport AS(
      SELECT Olympic_ID, Event_ID
      FROM Game_Event
      WHERE sport = "` + sport + `"), 
      decade AS(
      SELECT s.Olympic_ID, s.Event_ID, og.Year
      FROM Olympic_Game og JOIN sport s
      ON s.Olympic_ID = og.Olympic_ID 
      WHERE FLOOR(Year/10)*10 = ` + decade + `),
      winners AS(
      SELECT Athlete_ID, d.Year
      FROM Participates p
      JOIN Athlete a ON a.ID = p.Athlete_ID
      JOIN decade d
      ON d.Olympic_ID = p.Olympic_ID AND d.Event_ID = p.Event_ID 
      WHERE medal =  "` + medalType + `"
      GROUP BY a.NOC, p.Event_ID, p.Olympic_ID
      )
      SELECT a.Country, COUNT(*) AS medals 
      FROM winners w
      JOIN Athlete a
      ON a.ID = w.Athlete_ID
      GROUP BY a.Country
      ORDER BY COUNT(*) DESC 
      LIMIT 20
; 
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
  });
};

/* ---- Query 5 Olympic performance (number of gold medals) of developed countries ---- */
const getDeveloped = (req, res) => {
  const query = `
        With Wealthy AS(
        	SELECT DISTINCT(NOC)
        	From Country
        	WHERE GDP*1000/Population >= 12000
        	AND NOC <> 'ERR'),
        useful AS(
        	SELECT Country, NOC, Olympic_ID, Event_ID, Medal
        	FROM Athlete a 
        	JOIN Participates p ON a.ID = p.Athlete_ID
        	WHERE NOC <> 'ERR'
        	AND NOC IN
        		(SELECT NOC
        		FROM Wealthy)	
        	AND Medal = 'Gold'),
        info AS(
        	SELECT *
        	FROM useful
        	GROUP BY NOC, Olympic_ID, Event_ID)
        SELECT Country, COUNT(*) AS Medals
        FROM info
        GROUP BY NOC
        ORDER BY COUNT(*) DESC
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 6 Olympic performance (number of gold medals) of underdeveloped countries ---- */
const getUnderdeveloped = (req, res) => {
  const query = `
        With poor AS(
        	SELECT DISTINCT(NOC) AS NOC
        	From Country
        	WHERE GDP*1000/Population < 1000
        	AND NOC <> 'ERR'),
        useful AS(
        	SELECT Country, NOC, Olympic_ID, Event_ID, Medal
        	FROM Athlete a
        	JOIN Participates p ON a.ID = p.Athlete_ID
        	WHERE NOC <> 'ERR'
        	AND (Medal = 'Gold' OR Medal = 'Silver' OR Medal = 'Bronze')
        	AND NOC IN
        		(SELECT NOC 
        FROM poor)),
        info AS(
        	SELECT *
        	FROM useful
        	GROUP BY NOC, Olympic_ID, Event_ID),
        withEvents AS(
        	SELECT i.Country, i.NOC, i.Olympic_ID, i.Event_ID, ge.Sport, i.Medal
        	FROM info i
        	JOIN Game_Event ge 
        ON i.Olympic_ID = ge.Olympic_ID AND i.Event_ID = ge.Event_ID),
        finall AS(
        	SELECT Sport, COUNT(*) AS Medals
        	FROM withEvents
        	GROUP BY Sport
        	ORDER BY COUNT(*) DESC)
        SELECT *
        FROM finall
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 7  Olympic athlete participation ratio ---- */
const getParticipationRatio = (req, res) => {
  const query = `
        With Participation AS(
        	SELECT Country, NOC, Olympic_ID, COUNT(DISTINCT(ID)) AS Participants
        	FROM Athlete a 
        	JOIN Participates p ON a.ID = p.Athlete_ID
        	WHERE NOC <> 'ERR'
        	GROUP BY NOC, Olympic_ID),
        AVER AS(
        	SELECT Country, NOC, ROUND(SUM(Participants)/COUNT(Olympic_ID),0) AS Average_Participants
        	FROM Participation
        	GROUP BY NOC),
        perCapita AS(
        	SELECT a.Country, a.NOC, Average_Participants, Population
        	FROM AVER a
        	JOIN Country c ON a.NOC = c.NOC)
        SELECT Country, NOC, Average_Participants, Population, ROUND(1000*Population/Average_Participants) AS Athlete_Ratio
        FROM perCapita
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 8  Average number of medals per athlete for each country ---- */
const getAverageMedalsPerAthlete = (req, res) => {
  const query = `
        With Participation AS(
          SELECT Country, NOC, Olympic_ID, COUNT(DISTINCT(ID)) AS Participants
          FROM Athlete a 
          JOIN Participates p ON a.ID = p.Athlete_ID
          WHERE NOC <> 'ERR'
          GROUP BY NOC, Olympic_ID),
        AVER AS(
          SELECT Country, NOC, ROUND(SUM(Participants)/COUNT(Olympic_ID),0) AS Average_Participants
          FROM Participation
          GROUP BY NOC),
        medals AS(
          SELECT Country, NOC, Olympic_ID, Medal
          FROM Athlete a 
          JOIN Participates p ON a.ID = p.Athlete_ID
          WHERE NOC <> 'ERR'
          AND (Medal = 'Gold' OR Medal = 'Silver' OR Medal = 'Bronze')),
        medalcounts AS(
          SELECT Country, NOC, Olympic_ID, COUNT(*) AS Medals
          FROM medals
          GROUP BY NOC, Olympic_ID),
        avgMedalcounts AS(
          SELECT Country, NOC, ROUND(SUM(Medals)/COUNT(DISTINCT(Olympic_ID)),0) AS Average_Medals
          FROM medalcounts
          GROUP BY NOC),
        agg AS(
          SELECT a.Country, a.NOC, a.Average_Participants, m.Average_Medals
          FROM avgMedalcounts m
          JOIN AVER a ON m.NOC = a.NOC)
        SELECT Country, NOC, ROUND(Average_Medals/Average_Participants, 2) AS Medal_Per_Athlete
        FROM agg
        ORDER BY ROUND(Average_Medals/Average_Participants, 2) DESC
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 9  Average age of gold medal winners of a given sport in a given decade ---- */
const getAverageAge = (req, res) => {
  var decade = req.params.decade;
  var sport = req.params.sport;

  const query = `
        WITH sport AS(
          SELECT Olympic_ID, Event_ID
          FROM Game_Event
          WHERE sport = "` + sport + `"), 
        decade AS(
          SELECT s.Olympic_ID, s.Event_ID, og.Year
          FROM Olympic_Game og JOIN sport s
          ON s.Olympic_ID = og.Olympic_ID 
          WHERE FLOOR(Year/10)*10 =  ` + decade + `),
        winners AS(
          SELECT Athlete_ID, d.Year
          FROM Participates p
          JOIN decade d
          ON d.Olympic_ID = p.Olympic_ID AND d.Event_ID = p.Event_ID 
          WHERE medal = "Gold")
        SELECT AVG(w.Year - a.BirthYear)
        FROM winners w
        JOIN Athlete a
        ON a.ID = w.Athlete_ID 
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 10  Average height and weight of winners of a given sport in different decades ---- */
const getHeightandWeight = (req, res) => {
  var sport = req.params.sport;
  const query = `
        WITH sport AS(
          SELECT Olympic_ID, Event_ID
          FROM Game_Event
          WHERE sport = "` + sport + `"), 
        decade AS(
          SELECT s.Olympic_ID, s.Event_ID, FLOOR(og.Year/10)*10 AS decade_year
          FROM Olympic_Game og JOIN sport s
          ON s.Olympic_ID = og.Olympic_ID),
        winners AS(
          SELECT Athlete_ID, d.decade_year
          FROM Participates p
          JOIN decade d
          ON d.Olympic_ID = p.Olympic_ID AND d.Event_ID = p.Event_ID 
          WHERE medal = "Gold")
        SELECT AVG(a.Height), AVG(a.Weight), decade_year
        FROM winners w
        JOIN Athlete a
        ON a.ID = w.Athlete_ID
        GROUP BY w.decade_year
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

<<<<<<< HEAD
module.exports = {
	getTop10Countries: getTop10Countries,
	getTopSportsWithCountry: getTopSportsWithCountry,
	getTop20Athletes: getTop20Athletes,
	getRecs: getRecs,
  getCountries: getCountries,
  // bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
=======

module.exports = {
	getTop20Atheletes: getTop20Atheletes,
	getTop20Countries: getTop20Countries,
	getTop20AtheletesBySport: getTop20AtheletesBySport,
	getTop20SportsGivenCountry: getTop20SportsGivenCountry,
  getMedalsGivenSportandDecade: getMedalsGivenSportandDecade,
  getDeveloped: getDeveloped,
  getUnderdeveloped: getUnderdeveloped,
  getParticipationRatio: getParticipationRatio,
  getAverageMedalsPerAthlete: getAverageMedalsPerAthlete,
  getAverageAge: getAverageAge,
  getHeightandWeight: getHeightandWeight
>>>>>>> 917e7afdbeb2df8a1a7a2eec455f2ea76664ce0e
};
