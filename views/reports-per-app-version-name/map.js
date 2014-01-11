/* global emit: false */
/* jshint -W025 */
function(doc) {
    if(doc.APP_VERSION_NAME) {
        emit(doc.APP_VERSION_NAME, 1);
    }
}
