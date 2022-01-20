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

    it("PUT /users/register",()=>{
        supertest(app).put("users/register")
        .send({name:"Kalisa", email:"kal@gmail.com", password:"12345677", confirmPassword:"12345677"})
        .set('Accept', 'applcation/json')
        .expect('Content-Type', /text/)
        .expect(200);
    }); 

    it("GET /register",()=>{
        supertest(app)
        .get('/users')
        .set('Accept', 'applcation/json')
        .expect('Content-Type', /text/)
        .expect(200);
    }); 

    it("DELETE /delete",()=>{
        supertest(app)
        .delete('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type',/text/)
        .expect(200);
    })
    
});