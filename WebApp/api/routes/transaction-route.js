'use strict';
module.exports = function(app){
    const transactionController = require('../controllers/transaction-controller');
    app.route('/transaction')
        .get(verify, transactionController.list)
        .post(verify, transactionController.add);
    
    app.route('/transaction/:id')
        .put(verify, transactionController.update)
        .delete(verify, transactionController.delete);

    function verify(req, res, next) {
        const bearerHead = req.headers['authorization'];
        if (bearerHead == undefined) {
            console.log('Hack ');
            res.status(403).json({sc:403,status:'User not logged in'});
        } else {
            // req.token = bearerHead;
            next();
        }
    }
}