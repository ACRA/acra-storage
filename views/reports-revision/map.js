function(doc) {
    if(doc.REPORT_ID) {
        var crashDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(crashDate.getTime())) {
            crashDate = doc.timestamp;
        }
        emit([crashDate.getFullYear(), crashDate.getMonth() , crashDate.getDate(), crashDate.getHours(), crashDate.getMinutes(), crashDate.getSeconds(), crashDate.getMilliseconds()], doc._rev);
    }
}