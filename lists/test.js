function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        send('[');
        var first = true;
        var deviceValue = req.query.device ? req.query.device : "";
        while (row = getRow()) {
            if(row.value.device && row.value.device.indexOf(deviceValue) >= 0) {
                if(!first) {
                    send(',');
                } else {
                    first = false;
                }
                // make sure to stringify the results :)
                send(JSON.stringify(row));
            }
        }
        send(']');
    });
}