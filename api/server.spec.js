const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server.js");

const seeds = [
  { id: 1, name: "Nova", type: "dog" },
  { id: 2, name: "Reginald", type: "alpaca" },
  { id: 3, name: "Pancake", type: "cat" },
  { id: 4, name: "Angus", type: "dog" }
];

describe("the route handlers", () => {
  beforeEach(() => {
    return db.migrate.rollback().then(() => {
      return db.migrate.latest().then(() => {
        return db.seed.run();
      });
    });
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });
  describe("get /", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/");
      expect(response.type).toMatch(/json/i);
    });
    it("sends correct object", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ message: "server is responding" });
    });
  });
  describe("get /pets", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/pets");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/pets");
      expect(response.type).toMatch(/json/i);
    });
    it("sends correct object", async () => {
      const response = await request(server).get("/pets");
      expect(response.body).toEqual(seeds);
    });
  });
  describe("post /pets", () => {
    it("responds with 201", async () => {
      const body = { name: "Nova", type: "dog" };
      const response = await request(server)
        .post("/pets")
        .send(body);
      expect(response.status).toBe(201);
    });
    it("responds with 400 on fail with empty body", async () => {
      const body = {};
      const response = await request(server)
        .post("/pets")
        .send(body);
      expect(response.status).toBe(400);
    });
    it("responds with 400 on fail with no name in body", async () => {
      const body = { type: "alpaca" };
      const response = await request(server)
        .post("/pets")
        .send(body);
      expect(response.status).toBe(400);
    });
    it("responds with 400 on fail with no type in body", async () => {
      const body = { name: "Reginald" };
      const response = await request(server)
        .post("/pets")
        .send(body);
      expect(response.status).toBe(400);
    });
  });
});
