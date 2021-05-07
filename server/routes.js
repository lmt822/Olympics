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


/* ---- Query 1, top 20 Athletes by number of gold medals ---- */
const getTop20Athletes = (req, res) => {
  console.log('Top 20 performing atheletes:');
  const query = `
        WITH winners AS(
          SELECT Athlete_ID 
          FROM Participates 
          WHERE medal = "Gold"),
        temp AS(
          SELECT a.ID, a.Name
          FROM Athlete a),
        top AS(
          SELECT t.ID, COUNT(*)  
          FROM temp t JOIN winners w
          ON t.ID = w.Athlete_ID
          GROUP BY t.ID 
          ORDER BY COUNT(*) DESC
          LIMIT 20)
        SELECT a.Name 
        FROM temp a
        JOIN top t ON a.ID = t.ID
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
const getTop20AthletesBySport = (req, res) => {
  var sportName = req.params.sportName;
  const query = `
        WITH sport AS(
          SELECT Olympic_ID, Event_ID
          FROM Game_Event
          WHERE sport = "` + sportName + `"), 
        winners AS(
          SELECT Athlete_ID, COUNT(*) as gold
          FROM Participates p
          JOIN sport d
          ON d.Olympic_ID = p.Olympic_ID AND d.Event_ID = p.Event_ID 
          WHERE medal = "Gold"
          GROUP BY Athlete_ID
          ORDER BY COUNT(*) DESC
          LIMIT 10)
        SELECT a.Name, w.gold  
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

/* ---- Query 2 top 20 countries by number of gold medals---- */
const getTop20Countries = (req, res) => {
  console.log('Top 20 performing countries:');
  const query = `
        WITH winners AS(
          SELECT Athlete_ID, Olympic_ID, Event_ID 
          FROM Participates 
          WHERE medal = "Gold"),
        topcountry AS
          (SELECT NOC 
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
        JOIN (SELECT Country_name, NOC FROM Country) AS c
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


/* ---- Query 3 name of top 10 sports given input country ---- */
const getTop20SportsGivenCountry = (req, res) => {
  var countryName = req.params.countryName;
  const query = `
        WITH winners AS(
          SELECT Athlete_ID, Olympic_ID, Event_ID 
          FROM Participates p
          JOIN Athlete a ON a.ID = p.Athlete_ID 
          WHERE medal = "Gold" AND a.Country = "` + countryName + `"
          GROUP BY a.NOC, p.Olympic_ID, p.Event_ID)
        SELECT ge.Sport AS sports, COUNT(*) AS medals
        FROM winners w
        JOIN Game_Event ge 
        ON w.Olympic_ID = ge.Olympic_ID AND w.Event_ID = ge.Event_ID 
        GROUP BY Sport 
        ORDER BY COUNT(*) DESC 
        LIMIT 10
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
          GROUP BY a.NOC, p.Event_ID, p.Olympic_ID)
        SELECT a.Country AS country, COUNT(*) AS medals 
        FROM winners w
        JOIN Athlete a
        ON a.ID = w.Athlete_ID
        WHERE a.Country <> "no longer exist"
        GROUP BY a.Country
        ORDER BY COUNT(*) DESC 
        LIMIT 10
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
        	SELECT Country, NOC, Olympic_ID, Event_ID
        	FROM Athlete a 
        	JOIN Participates p ON a.ID = p.Athlete_ID
        	WHERE NOC <> 'ERR'
        	AND NOC IN
        		(SELECT NOC
        		FROM Wealthy)	
        	AND Medal = 'Gold'),
        info AS(
        	SELECT Country, NOC
        	FROM useful
        	GROUP BY NOC, Olympic_ID, Event_ID)
        SELECT Country, COUNT(*) AS Medals
        FROM info
        GROUP BY NOC
        ORDER BY COUNT(*) DESC
        LIMIT 15
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};


