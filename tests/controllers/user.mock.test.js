let services = require('../../mongodb/services');

describe("USER CONTROLLER TESTS", ()=> {
    test("should register user", ()=> {
        const mock = jest.spyOn(services, "createUser");
        mock.mockImplementation((name, email, pass)=> "HI");

        let text = services.createUser("foo", "foo@gmail.com", "123");

        expect(text).toEqual("HI");

        mock.mockRestore();
    });
});