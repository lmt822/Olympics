const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
config.connectTimeout = 60000;
config.acquireTimeout = 60000;
config.timeout = 60000;
console.log('Connecting to rds');
const connection = mysql.createConnection(config);
console.log('Connected to rds');

console.log('Top 20 performing atheletes:')
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
    else console.log(rows);
  });
/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


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
    else res.json(rows);
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopSportsWithCountry = (req, res) => {
  var inputKeyword = req.params.keyword;
  const query = `
  WITH winners AS(
    SELECT Athlete_ID, Olympic_ID, Event_ID 
    FROM Participates p
    JOIN Athlete a ON a.ID = p.Athlete_ID 
    WHERE medal = "Gold" AND a.Country = '` + inputKeyword + `'
    GROUP BY a.NOC, p.Olympic_ID, p.Event_ID)
    SELECT ge.Sport AS sports, COUNT(*) AS medals
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
    }
  });
};


/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  var movieName = req.params.movieName;
  const query = `
    WITH c AS (
      SELECT ci.cast_id, ci.charac
      FROM movie m JOIN cast_in ci ON m.movie_id = ci.movie_id
      WHERE m.title = '` + movieName + `'
    ),
    m AS (
      SELECT ci.movie_id, c.charac
      FROM c JOIN cast_in ci ON c.cast_id = ci.cast_id
    ),
    t AS ( 
      SELECT movie_id, COUNT(charac) AS num_share_cast
      FROM m
      GROUP BY movie_id
      ORDER BY COUNT(charac) DESC)
    SELECT mv.title, mv.movie_id, mv.rating, mv.num_ratings
    FROM t JOIN movie mv ON t.movie_id = mv.movie_id 
    WHERE mv.title <> '` + movieName + `'
    ORDER BY t.num_share_cast DESC, mv.rating DESC, mv.num_ratings DESC
    LIMIT 10;
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- (Best Movies) ---- */
const getCountries = (req, res) => {
  const query = `
    SELECT Country_name
    FROM Country
    ORDER BY Country_name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


// /* ---- Q3b (Best Movies) ---- */
// const bestMoviesPerDecadeGenre = (req, res) => {
//   var genre = req.params.genre;
  
//   const query = `
//     WITH winners AS(
//     SELECT Athlete_ID, Olympic_ID, Event_ID 
//     FROM Participates p
//     JOIN Athlete a ON a.ID = p.Athlete_ID 
//     WHERE medal = "Gold" AND a.Country = '` + genre + `'
//     GROUP BY a.NOC, p.Olympic_ID, p.Event_ID)
//     SELECT ge.Sport AS sports, COUNT(*) AS medals
//     FROM winners w
//     JOIN Game_Event ge 
//     ON w.Olympic_ID = ge.Olympic_ID AND w.Event_ID = ge.Event_ID 
//     GROUP BY Sport 
//     ORDER BY COUNT(*) DESC 
//     LIMIT 20    
//   `;

//   connection.query(query, (err, rows, fields) => {
//     if (err) console.log(err);
//     else res.json(rows);
//   });
// };

module.exports = {
	getTop10Countries: getTop10Countries,
	getTopSportsWithCountry: getTopSportsWithCountry,

	getTop20Athletes: getTop20Athletes,
	getRecs: getRecs,
  getCountries: getCountries,
  // bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
};
