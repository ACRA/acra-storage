function(doc) {
    if(doc.USER_CRASH_DATE) {
        var crashDate = new Date(doc.USER_CRASH_DATE);
        if(isNaN(crashDate.getTime())) {
            crashDate = doc.timestamp;
        }
        if(crashDate.getFullYear() > 2000) {
            emit([crashDate.getFullYear(), crashDate.getMonth() , crashDate.getDate(), crashDate.getHours(), crashDate.getMinutes(), crashDate.getSeconds(), crashDate.getMilliseconds()], 1);
        }
    }
}