const CalendarService = require('./calendarService')
const OverlapDetector = require('./overlapDetector')


class ScheduleService {

    constructor() {
        this.calendarService = new CalendarService()
        this.overlapDetector = new OverlapDetector.OverlapDetectorForMutExes()
    }

    /**
     * Get schedule of user between start and end time range. 
     * @param {string} userId ID of user
     * @param {number} minStartTime Minimum start time of schedule event - epoch timestamp
     * @param {number} maxStartTime Max start time of user - epoch timestamp
     */
    getSchedule(userId, minStartTime, maxStartTime) {
        return this.calendarService.getSchedule(userId, minStartTime, maxStartTime)
    }

    /**
     * Return overlapping schedules between two users.
     * @param {string} userId1 
     * @param {string} userId2 
     * @param {number} minStartTime 
     * @param {number} maxStartTime 
     */
    getOverlapBetweenSchedules(userId1, userId2, minStartTime, maxStartTime) {
        var schedule1 = this.getSchedule(userId1, minStartTime, maxStartTime)
        var schedule2 = this.getSchedule(userId2, minStartTime, maxStartTime)

        return this.overlapDetector.detect(
            schedule1, schedule2
        )
    }
}

module.exports = ScheduleService