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
const getTop20Keywords = (req, res) => {
  const query = `
    SELECT * FROM Participates;
  `;
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopMoviesWithKeyword = (req, res) => {
  var keyword = req.params.keyword;
  const query = `
    SELECT * FROM Participates;
  `;
  
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
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


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  const query = `
    SELECT DISTINCT (release_year - release_year MOD 10) AS decade
    FROM movie
    ORDER BY decade;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const bestMoviesPerDecadeGenre = (req, res) => {
  var decade = req.params.decade;
  var genre = req.params.genre;
  
  const query = `
    with m AS (
      SELECT mv.movie_id, mv.title, mv.rating
      FROM movie mv JOIN movie_genre mg ON mv.movie_id = mg.movie_id
      WHERE mg.genre_name = '` + genre + `' AND (mv.release_year - mv.release_year MOD 10) = ` + decade + `
    ),
    g AS (
      SELECT DISTINCT mg.genre_name
      FROM m JOIN movie_genre mg ON m.movie_id = mg.movie_id
    ),
    r AS (
      SELECT g.genre_name, AVG(mv.rating) as avg_rating
      FROM g JOIN movie_genre mg ON g.genre_name = mg.genre_name JOIN movie mv ON mv.movie_id = mg.movie_id
      WHERE (mv.release_year - mv.release_year MOD 10) = ` + decade + `
      GROUP BY g.genre_name
    ),
    mr AS (
      SELECT r.genre_name, r.avg_rating, m.movie_id
      FROM m JOIN movie_genre mg ON m.movie_id = mg.movie_id JOIN r ON mg.genre_name = r.genre_name
    )
    SELECT DISTINCT m.title, m.movie_id, m.rating
    FROM m JOIN mr ON m.movie_id = mr.movie_id
    WHERE m.rating > ALL (SELECT avg_rating FROM mr WHERE movie_id = m.movie_id)
    ORDER BY m.title
    LIMIT 100;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

module.exports = {
	getTop20Keywords: getTop20Keywords,
	getTopMoviesWithKeyword: getTopMoviesWithKeyword,
	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
};
