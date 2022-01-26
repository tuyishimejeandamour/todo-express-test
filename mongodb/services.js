const ObjectID = require('mongodb').ObjectID
const { User } = require('./model')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

/* Done */
    async function createUser(name, email, pass) {
        let obj = {name: name, email: email, password: pass, todo: []}
        const user = new User(obj);
        await user.save();
    }
    module.exports.createUser = createUser

    /* Gervais */
    async function checkEmail(email) {
        let users = await User.findOne({email: email})
        if(users !== null) {
            // console.log(users.email)
            return users.email 
        } else {
            return false
        }
    }
    module.exports.checkEmail = checkEmail

    /* Patrick */
    async function checkAuth(email, pass) {
        let users = await User.findOne({email: email})
        if (email === users?.email && pass === users?.password) {
            return true
        } else {
            return false
        }
    }
    module.exports.checkAuth = checkAuth
    
    /* Gervais */
    async function deleteUser(id) {
        const deletedUser = await User.deleteOne({_id: id}, function(err, obj) {
           
        })
        if(deletedUser){
            return deletedUser
        } else 
             if (err) throw err;
    }
    module.exports.deleteUser = deleteUser

    /* Patrick */
    async function getTodoAll(id) {
        let users = await User.findOne({_id: id});
        let db = users?.todo
        if (users !== null) {
            return db
        } else {
            return false
        }
    }
    module.exports.getTodoAll = getTodoAll

    /* Gervais */
    async function createTodo(id, title, dates) {
        const time = moment(Date.now()).format('DD/MM HH:mm:ss')
        let users = await User.findOne({_id: id});
        if(!users) return false;
        let todos = users?.todo;
        let obj = {_id: new ObjectID(), title: title, dueDate: dates, time: time}
        todos.push(obj);
        return await User.updateOne({_id: id}, {todo: todos}, {new: true})
        .then(update=> {
            return true;
        })
        .catch(e=> {
            return false;
        });
    }
    module.exports.createTodo = createTodo

    /* Patrick */
    async function deleteTodo(id, idTodo) {
        let users = await User.findOne({_id: id})
        let arr = users?.todo
        arr = arr.filter(item => item._id != idTodo)
        const response = await User.updateOne({_id: id}, { todo: arr });
        if(!response) return {success: false}
        return {success: true};
    }
    module.exports.deleteTodo = deleteTodo

    /* Gervais */
    async function editTodo(id, idTodo, title, dates) {
        let users = await User.findOne({_id: id});
        if(!users) return false;
        let arr = users?.todo;
        const a = [{_id: "a"}];
        let index = arr.findIndex(x => String(x._id) == String(idTodo));
        arr[index].title = title
        arr[index].dueDate = dates
        return User.findOneAndUpdate({_id: id}, { $set: {todo: arr} }, {new: true})
        .then(updated=> (true))
        .catch(e=> (false));
    }
    module.exports.editTodo = editTodo