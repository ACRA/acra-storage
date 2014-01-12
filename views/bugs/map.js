function(doc) {
    if (doc.SIGNATURE && doc.SIGNATURE.digest && (typeof doc.APP_VERSION_CODE !== 'undefined') && doc.USER_CRASH_DATE) {
        // This is a report, compute stats
        var key = doc.SIGNATURE.hash;

        var reportDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(reportDate.getTime())) {
            reportDate = doc.timestamp;
        }
        var value = { 
            exception: doc.SIGNATURE.full,
            rootCause: doc.SIGNATURE.rootCause,
            appVersion: doc.APP_VERSION_CODE,
            description: "",
            latest: reportDate.getTime(),
            count: 1 
        };

        emit(key, value);
    } else if (doc.type == "solved_signature") {
        // This is a "solved" marker, mark it as solved
        var key = doc.SIGNATURE.hash;

        var desc = "";
        if (doc.description) {
            desc = doc.description;
        }

        var value = {
            exception: null,
            rootCause: null,
            appVersion: null,
            description: desc,
            latest: 0,
            count: 1,
            solved: doc.solved
        };

        // TODO: maybe we should emit as many markers as there are possible APP_VERSION_CODE values
        //       so that the bug is mark "solved" for this version of the app and earlier versions
        //       of the app
        emit(key, value);
    }
}
