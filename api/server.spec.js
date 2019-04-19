const request = require("supertest");
const server = require("./server");

describe("Testing Get data", () => {
  it("test server response/ 200 response", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toBe(200);
  });

  it("returns empty array if no games are stored", async () => {
    const response = await request(server).get("/games");
    expect(response.body).toEqual([]);
  });

  it('test response server is using json', async () => {
    const response = await request(server).get('/')
    expect(response.type).toMatch(/json/i);
})


});

describe("Testing Post", () => {
  it("Takes in valid object", async () => {
    const response = await request(server)
      .post("/games")
      .send({
        title: "Pacman",
        genre: "Arcade",
        releaseDate: 1980
      });
    expect(response.status).toBe(201);
  });

  it("returns item id if data posts successfully", async () => {
    const response = await request(server).post("/games").send({
        title: "GTAV",
        genre: "Action-adventure",
        releaseDate: 2016
    });
    expect(response.body).toBe(2);
});

  it("return 422 if invalid data", async () => {
    const response = await request(server)
      .post("/games")
      .send({ invalid: "data" });
    expect(response.status).toBe(422);
  });
});
