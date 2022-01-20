
const {MongoClient} = require('mongodb');
const {User} = require('../../mongodb/model')
const mongoose = require('mongoose');

let { checkEmail, createUser, editTodo, createTodo, deleteTodo, deleteUser } = require('../../mongodb/services')


describe('create user', () => {
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    db = mongoose.connection;
  });
  afterAll(async () => {
    await db.close();
  });

  
    it('should insert a doc into collection', async () => {
      const mockUser = {name: 'John Doe', email: 'doe@gmail.com',pass:'john'};
      await createUser(mockUser.name,mockUser.email,mockUser.pass);
      const insertedUser = await User.findOne({email: 'doe@gmail.com'});
      expect(insertedUser.name).toEqual(mockUser.name);
    });
  });