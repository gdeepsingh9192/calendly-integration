var express = require('express');
var router = express.Router();

var ScheduleService = require('../services/scheduleService')

var DEFAULT_MIN_START = (Date.now() - (7 * 24 * 3600000)) // Last one week by default
var DEFAULT_MAX_START = Date.now()

/**
 * Get schedule of a user
 */
router.get('/', function(req, res, next) {
  var schedule = new ScheduleService().getSchedule(
    req.query.userId,
    req.query.minStartTime || DEFAULT_MIN_START,
    req.query.maxStartTime || DEFAULT_MAX_START
  )

  return res.send({
    'result': schedule
  })
});

/**
 * Get overlap between schedules of two users
 */
router.get('/schedule_overlap', function(req, res, next) {
  
  var schedule = new ScheduleService().getOverlapBetweenSchedules(
    req.query.userId1,
    req.query.userId2,
    req.query.minStartTime || DEFAULT_MIN_START,
    req.query.maxStartTime || DEFAULT_MAX_START
  )

  return res.send({
    'result': schedule
  })
});

module.exports = router;
