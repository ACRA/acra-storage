function(doc) {

    if(doc.APP_VERSION_CODE && doc.SIGNATURE) {
        var key = [doc.SIGNATURE.hash];

        if(doc.INSTALLATION_ID) {
            key.push(doc.INSTALLATION_ID);
            emit(key, 1);
        }
    }
}