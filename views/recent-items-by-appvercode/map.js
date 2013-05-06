function(doc) {

    // !code vendor/acra-storage/utils.js
    var result = utils.digestReport(doc);
    if(result) {
        var key = [doc.APP_VERSION_CODE, new Date(doc.USER_CRASH_DATE)];
        emit(key, result);
    }
};