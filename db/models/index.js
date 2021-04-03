const path = require('path')
const Sequelize = require('sequelize')
const glob = require('glob')
const config = require('../config.js')

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

glob.sync(path.join(__dirname, './**/!(index|_*).js'))
    .forEach(file => {
        const model = require(file)(sequelize, Sequelize)

        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
