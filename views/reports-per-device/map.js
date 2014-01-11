/* global emit: false, utils: false */
/* jshint -W025 */
function(doc) {

    // !code vendor/acra-storage/utils.js
    if(doc.APP_VERSION_NAME) {
        emit(utils.getDevice(doc), 1);
    }
}
