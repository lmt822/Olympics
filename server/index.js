const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (main page： top 20 athletes) ---- */
app.get('/getTop20Atheletes', routes.getTop20Atheletes);

/* ---- (main page： top 20 countries) ---- */
app.get('/getTop20Countries', routes.getTop20Countries);

/* ---- (sport information page：top athletes by input sport) ---- */
app.get('/sport/:sportName', routes.getTop20AtheletesBySport);

/* ---- (country information page: name of the top 20 sports of the input country by gold medal count) ---- */
app.get('/country/:countryName', routes.getTop20SportsGivenCountry);

/* ---- (macro-level page: Distribution of medals based on countries in an input sport in an input decade) ---- */
app.get('/macroMedals/:decade/:sport/:medalType', routes.getMedalsGivenSportandDecade);

/* ---- (macro-level page: Olympic performance (number of gold medals) of developed countries) ---- */
app.get('/getDeveloped', routes.getDeveloped);

/* ---- (macro-level page: Olympic performance (number of gold medals) of underdeveloped countries) ---- */
app.get('/getUnderdeveloped', routes.getUnderdeveloped);

/* ---- (macro-level page: Olympic participation ratio) ---- */
app.get('/getParticipationRatio', routes.getParticipationRatio);

/* ---- (macro-level page: Average Medals per Athlete) ---- */
app.get('/getAverageMedalsPerAthlete', routes.getAverageMedalsPerAthlete);

/* ---- (micro-level page: Average Age of gold medal winners in a given sport in an input decade)---- */
app.get('/getAverageAge', routes.getAverageAge);

/* ---- (micro-level page: Average height and weight of winners of a given sport in different decades) ---- */
app.get('/getHeightandWeight', routes.getHeightandWeight);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});