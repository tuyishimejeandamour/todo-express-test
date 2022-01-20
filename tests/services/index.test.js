
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

  
    it('should create user', async () => {
      const mockUser = {name: 'John Doe', email: 'doe@gmail.com',pass:'john'};
      await createUser(mockUser.name,mockUser.email,mockUser.pass);
      const insertedUser = await User.findOne({email: 'doe@gmail.com'});
      expect(insertedUser.name).toEqual(mockUser.name);
    });

    it('should check user email ',async()=>{
      const mockedEmail = 'doe@gmail.com';
        const response = await checkEmail(mockedEmail)
        expect(response).toEqual(mockedEmail)
    })


    // to fix later
    // it('delete user ',async()=>{
    //   const mockedId = 'a61e8f4a9df624e0b4ab246c8';
    //     const response = await deleteUser(mockedId)
    //     console.log('yooo', response)
    //     expect(response).toEqual(mockedId)
    // })

    it('should create todo', async () => {
      const mockTODO = {id: '61e8f8f904023e223bc96a24', title: 'Wash shoes',dates:'20/1 10:59:00'};
      await createTodo(mockTODO.id,mockTODO.title,mockTODO.dates);
      const {todo} = await User.findOne({_id: mockTODO.id});
      const  lastToDO = (todo[todo.length-1])
      expect(lastToDO.title).toEqual(mockTODO.title);
    });



    




  });