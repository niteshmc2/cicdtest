'use strict';
module.exports = function(app){

    const attachmentController = require('../controllers/attachment-controller')

    app.route('/transaction/:id/attachments/:idAttachments')
        .put(verify, attachmentController.update)
        .delete(verify, attachmentController.delete);

    app.route('/transaction/:id/attachments')
        .post(verify, attachmentController.add)
        .get(verify, attachmentController.list);


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