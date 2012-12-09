function(doc) {
    if(doc.ANDROID_VERSION) {
        emit(doc.ANDROID_VERSION, 1);
    }
}