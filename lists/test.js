/* global: send: false, start: false, getRow: false, provides: false */
/* jshint -W025 */
function (head, req) {
    "use strict";
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        var filterKey = req.query.key;
        var value = req.query.value;
        var filterKey2 = req.query.key2;
        var value2 = req.query.value2;
        var nmax = req.query.nmax;

        var rows = [];
        var row;
        while (row = getRow() && rows.length < nmax) {
            if(filterKey && row.value[filterKey] !== value) {
                rows.push("discarded");
                continue;
            }
            if(filterKey2 && row.value[filterKey2] !== value2) {
                continue;
            }
            rows.push(row);
        }

        send(JSON.stringify(rows));
    });
}
