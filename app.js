const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let db, collection;

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
