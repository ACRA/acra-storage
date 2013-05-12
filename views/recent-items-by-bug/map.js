function(doc) {

    // !code vendor/acra-storage/utils.js
    if(doc.APP_VERSION_CODE && doc.SIGNATURE) {
        var result = utils.digestReport(doc);
        var key = [doc.APP_VERSION_CODE, doc.SIGNATURE.digest];
        if(doc.SIGNATURE.rootCause) {
            key.push(doc.SIGNATURE.rootCause);
        } else {
            key.push("");
        }
        key.push(new Date(doc.USER_CRASH_DATE));
        emit(key,result);
    }
}