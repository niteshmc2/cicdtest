const imprt = require('../sequelize');
const sequelize = imprt.sequelize;
const Sequelize = imprt.Sequelize;

const Transaction = sequelize.define('transactions', {
    id: {
        type : Sequelize.STRING,
        primaryKey: true
    },
    description: { 
        type:Sequelize.STRING(1500),
        allowNull: false
    },
    merchant: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    attachmentid: {
        type : Sequelize.STRING,
        allowNull: true
    }


})

Transaction.sync()
    .then(() => { console.log("Transactions table checked"); })
    .catch(err => {
        console.log('Table creation error: ' + err);
    });


module.exports = Transaction;
