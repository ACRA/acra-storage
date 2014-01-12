function(doc) {

    var reportDate = new Date(doc.USER_CRASH_DATE);
    if(isNaN(reportDate.getTime())) {
        reportDate = doc.timestamp;
    }
    var key = [doc.APP_VERSION_NAME, reportDate];
    emit(key, 1);
};