function (head, req) {
    var fixDate = function(s) {
        if (Date.parse) {
            try {
                var d = new Date(Date.parse(s));
                return d.toISOString();
            } catch (e) {
            }
        }
        return s;
    };

    var escape = function(s){
        if (!s) { s = ""; }
        return String(s).replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    var appDBPrefix = 'acra-';

    start({ "headers" : {"Content-type" : "application/atom+xml"}});
    var NB_ITEMS_MAX = 30;

    send('<?xml version="1.0" encoding="utf-8"?>');

    send('<feed xmlns="http://www.w3.org/2005/Atom">');
    send('<author><name>acra-storage</name><uri>https://github.com/ACRA/acra-storage</uri></author>');

    var appName = req.path[0].substring(appDBPrefix.length);
    send('<title>' + appName + ' latest Crash Reports</title>');
    send('<subtitle>Acralyzer latest crash reports.</subtitle>');

    var atomUrl = '/' + appName + '/_design/acra-storage/_list/atom/recent-items?descending=true';

    send('<link href="' + atomUrl + '" rel="self" />');
    send('<link href="/acralyzer/_design/acralyzer/index.html#/dashboard/' + appName + '" />');
    send('<id>https://' + req.headers.Host + atomUrl + '</id>');

    var nbItems = 0;
    while ((nbItems < NB_ITEMS_MAX) && (row = getRow())) {
        if (nbItems == 0) {
            send('<updated>' + fixDate(row.key) + '</updated>');
        }
        nbItems++;

        send('<entry>');
        send('<title>');
        if(row.value.signature) {
            send(escape(row.value.signature.digest));
        }
        send('</title>');
        send('<link href="');
        send('/acralyzer/_design/acralyzer/index.html#/report-details/' + appName + '/' + row.id +'" />');
        send('<id>urn:uuid:' + row.id + '</id>');
        send('<updated>' + fixDate(row.key) + '</updated>');

        send('<content type="xhtml"><div xmlns="http://www.w3.org/1999/xhtml">');
        if(row.value.application_version_name) {
            send('<p>app_version: ' + escape(row.value.application_version_name) + '</p>');
        }
        if(row.value.android_version) {
            send('<p>android_version: ' + escape(row.value.android_version) + '</p>');
        }
        if(row.value.device) {
            send('<p>device: ' + escape(row.value.device) + '</p>');
        }
        if(row.value.signature) {
            send('<p>crash line: ' + escape(row.value.signature.full) + '</p>');
        }
        send('</div></content>');
        send('</entry>');
    }
    send('</feed>');
}
