
/**
 * Following logic assumes any event has a non-zero time duration
 */
var doOverlap = (start1, end1, start2, end2) => {
    return (
        (start1 == start2) || 
        (end1 == end2) ||
        (end2 > start1 && end2 < end1) ||
        (end1 > start2 && end1 < end2)
    )
}

/**
 * Overlap detector using bruteforce method. 
 * Can detect overlapping events even if timeline of a user has overlapping events.
 */
class OverlapDetector {

    /**
     * @param {Array} timeline1 [(start1, end1), .....]
     * @param {Array} timeline2 [(start1, end1), .....]
     * @returns {Array} [()]
     */
    detect = (timeline1, timeline2) => {
        var result = []

        if (timeline1.length == 0 || timeline2.length == 0) {
            return result
        }

        for (var event1 of timeline1) {
            for (var event2 of timeline2) {
                if (doOverlap(event1[0], event1[1], event2[0], event2[1])) {
                    result.push([event1, event2])
                }
            }
        }

        return result
    }
}


/**
 * Overlap detector for cases where events are mutually exclusive.
 * Faster than generic overlap detector
 */
class OverlapDetectorForMutExes {

    detect = (timeline1, timeline2) => {
        var result = []

        if (timeline1.length == 0 || timeline2.length == 0) {
            return result
        }

        var i = 0
        var j = 0

        while (i < timeline1.length && j < timeline2.length)  {
            var start1 = timeline1[i][0]
            var start2 = timeline2[j][0]
            var end1 = timeline1[i][1]
            var end2 = timeline2[j][1]

            if (doOverlap(start1, end1, start2, end2)) {
                result.push([
                    [start1, end1],
                    [start2, end2]
                ])
            } 

            if (end1 < end2) {
                i++
            } else if (end2 < end1) {
                j++
            } else {
                i++
                j++
            }
        }
        return result
    }
}

exports.OverlapDetector = OverlapDetector;
exports.OverlapDetectorForMutExes = OverlapDetectorForMutExes;
