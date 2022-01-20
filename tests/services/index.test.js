
const { User } = require('../../mongodb/model')
const mongoose = require('mongoose');

let { checkEmail, createUser, editTodo, createTodo, deleteTodo, deleteUser } = require('../../mongodb/services')


describe('create user', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(instane => { console.log("[INFO] CONNECTED TO DB") })
      .catch(e => { console.log("[ERROR] FAILED TO CONNECT TO DB") });
  });

  afterAll(async () => {
    for (const connection of mongoose.connections) {
      await connection.close(true);
    }
  });


  it('should insert a doc into collection', async () => {
    const mockUser = { name: 'John Doe', email: 'doe@gmail.com', pass: 'john' };
    await createUser(mockUser.name, mockUser.email, mockUser.pass);
    const insertedUser = await User.findOne({ email: 'doe@gmail.com' });
    expect(insertedUser.name).toEqual(mockUser.name);
  });
});