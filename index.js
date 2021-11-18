const axios = require("axios");
const riotKey = "api_key=RGAPI-90cda079-aca3-4a97-b35e-8fe9eabc7542";
const fs = require("fs/promises");
// const fetch = require("node-fetch");

function getSummonerInfo(summonerId) {
  let id = summonerId.replace(/\s/, "%20");
  axios
    .get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?${riotKey}`
    )
    .then((res) => {
      fs.writeFile(
        "./data/summonerdata.json",
        JSON.stringify(res.data),
        "utf8"
      );
    });
}

getSummonerInfo("mighty matt");
