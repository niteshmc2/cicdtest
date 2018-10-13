const db = require('../sequelize');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const Attachment = sequelize.define('attachment',{
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING(500),
        allowNull: false
    }
});

Attachment.sync()
    .then(() => { console.log("Attachment table checked"); })
    .catch(err => {
        console.log('Table creation error: ' + err);
    });

module.exports = Attachment;
