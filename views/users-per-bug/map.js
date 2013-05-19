function(doc) {

    if(doc.APP_VERSION_CODE && doc.SIGNATURE) {
        var key = [doc.APP_VERSION_CODE, doc.SIGNATURE.digest];
        if(doc.SIGNATURE.rootCause) {
            key.push(doc.SIGNATURE.rootCause);
        } else {
            key.push("");
        }
        if(doc.INSTALLATION_ID) {
            key.push(doc.INSTALLATION_ID);
            emit(key, 1);
        }
    }
}