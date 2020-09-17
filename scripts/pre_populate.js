/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const axios = require("axios");

async function getData() {
  const banner = await axios.get("https://cirkle.com.br/api/banner");
  const menu = await axios.get("https://cirkle.com.br/api/menu");
  const highlights = await axios.get("https://cirkle.com.br/api/highlights");
  const data = {
    banner: banner.data,
    highlights: highlights.data,
    menu: menu.data,
  };

  const stringData = JSON.stringify(data);

  fs.writeFileSync("public/prepopulated.json", stringData);
}

getData();
