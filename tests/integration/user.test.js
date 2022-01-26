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

    it("POST /delete", async ()=> {
        await supertest(app).post("/delete")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("GET /register fail", async()=>{
        await supertest(app)
            .get('/users')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200);
    }); 

    it("GET /login", async()=>{
        await supertest(app)
            .get('/users')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200);
    }); 

    it("GET /logout", async()=>{
        await supertest(app)
            .get('/users')
            .set('Accept', 'applcation/json')
            .expect('Content-Type', /text/)
            .expect(200);
    }); 

    it("DELETE /delete", async()=>{
        await supertest(app)
            .delete('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type',/text/)
            .expect(200);
    })
    
    
});