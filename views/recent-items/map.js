function(doc) {

    var reportDate = new Date(doc.USER_CRASH_DATE);
    if(isNaN(reportDate.getTime())) {
        reportDate = doc.timestamp;
    }
    emit(reportDate, null);
};