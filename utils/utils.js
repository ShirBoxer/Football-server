const envVariables = require('../configs');
const _ = require('lodash');
const played_db = require('../db/played.json');
const upcoming_db = require('../db/upcoming.json');


exports.status = {
    ok: 200,
    played: "played",
    upcoming: "upcoming",
    // accepted: 202,
    // badRequest: 400,
    // unauthorized: 401,
    // notFound: 404,
    // notAcceptable: 406,
    // serverError: 500,
  };


exports.send = function ( res, next, value, status = exports.status.ok) {
    
    if (res) {
      res.status(status || exports.status.ok)
  
      if (status == exports.status.ok)
        res.send(value);
      else if (value)
        res.send(value);
      else
        res.sendStatus(status);
  
      if (next)
        next();
    }
}

exports.writeLog = function (level, message) {
  let env = envVariables.ENV;
  if (level != 'error' && level != 'info')
    level = 'undefined error';
  let consoleMessage = `${env} ${level}: ${message}`;
  console.log(consoleMessage);
}

exports.mapDataIds = function() {
  const teamIdMap = new Map();
  const tournamentIdMap = new Map();
  teamId = 1;
  tournamentId = 1;
  const collections = { played_db, upcoming_db };
  _.forIn(collections, (collection) => {
    _.values(collection).forEach(match => {
        let {home_team, away_team, tournament} = match || {};
        home_team = home_team.toLowerCase();
        away_team = away_team.toLowerCase();
        tournament = tournament.toLowerCase();
        if(!teamIdMap.has(home_team)){
          teamIdMap.set(home_team, teamId)
          teamId++;
        }
        if(!teamIdMap.has(away_team)){
          teamIdMap.set(away_team, teamId)
          teamId++;
        }
        if(!tournamentIdMap.has(tournament)){
          tournamentIdMap.set(tournament, tournamentId);
          tournamentId++;
        }
    });
  });
  return {teamIdMap, tournamentIdMap};
}
