// Models related to availability of a user.

const Sequelize = require('sequelize').Sequelize
const Model = require('sequelize').Model
const DataTypes = require('sequelize').DataTypes

const sequelize = new Sequelize('sqlite:')

/**
 * Model defining weekly availablility of a user.
 */
const WeeklyAvailabilityModel = sequelize.define('WeeklyAvailabilityModel', {
    userId: DataTypes.STRING, 
    weekDay: DataTypes.NUMBER, // 1 - 7
    startHour: DataTypes.NUMBER, // 0 - 23
    startMinute: DataTypes.NUMBER, // 0 - 59
    endHour: DataTypes.NUMBER, // 0 - 23
    endMinute: DataTypes.NUMBER, // // 0 - 59
})

/**
 * Model representing over-rides in weekly availability
 */
const AvailabilityOverrideModel = sequelize.define('AvailabilityOverrideModel', {
    userId: DataTypes.STRING, 
    year: DataTypes.NUMBER,
    month: DataTypes.NUMBER,
    day: DataTypes.NUMBER,
    startHour: DataTypes.NUMBER, // 0 - 23
    startMinute: DataTypes.NUMBER, // 0 - 59
    endHour: DataTypes.NUMBER, // 0 - 23
    endMinute: DataTypes.NUMBER, // // 0 - 59
})


exports.WeeklyAvailabilityModel = WeeklyAvailabilityModel
exports.AvailabilityOverrideModel = AvailabilityOverrideModel
