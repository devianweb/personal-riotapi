const axios = require("axios");
const riotKey = "api_key=RGAPI-70ea42f5-4398-41a8-942d-963b1b470e6e";
const fs = require("fs/promises");
// const fetch = require("node-fetch");

let summonerInfo;
let matchId;

function getSummonerInfo(summonerId) {
  let id = summonerId.replace(/\s/, "%20");
  return axios
    .get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?${riotKey}`
    )
    .then((result) => {
      summonerInfo = { ...result };
      return result;
    });
}

function getMatchId(summoner) {
  const { puuid } = summoner;
  return axios
    .get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&${riotKey}`
    )
    .then((result) => {
      matchId = result.data[0];
      return matchId;
    });
}

function getMatchData() {
  return axios
    .get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?${riotKey}`
    )
    .then((result) => {
      fs.writeFile(
        "./data/matchData.json",
        JSON.stringify(result.data),
        "utf8"
      );
    });
}

function getMatchTimeline() {
  return axios
    .get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?${riotKey}`
    )
    .then((result) => {
      fs.writeFile(
        "./data/matchTimeline.json",
        JSON.stringify(result.data),
        "utf8"
      );
    });
}

getSummonerInfo("squirt24")
  .then((result) => getMatchId(result.data))
  .then(() => getMatchData())
  .then(() => getMatchTimeline())
  .then(() => console.log("done!"));
