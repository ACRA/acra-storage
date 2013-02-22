function(doc) {
    if (doc.SIGNATURE && doc.SIGNATURE.digest && doc.APP_VERSION_CODE && doc.USER_CRASH_DATE) {
        // This is a report, compute stats
        var key = [ doc.APP_VERSION_CODE, doc.SIGNATURE.digest ];
        var value = { latest: new Date(doc.USER_CRASH_DATE).getTime(), count: 1 }
        emit(key, value);
    } else if (doc.type == "solved_signature") {
        // This is a "solved" marker, mark it as solved
        var key = [ doc.APP_VERSION_CODE, doc.digest ];
        var value = { solved: true };
        emit(key, value);
    }
}