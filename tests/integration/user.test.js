const { app } = require("../../app");
const supertest = require("supertest");

describe('USER API INTEGRATION TESTS', () => {
    it("POST /users/register", ()=> {
        supertest(app).post("/users/register")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

});