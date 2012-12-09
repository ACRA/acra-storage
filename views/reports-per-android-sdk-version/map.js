function(doc) {
    if(doc.BUILD.VERSION.SDK) {
        emit(doc.BUILD.VERSION.SDK, 1);
    }
}