'use strict';

module.exports = function (app) {
    let userRoutes = require('./routes/user-route');
    userRoutes(app);
    let transactionRoutes = require('./routes/transaction-route');
    transactionRoutes(app);
}