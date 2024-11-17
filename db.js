const { MongoClient } = require("mongodb");
let dbConnection;
let uri = "mongodb://localhost:27017/dbProyFinWeb";
module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch(err => {
            console.log(err);
            return callback(err);
        });
    },
    getDb: () => dbConnection
}