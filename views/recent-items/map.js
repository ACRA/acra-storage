function(doc) {

    // !code vendor/acra-storage/utils.js
    var result = utils.digestReport(doc);
    if(result) {
        var reportDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(reportDate.getTime())) {
            reportDate = doc.timestamp;
        }
        emit(reportDate, result);
    }
};