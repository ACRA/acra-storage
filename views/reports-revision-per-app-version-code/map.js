function(doc) {
    if(doc.REPORT_ID) {
        if(doc.APP_VERSION_CODE) {
            emit(doc.APP_VERSION_CODE, doc._rev);
        }
    }
}