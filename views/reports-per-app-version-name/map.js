function(doc) {
    if(doc.APP_VERSION_NAME) {
        emit(doc.APP_VERSION_NAME, 1);
    }
}