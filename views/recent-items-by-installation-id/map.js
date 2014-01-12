function(doc) {

    var reportDate = new Date(doc.USER_CRASH_DATE);
    if(isNaN(reportDate.getTime())) {
        reportDate = doc.timestamp;
    }
    var key = [doc.INSTALLATION_ID, reportDate];
    emit(key, null);
};