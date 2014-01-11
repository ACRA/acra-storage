/* global emit: false */
/* jshint -W025 */
function(doc) {
    var key,value;
    if (doc.SIGNATURE && doc.SIGNATURE.digest && (typeof doc.APP_VERSION_CODE !== 'undefined') && doc.USER_CRASH_DATE) {
        // This is a report, compute stats
        key = [ doc.APP_VERSION_CODE, doc.SIGNATURE.digest ];
        if (doc.SIGNATURE.rootCause) {
            key.push(doc.SIGNATURE.rootCause);
        } else {
            key.push("");
        }
        var reportDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(reportDate.getTime())) {
            reportDate = doc.timestamp;
        }
        value = { latest: reportDate.getTime(), count: 1 };
        emit(key, value);
    } else if (doc.type === "solved_signature") {
        // This is a "solved" marker, mark it as solved
        key = [ doc.APP_VERSION_CODE, doc.digest ];
        if (doc.rootCause) {
            key.push(doc.rootCause);
        } else {
            key.push("");
        }
        value = { solved: doc.solved };
        if (doc.description) {
            value.description = doc.description;
        } else {
            value.description = "";
        }
        // TODO: maybe we should emit as many markers as there APP_VERSION_CODE possible anterior values
        emit(key, value);
    }
}
