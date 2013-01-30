function(doc) {

    // !code vendor/acra-storage/utils.js
    var result = utils.digestReport(doc);
    if(result) {
        var key = [doc.ANDROID_VERSION, new Date(doc.USER_CRASH_DATE)];
        emit(key, result);
    }
};