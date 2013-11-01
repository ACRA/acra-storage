function(doc) {

    var key = [doc.SIGNATURE.hash];
    key.push(doc.INSTALLATION_ID);
    var reportDate = new Date(doc.USER_CRASH_DATE);
    if(isNaN(reportDate.getTime())) {
        reportDate = doc.timestamp;
    }
    key.push(reportDate);

    emit(key,null);
}