// Models related to users config. 

const Sequelize = require('sequelize').Sequelize
const Model = require('sequelize').Model
const DataTypes = require('sequelize').DataTypes

const sequelize = new Sequelize('sqlite:')

const UserConfigModel = sequelize.define('UserConfigModel', {
    userId: DataTypes.STRING, 
    orgId: DataTypes.STRING,
    calendlyUserId: DataTypes.STRING,
})

exports.UserConfigModel = UserConfigModel