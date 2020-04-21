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
        id: "1512",
        name: "Aizhan",
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
    // res.should.be.json;
    expect(res.body.name).to.equal("AizhanAizhan");
  });
  });
});
