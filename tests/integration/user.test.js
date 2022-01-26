const { app } = require("../../app");
const { connectMongoDb } = require("../../mongodb");
const supertest = require("supertest");
const mongoose = require("mongoose");

describe('USER API INTEGRATION TESTS', () => {
  
    beforeAll(async()=> {
        await connectMongoDb();
    });

    afterAll(async()=> {
        await mongoose.connection.close(true);
    });

    it("POST /users/register", async ()=> {
        await supertest(app).post("/users/register")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("POST /users/delete", async ()=> {
        await supertest(app).get("/users/delete")
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("POST /register fail", async()=>{
        await supertest(app)
            .post('/users/register')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .expect(new RegExp("Input Name, Email and Password", "ig"))
    }); 

    it("GET /login", async()=>{
        await supertest(app)
            .get('/users/login')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200);
    }); 

    it("GET /logout", async()=>{
        await supertest(app)
            .get('/users/logout')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(302);
    }); 

    it("DELETE /users/delete FAIL", async()=>{
        await supertest(app)
            .post('/users/delete')
            .set('Accept', 'application/json')
            .expect(400);
    })
    
    
});