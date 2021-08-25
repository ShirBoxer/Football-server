const _ = require('lodash');
const played_db = require('../db/played.json');
const upcoming_db = require('../db/upcoming.json');
const utils = require('../utils/utils');

const {teamIdMap, tournamentIdMap} = utils.mapDataIds();
const collections = { played_db, upcoming_db };


exports.getMatchesByName = (name) => {
    let matches = [];
    matches.push(getMatchesByTeamOrTournament(collections.played_db, name));
    matches.push(getMatchesByTeamOrTournament(collections.upcoming_db, name));
    return matches;
}

exports.getMatchesByNameAndStatus = (name, choosenStatus) => {
    let matches = [];
    const collection = getDataByStatus(choosenStatus);
    matches.push(getMatchesByTeamOrTournament(collection, name));
    return matches;
}




// local utils (logical related to this script) 

const getMatchesByTeamOrTournament = function(collection, name){
    name = name.toLowerCase();
    try{
    return Array.from(_.values(collection)).filter(match => {
        let b = filterBy(match, name);
        if (b == undefined) 
            throw "wrong name";
        return b;
    })
    .map(match =>addMatchIds(match)); }
    catch(e){
        utils.writeLog("error", `Wrong name: ${name} \nAt matchesService > getMatchesByTeamOrTournament`);

    }
 }


const filterBy = function(match, name){
    if(teamIdMap.has(name))
        return (match.home_team.toLowerCase() === name || match.away_team.toLowerCase() === name);
    if(tournamentIdMap.has(name))
        return  match.tournament.toLowerCase() === name;
    utils.writeLog("info", `Wrong name: ${name} \nAt matchesService > filterBy`);
    return undefined;
}

const addMatchIds = function(match){
    match.home_team_id = teamIdMap.get(match.home_team.toLowerCase());
    match.away_team_id = teamIdMap.get(match.away_team.toLowerCase());
    match.tournament_id = tournamentIdMap.get(match.tournament.toLowerCase());
    if( match.home_team_id == undefined ||
        match.away_team_id == undefined ||
        match.tournament_id == undefined )
        utils.writeLog("error", `One or more of the following features is missing \nhome_team_id: ${match.home_team_id}\naway_team_id: ${match.away_team_id}\ntournament_id: ${tournament_id}`);
    return match;
}

const getDataByStatus = function(choosenStatus){
    choosenStatus = choosenStatus.toLowerCase();
    var collection ={};
    if(choosenStatus === utils.status.played){
        collection =  played_db;}
    else if(choosenStatus === utils.status.upcoming)
        collection = upcoming_db;
    else
        utils.writeLog("error", `Status is not recognaizable \nchoosenStatus: ${choosenStatus}`);
    return collection;
}