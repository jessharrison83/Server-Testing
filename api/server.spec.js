const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server.js");

describe("the route handlers", () => {
  afterEach(async () => {
    await db("pets").truncate();
  });
  describe("get /", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/");
      expect(response.body).toMatch(/json/i);
    });
    it("sends correct object", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ message: "server is responding" });
    });
  });
  describe("get /pets", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/");
      expect(response.body).toMatch(/json/i);
    });
    it("sends correct object", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual([]);
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
