
const {MongoClient} = require('mongodb');
const {User} = require('../../mongodb/model');
// const jest = require('jest');
const mongoose = require('mongoose');

let { 
  checkEmail, 
  createUser, 
  editTodo, 
  createTodo, 
  deleteTodo, 
  deleteUser,
  checkAuth,
  getTodoAll
} = require('../../mongodb/services')


describe('Test services', () => {
  let db;
  const mockUser = {name: 'John Doe', email: 'doe@gmail.com',pass:'john'};
  const fakeTodos = [
    {
      _id:'61e930fdb0c7fa200876eca6',
      title:'Reading Java',
      dueDate: '20 Jan 2022',
      time:'20/01 16:53:01'
    },
    {
      _id:'61e9a0fdb0c7fa200876eca8',
      title:'Reading Nodejs',
      dueDate: '21 Jan 2022',
      time:'20/01 19:53:01'
    }
  ]
  const fakeUser = {
    _id: '5dbff32e367a343830cd2f49',
    email: 'test@gmail.com',
    pass:'test@123',
    todo: fakeTodos
  }
  
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
      await createUser(mockUser.name,mockUser.email,mockUser.pass);
      const insertedUser = await User.findOne({email: 'doe@gmail.com'});
      expect(insertedUser.name).toEqual(mockUser.name);
    });

    it('should check user email ',async()=>{
      const mockedEmail = 'doe@gmail.com';
        const response = await checkEmail(mockedEmail)
        expect(response).toEqual(mockedEmail)
    })

    it('Should return false for wrong credentials', async () => {
      const randomPayload = {email: 'random@gmail.com', password: 'password@123'};
      const response = await checkAuth(randomPayload.email, randomPayload.password);
      expect(response).toBe(false);
    })

    it('should return true for correct credentials', async() => {
      const response = await checkAuth(mockUser.email, mockUser.password);
      expect(response).toBe(false);
    })
    
    it('should get all user todos ', async() => {
     
       /*Mock mongoose findOne*/
       jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(fakeUser))
        const response = await getTodoAll(fakeUser.id);
        expect(response).toBe(fakeUser.todo);
    })

    it('Should return false when getToDoAll passed with a not found user id ', async() => {
       /*Mock mongoose findOne*/
       jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(null))
        const response = await getTodoAll('5dbff32e367a343830cd2f49');
        expect(response).toBe(false);
    })

    it('Should delete todo successfully', async() => {
       /*Mock mongoose findOne*/
       jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(fakeUser));
       const response = await deleteTodo(fakeUser._id, fakeUser.todo[0]._id);
       expect(response.success).toBe(true);
    });

    it('Should return false success when an error is thrown', async() => {
      /*Mock mongoose findOne*/
      jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(fakeUser));
      /*Mock mongoose updateOne*/
      jest.spyOn(User, 'updateOne').mockReturnValue(Promise.resolve(null));
      const response = await deleteTodo(fakeUser._id, fakeUser.todo[0]._id);
      expect(response.success).toBe(false);
   });

  });