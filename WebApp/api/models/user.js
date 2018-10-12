const db = require('../sequelize');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const User = sequelize.define('users',{
    userid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING(500),
        allowNull: false
    }
});

User.sync()
    .then(() => { console.log("Transactions table checked"); })
    .catch(err => {
        console.log('Table creation error: ' + err);
    });

module.exports = User;