/* ---- Query 6 Olympic performance (total number of medals) of underdeveloped countries ---- */
const getUnderdeveloped = (req, res) => {
  const query = `
        With poor AS(
          SELECT DISTINCT(NOC) AS NOC
          From Country
          WHERE GDP*1000/Population < 1000
          AND NOC <> 'ERR'),
        useful AS(
          SELECT Country, NOC, Olympic_ID, Event_ID
          FROM Athlete a
          JOIN Participates p ON a.ID = p.Athlete_ID
          WHERE NOC <> 'ERR'
          AND (Medal = 'Gold' OR Medal = 'Silver' OR Medal = 'Bronze')
          AND NOC IN
            (SELECT NOC 
            FROM poor)
          GROUP BY Olympic_ID, Event_ID, NOC),
        withEvents AS(
          SELECT ge.Sport
          FROM useful i
          JOIN Game_Event ge 
          ON i.Olympic_ID = ge.Olympic_ID AND i.Event_ID = ge.Event_ID)
        SELECT Sport, COUNT(*) AS Medals
        FROM withEvents
        GROUP BY Sport
        ORDER BY COUNT(*) DESC
        LIMIT 10;
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
        	SELECT NOC, Olympic_ID, COUNT(ID) AS Participants
        	FROM Athlete a 
        	JOIN Participates p ON a.ID = p.Athlete_ID
        	WHERE NOC <> 'ERR'
        	GROUP BY NOC, Olympic_ID),
        AVER AS(
        	SELECT NOC, ROUND(SUM(Participants)/COUNT(Olympic_ID),0) AS Average_Participants
        	FROM Participation
        	GROUP BY NOC),
        perCapita AS(
        	SELECT c.Country_name as Country, a.NOC, Average_Participants, Population
        	FROM AVER a
        	JOIN Country c ON a.NOC = c.NOC)
        SELECT Country, NOC, Average_Participants, Population, ROUND(1000*Population/Average_Participants) AS Athlete_Ratio
        FROM perCapita
        ORDER BY ROUND(1000*Population/Average_Participants)
        LIMIT 20
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
          SELECT Country, NOC, Olympic_ID, COUNT(ID) AS Participants
          FROM Athlete a 
          JOIN Participates p ON a.ID = p.Athlete_ID
          WHERE NOC <> 'ERR'
          GROUP BY NOC, Olympic_ID),
        AVER AS(
          SELECT Country, NOC, ROUND(SUM(Participants)/COUNT(Olympic_ID),0) AS Average_Participants
          FROM Participation
          GROUP BY NOC),
        medals AS(
          SELECT NOC, Olympic_ID, Medal
          FROM Athlete a 
          JOIN Participates p ON a.ID = p.Athlete_ID
          WHERE NOC <> 'ERR'
          AND (Medal = 'Gold' OR Medal = 'Silver' OR Medal = 'Bronze')),
        medalcounts AS(
          SELECT NOC, Olympic_ID, COUNT(*) AS Medals
          FROM medals
          GROUP BY NOC, Olympic_ID),
        avgMedalcounts AS(
          SELECT NOC, ROUND(SUM(Medals)/COUNT(Olympic_ID),0) AS Average_Medals
          FROM medalcounts
          GROUP BY NOC),
        agg AS(
          SELECT a.Country, a.NOC, a.Average_Participants, m.Average_Medals
          FROM avgMedalcounts m
          JOIN AVER a ON m.NOC = a.NOC)
        SELECT Country, NOC, ROUND(Average_Medals/Average_Participants, 2) AS Medal_Per_Athlete
        FROM agg
        ORDER BY ROUND(Average_Medals/Average_Participants, 2) DESC
        LIMIT 20
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }  });
};

/* ---- Query 9  Average age of medal winners of a given sport in a given decade ---- */
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
          WHERE (medal = "Gold" OR medal = "Silver" OR medal = "Bronze"))
        SELECT ROUND(AVG(w.Year - a.BirthYear),2) AS average_age
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

/* ---- Query 10  Average height and weight of medal winners of a given sport in different decades ---- */
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
          WHERE (medal = 'Gold' OR medal = 'Silver' OR medal = 'Bronze'))
        SELECT ROUND(AVG(a.Height),2) AS height, ROUND(AVG(a.Weight),2) AS weight, decade_year
        FROM winners w
        JOIN Athlete a
        ON a.ID = w.Athlete_ID
        GROUP BY w.decade_year
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Query 11  (similar to query 2): The names and number of gold medals won for each country ---- */
const getMedals = (req, res) => {
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
          ORDER BY COUNT(*) DESC)
        SELECT c.Country_name as name, m.medals as gold
        FROM medal m
        JOIN Country c
        ON m.NOC = c.NOC 
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Query 12: Get the list of all country names ---- */
const getCountries = (req, res) => {
  const query = `
        SELECT DISTINCT Country AS Country_name
        FROM Athlete
        ORDER BY Country_name
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Query 13: Get the list of all decades ---- */
const getDecades = (req, res) => {
  const query = `
        SELECT distinct FLOOR(Year/10)*10 as decade
        FROM Olympic_Game
        ORDER BY decade;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Query 14: Get the list of all sports ---- */
const getSports = (req, res) => {
  const query = `
        SELECT distinct Sport as sport
        FROM Game_Event
        ORDER BY sport;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Query 15: Get the list of all medals ---- */
const getMedalTypes = (req, res) => {
  const query = `
        SELECT distinct Medal as medalType
        FROM Participates
        Where Medal <> "";
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


module.exports = {
	getTop20Athletes: getTop20Athletes,
	getTop20Countries: getTop20Countries,
	getTop20AthletesBySport: getTop20AthletesBySport,
	getTop20SportsGivenCountry: getTop20SportsGivenCountry,
  getMedalsGivenSportandDecade: getMedalsGivenSportandDecade,
  getDeveloped: getDeveloped,
  getUnderdeveloped: getUnderdeveloped,
  getParticipationRatio: getParticipationRatio,
  getAverageMedalsPerAthlete: getAverageMedalsPerAthlete,
  getAverageAge: getAverageAge,
  getHeightandWeight: getHeightandWeight,
  getCountries: getCountries,
  getMedals: getMedals,
  getDecades: getDecades,
  getSports: getSports,
  getMedalTypes: getMedalTypes
};
