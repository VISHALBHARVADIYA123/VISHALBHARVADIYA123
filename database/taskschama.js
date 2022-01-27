import Realm from "realm";

export const TODOLIST_SCHEMA = "TodoList"
export const TODO_SCHAMA = "Todo"

export const TodoSchema = {
     name: TODO_SCHAMA,
     primaryKey: 'id',
     properties: {
         id: 'int', 
         name: { type: 'string', indexed: true},
         done : { type: 'bool', default: false},

     }
}

export const TodoListScheam = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', 
        name: 'string',
        creationDate: 'date',
        todos: {type: 'list', objectType: TODO_SCHAMA},
    }
}

const databaseOptions = { 
    path: 'todoListApp.realm',
    schema: [TodoListScheam, TodoSchema],
    schemaVersion: 0,
}

export const interNewTodolist = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=> {
            realm.create(TODOLIST_SCHEMA,newTodoList );
            resolve(newTodoList);
        })
    }).catch((error) => reject(error));
})

export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList =realm.objectForPrimaryKey(TodoListScheam, todoList.id);
            updatingTodoList.name = todoList.name;
            resolve();
        })
    }).catch((error) => reject(error));
})

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodoList =realm.objectForPrimaryKey(TodoListScheam, todoListId);
            realm.delete(deletingTodoList)
            resolve();
        })
    }).catch((error) => reject(error));
})

export const deleteAllTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoLists =realm.objects(TODOLIST_SCHEMA);
            resolve(allTodoLists);
        }).catch((error) => {reject(error)})
    })
})

export const quearyAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoLists =realm.objects(TODOLIST_SCHEMA);
            resolve(allTodoLists);
        }).catch((error) => {reject(error)})
    })
})

export default new Realm(databaseOptions);

