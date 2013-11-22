function(doc) {

    // !code vendor/acra-storage/utils.js
    if(doc.APP_VERSION_CODE && doc.SIGNATURE) {
        var result = utils.digestReport(doc);
        var key = [ doc.SIGNATURE.hash ];

        var reportDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(reportDate.getTime())) {
            reportDate = doc.timestamp;
        }
        key.push(reportDate);

        emit(key,result);
    }
}