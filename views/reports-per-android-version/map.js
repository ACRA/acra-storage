/* global emit: false */
/* jshint -W025 */
function(doc) {
    if(doc.ANDROID_VERSION) {
        emit(doc.ANDROID_VERSION, 1);
    }
}
