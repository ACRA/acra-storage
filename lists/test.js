function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        send('[');
        var first = true;
        var filterKey = req.query.key;
        var value = req.query.value;
        var filterKey2 = req.query.key2;
        var value2 = req.query.value2;
        var nmax = req.query.nmax;
        var count = 0;
        while (row = getRow() && count < nmax) {
            var sendRow = true;
            if(filterKey && !(row.value[filterKey] == value)) {
                sendRow = false;
                send("discarded");
            }
            if(filterKey2 && !(row.value[filterKey2] == value2)) {
                sendRow = false;
            }
            if(sendRow) {
                if(!first) {
                    send(',');
                } else {
                    first = false;
                }
                // make sure to stringify the results :)
                send(JSON.stringify(row));
                count++;
            }
        }
        send(']');
    });
}