function(doc) {
    if(doc.BUILD && doc.BUILD.VERSION && doc.BUILD.VERSION.SDK) {
        emit(doc.BUILD.VERSION.SDK, 1);
    }
}