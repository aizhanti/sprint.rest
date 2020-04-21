const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const expect = chai.expect;

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/pokemon", () => {
    it("should return json for full list pokemon", async () => {
      const res = await request.get("/api/pokemon").query({ limit: 5 });
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(5);
    });
  });

  describe("POST /api/pokemon", () => {
    it("should add a pokemon", async () => {
      const newPok = {
        id: "152",
        name: "Aizhan",
        types: ["None"],
      };
      const res = await request.post("/api/pokemon").send(newPok);
      JSON.parse(res.text).length.should.equal(152);
    });
  });

  describe("GET /api/pokemon/:id", () => {
    it("should return the Pokemon with the given id", async () => {
      const res = await request.get("/api/pokemon/042");
      res.should.be.json;
      expect(res.body.name).to.equal("Golbat");
    });
  });

  describe("GET /api/pokemon/:name", () => {
    it("should return the Pokemon with given name", async () => {
      const res = await request.get("/api/pokemon/Mew");
      res.should.be.json;
      expect(res.body.name).to.equal("Mew");
    });
  });

  describe("PATCH /api/pokemon/:idOrName", () => {
    it("should allow you to make partial modifications to a Pokemon", async () => {
      const res = await request
        .patch("/api/pokemon/1")
        .send({ name: "AizhanAizhan" });
      res.should.be.json;
      expect(res.body.name).to.equal("AizhanAizhan");
    });
  });

  describe("DELETE /api/pokemon/:idOrName", () => {
    it("should delete the given Pokemon", async () => {
      const res = await request.delete("/api/pokemon/152");
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(151);
    });
  });

  describe("GET /api/pokemon/:idOrName/evolutions", () => {
    it("should return the evolutions a Pokemon has", async () => {
      const res = await request.get("/api/pokemon/staryu/evolutions");
      res.should.be.json;
      expect(res.body).to.deep.equal([{ id: 121, name: "Starmie" }]);
    });
  });

  describe("GET /api/pokemon/:idOrName/evolutions/previous", () => {
    it("For evolved Pokemon, this should return it's previous evolutions", async () => {
      const res = await request.get("/api/pokemon/17/evolutions/previous");
      res.should.be.json;
      expect(res.body).to.deep.equal([{ id: 16, name: "Pidgey" }]);
    });
  });

  describe("GET /api/types", () => {
    it("should return json for full list pokemon", async () => {
      const res = await request.get("/api/types").query({ limit: 3 });
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(3);
    });
  });

  describe("POST /api/types", () => {
    it("should add a type", async () => {
      const newType = "newType";
      const res = await request.post("/api/types").send({ newType });
      JSON.parse(res.text).length.should.equal(18);
    });
  });

  describe("DELETE /api/types/:name", () => {
    it("should delete the given Pokemon", async () => {
      const res = await request.delete("/api/types/newType");
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(17);
    });
  });

  describe("GET /api/types/:type/pokemon", () => {
    it("should return the Pokemon with given name", async () => {
      const res = await request.get("/api/types/Fire/pokemon");
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(12);
    });
  });

  describe("GET /api/attacks", () => {
    it("should return all attacks", async () => {
      const res = await request.get("/api/attacks").query({ limit: 5 });
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(5);
    });
  });

  describe("GET /api/attacks/fast", () => {
    it("should return all attacks", async () => {
      const res = await request.get("/api/attacks/fast").query({ limit: 5 });
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(5);
    });
  });

  describe("GET /api/attacks/special", () => {
    it("should return all attacks", async () => {
      const res = await request.get("/api/attacks/special").query({ limit: 5 });
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(5);
    });
  });

  describe("GET /api/attacks/:name", () => {
    it("Get a specific attack by name, no matter if it is fast or special", async () => {
      const res = await request.get("/api/attacks/Tackle");
      res.should.be.json;
      expect(res.body.name).to.equal("Tackle");
    });
  });

  describe("GET /api/attacks/:name/pokemon", () => {
    it("Returns all Pokemon (id and name) that have an attack with the given name", async () => {
      const res = await request.get("/api/attacks/Tackle/pokemon");
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(17);
    });
  });

  describe("POST /api/attacks/fast", () => {
    it("Add an fast attack", async () => {
      const newAttack = {
        name: "newFastAttack",
        type: "Normal",
        damage: 111,
      };
      const res = await request.post("/api/attacks/fast").send(newAttack);
      JSON.parse(res.text).length.should.equal(42);
    });
  });

  describe("POST /api/attacks/special", () => {
    it("Add an special attack", async () => {
      const newAttack = {
        name: "newSpecialAttack",
        type: "Normal",
        damage: 222,
      };
      const res = await request.post("/api/attacks/special").send(newAttack);
      JSON.parse(res.text).length.should.equal(84);
    });
  });

  describe("PATCH /api/attacks/:name", () => {
    it("Modifies specified attack", async () => {
      const modTackle = {
        name: "newFastAttack2",
        type: "Normal",
        damage: 13,
      };

      const res = await request
        .patch("/api/attacks/newFastAttack")
        .send(modTackle);
      res.should.be.json;
      expect(res.body.name).to.equal("newFastAttack2");
    });
  });

  describe("DELETE /api/attacks/:name", () => {
    it("Deletes an attack", async () => {
      const res = await request.delete("/api/attacks/newFastAttack2");
      res.should.be.json;
      JSON.parse(res.text).length.should.equal(41);
    });
  });
});
