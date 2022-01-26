const { app } = require("../../app");
const { connectMongoDb } = require("../../mongodb");
const supertest = require("supertest");
const mongoose = require("mongoose");

describe('USER API INTEGRATION TESTS', () => {
  
    beforeAll(()=> {
        connectMongoDb();
    });

    afterAll(()=> {
        mongoose.connection.close(true);
    });

    it("POST /users/register", ()=> {
        supertest(app).post("/users/register")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("POST /delete", ()=> {
        supertest(app).post("/delete")
            .send({ name: "John", email: "Doe", password: "1234567", confirmPassword: "1234567" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it("GET /register fail",()=>{
        supertest(app)
        .get('/users')
        .set('Accept', 'applcation/json')
        .expect('Content-Type', /text/)
        .expect(200);
    }); 

    it("GET /login",()=>{
        supertest(app)
        .get('/users')
        .set('Accept', 'applcation/json')
        .expect('Content-Type', /text/)
        .expect(200);
    }); 

    it("GET /logout",()=>{
        supertest(app)
        .get('/users')
        .set('Accept', 'applcation/json')
        .expect('Content-Type', /text/)
        .expect(200);
    }); 



//DELETE

    it("DELETE /delete",()=>{
        supertest(app)
        .delete('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type',/text/)
        .expect(200);
    })
    
    
});