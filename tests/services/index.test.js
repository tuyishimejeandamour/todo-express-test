
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
    it('delete user ',async()=>{
      const mockedId = '61e927360beb3087386c2b3a';
      const deletedUser = await deleteUser(mockedId)
      expect(deletedUser.ok).toEqual(1)
    })

    it('should create todo', async () => {
      const mockTODO = {id: '61e8ff7713e40732a442911a', title: 'Wash shoes',dates:'20/1 10:59:00'};
      await createTodo(mockTODO.id,mockTODO.title,mockTODO.dates);
      const {todo} = await User.findOne({_id: mockTODO.id});
      const  lastToDO = (todo[todo.length-1])
      expect(lastToDO.title).toEqual(mockTODO.title);
    });

    it('should edit todo', async () => {
      const mockTODO = {user_id: '61e8ff7713e40732a442911a', todo_id:'61e93039cbadb4259b6660db', title: 'Wash dishes',dates:'20/1 10:59:00'};
      await editTodo(mockTODO.user_id,mockTODO.todo_id,mockTODO.title,mockTODO.dates);
      const {todo} = await User.findOne({_id: mockTODO.user_id});
      const  lastToDO = todo.findIndex(x=> x._id==mockTODO.todo_id)
      expect(todo[lastToDO].title).toEqual(mockTODO.title);
    });


    




  });