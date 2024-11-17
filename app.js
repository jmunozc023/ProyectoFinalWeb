const express = require('express');
const {connectToDb , getDb} = require('./db');
const app = express();
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3001, () => {
            console.log('Server running on http://localhost:3001');
        });
        db = getDb();
    }
});
