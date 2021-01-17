const mongoose = require('mongoose');

const establishDatabaseConnection = (databaseName) => {
    mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = {
    establishDatabaseConnection,
}