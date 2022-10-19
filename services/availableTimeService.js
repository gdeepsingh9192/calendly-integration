

const WeeklyAvailabilityModel = require('../models/availability').WeeklyAvailabilityModel
const AvailabilityOverrideModel = require('../models/availability').AvailabilityOverrideModel

class AvailableTimeService {

    /**
     * Provide time slots when user is supposed to be available
     */
    async getTimeSlots(userId, startDate, endDate) {
        let weeklyAvailability = await WeeklyAvailabilityModel.findAll({
            where: {
                userId: userId
            }
        })
        let weeklyAvailabilityMap = {}
        for (let item of weeklyAvailability) {
            weeklyAvailabilityMap[item.weekDay] = item
        }

        // Extract dates from epoch time range. 
        // For each date, get available time slots from weekly availability. 
        // Map those time slots to their epoch timestamps and add to result.
        let weeklySlots = []
        let start = new Date(startDate)    
        let end = new Date(endDate)

        start.setHours(0)
        start.setMinutes(0)
        start.setSeconds(0)
        start.setMilliseconds(0)
        end.setHours(0)
        end.setMinutes(0)
        end.setSeconds(0)
        end.setMilliseconds(0)

        while (end.getTime() - start.getTime() > 0) {
            let week = start.getDay() + 1
            weeklyAvailabilityMap
            start = new Date(start.getTime() + 86400000)
        }




        let availabilityOverrides = await AvailabilityOverrideModel.findAll({
            where: {
                userId: userId,
            }
        })

        // Merge to find out availability
        
        
    }
}