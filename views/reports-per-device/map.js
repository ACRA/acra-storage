function(doc) {

    // !code vendor/acra-storage/utils.js
    if(doc.APP_VERSION_NAME) {
        emit(utils.getDevice(doc), 1);
    }
}