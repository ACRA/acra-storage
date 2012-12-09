function(doc) {
    if(doc.APP_VERSION_CODE) {
        emit(doc.APP_VERSION_CODE, 1);
    }
}