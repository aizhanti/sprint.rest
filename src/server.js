const pokeData = require("./data");
const express = require("express");
const app = express();

app.use(express.json());

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  return app;
};

app.get("/api/pokemon", async (request, response) => {
  const limit = request.query.limit;
  response.send(pokeData.pokemon.slice(0, limit));
  response.status(200).end();
});

app.post("/api/pokemon", async (request, response) => {
  pokeData.pokemon.push(request.body);
  response.send(pokeData.pokemon);
});

app.get("/api/pokemon/:key", async (request, response) => {
  const key = request.params.key;
  pokeData.pokemon.forEach((pok) => {
    if (
      Number(pok.id) === Number(key) ||
      pok.name.toLowerCase() === key.toLowerCase()
    ) {
      response.send(pok);
    }
  });
  response.status(200).end();
});

app.patch("/api/pokemon/:key", async (request, response) => {
  const key = request.params.key;
  console.log("request.body", request.body, key);
  pokeData.pokemon.forEach((pok) => {
    // if (
    //   Number(pok.id) === Number(key) ||
    //   pok.name.toLowerCase() === key.toLowerCase()
    // )
    if (Number(pok.id) === Number(key)) {
      pok = Object.assign(pok, request.body);
      response.send(pok);
    }
  });
  response.status(200).end();
});

module.exports = { setupServer };
