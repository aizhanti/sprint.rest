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
  pokeData.pokemon.forEach((pok) => {
    if (
      Number(pok.id) === Number(key) ||
      pok.name.toLowerCase() === key.toLowerCase()
    ) {
      pok = Object.assign(pok, request.body);
      response.send(pok);
    }
  });
  response.status(200).end();
});

app.delete("/api/pokemon/:key", async (request, response) => {
  const key = request.params.key;
  for (let i = 0; i < pokeData.pokemon.length; i++) {
    if (
      Number(pokeData.pokemon[i].id) === Number(key) ||
      pokeData.pokemon[i].name.toLowerCase() === key.toLowerCase()
    ) {
      pokeData.pokemon.splice(i, 1);
    }
  }
  response.send(pokeData.pokemon);
  response.status(200).end();
});

app.get("/api/pokemon/:key/evolutions", async (request, response) => {
  const key = request.params.key;
  pokeData.pokemon.forEach((pok) => {
    if (
      Number(pok.id) === Number(key) ||
      pok.name.toLowerCase() === key.toLowerCase()
    ) {
      response.send(pok.evolutions);
    }
  });
  response.status(200).end();
});

app.get("/api/pokemon/:key/evolutions/previous", async (request, response) => {
  const key = request.params.key;
  pokeData.pokemon.forEach((pok) => {
    if (
      Number(pok.id) === Number(key) ||
      pok.name.toLowerCase() === key.toLowerCase()
    ) {
      response.send(pok["Previous evolution(s)"]);
    }
  });
  response.status(200).end();
});

app.get("/api/types", async (request, response) => {
  const limit = request.query.limit;
  response.send(pokeData.types.slice(0, limit));
  response.status(200).end();
});

app.post("/api/types", async (request, response) => {
  pokeData.types.push(request.body.newType);
  response.send(pokeData.types);
});

app.delete("/api/types/:type", async (request, response) => {
  const type = request.params.type;
  for (let i = 0; i < pokeData.types.length; i++) {
    if (pokeData.types[i] === type) {
      pokeData.types.splice(i, 1);
    }
  }
  response.send(pokeData.types);
  response.status(200).end();
});

app.get("/api/types/:type/pokemon", async (request, response) => {
  const type = request.params.type;
  const result = [];
  pokeData.pokemon.forEach((pok) => {
    if (pok.types.includes(type)) {
      if (!result.includes({ [pok.id]: pok.name })) {
        result.push({ [pok.id]: pok.name });
      }
    }
  });
  response.send(result);
  response.status(200).end();
});

app.get("/api/attacks", async (request, response) => {
  const limit = request.query.limit;
  const result = [];
  for (const type in pokeData.attacks) {
    for (const att of pokeData.attacks[type]) {
      result.push(att);
    }
  }
  response.send(result.slice(0, limit));
  response.status(200).end();
});

app.get("/api/attacks/fast", async (request, response) => {
  const limit = request.query.limit;
  response.send(pokeData.attacks.fast.slice(0, limit));
  response.status(200).end();
});

app.get("/api/attacks/special", async (request, response) => {
  const limit = request.query.limit;
  response.send(pokeData.attacks.special.slice(0, limit));
  response.status(200).end();
});

app.get("/api/attacks/:name", async (request, response) => {
  const name = request.params.name;
  pokeData.attacks.fast.forEach((att) => {
    if (att.name === name) {
      response.send(att);
    }
  });
  response.status(200).end();
});

app.get("/api/attacks/:name/pokemon", async (request, response) => {
  const attName = request.params.name;
  const result = [];
  pokeData.pokemon.forEach((pok) => {
    for (const type in pok.attacks) {
      for (const att of pok.attacks[type]) {
        if (att.name === attName) {
          if (!result.includes({ [pok.id]: pok.name })) {
            result.push({ [pok.id]: pok.name });
          }
        }
      }
    }
  });
  response.send(result);
  response.status(200).end();
});

app.post("/api/attacks/fast", async (request, response) => {
  pokeData.attacks.fast.push(request.body);
  response.send(pokeData.attacks.fast);
});

app.post("/api/attacks/special", async (request, response) => {
  pokeData.attacks.special.push(request.body);
  response.send(pokeData.attacks.special);
});

app.patch("/api/attacks/:name", async (request, response) => {
  const name = request.params.name;
  for (const type in pokeData.attacks) {
    for (let att of pokeData.attacks[type]) {
      if (att.name === name) {
        att = Object.assign(att, request.body);
        response.send(att);
      }
    }
  }
  response.status(200).end();
});

app.delete("/api/attacks/:name", async (request, response) => {
  const name = request.params.name;
  for (const type in pokeData.attacks) {
    for (let i = 0; i < pokeData.attacks[type].length; i++) {
      if (pokeData.attacks[type][i].name === name) {
        pokeData.attacks[type].splice(i, 1);
        response.send(pokeData.attacks[type]);
      }
    }
  }
  response.status(200).end();
});

module.exports = { setupServer };
