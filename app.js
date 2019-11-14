const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let db;

const password = "R3vvUju0varPXEuE";

const url = `mongodb+srv://FrostyPhoenixAdmin:${password}@rc-cluster-cn4jw.azure.mongodb.net/test?retryWrites=true&w=majority`;
const dbName = "todo-database";

app.listen(3000, () => {

    MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
    })

});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (request, response) => {
    db.collection("Todo-List-Collection").find().toArray((error, result) => {
        if(error) {
            return console.log(error);
        }
        response.render('index.ejs', {todoItems: result});
    });
});

app.post('/todoSubmit', (request, response) => {
    const objectToSave = {
        todoTask: request.body.todoTask,
        isComplete: false
    }
    db.collection('Todo-List-Collection').save(objectToSave, (err, result) => {
        if (err) return console.log(err);
        console.log('saved task to database');
        response.redirect('/');
    });
});

app.put('/toggleComplete', (request, response) => {
    console.log(request.body);
    db.collection('Todo-List-Collection').findOneAndUpdate({
        _id: ObjectID(request.body._id)
    }, {
        $set: {
          isComplete: request.body.updatedComplete
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (error, result) => {
          if(error) {
              return response.send(error);
          }
          response.send(result);
      });
})
