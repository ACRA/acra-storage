function (head, req) {
    start({ "headers" : {"Content-type" : "application/rss+xml"}});
    var NB_ITEMS_MAX = 30;

    send('<rss version="0.91">');

    send('<channel>');
    send('<title>Latest Crash Reports</title>');
    send('<link>http://' + req.headers.Host + '/acralyzer/_design/acralyzer/index.html</link>');
    send('<description>Acralyzer latest crash reports.</description>');
    var nbItems = 0;
    while ((nbItems < NB_ITEMS_MAX) && (row = getRow())) {
        nbItems++;
        send('<item>');
        send('<title>');
        if(row.value.signature) {
            send(row.value.signature.digest);
        }
        send('</title>');
        send('<link>http://'+ req.headers.Host);
        send('/acralyzer/_design/acralyzer/index.html#/report-details/' + row.id +'</link>');
        send('<description>');
        if(row.value.application_version_name) {
            send('<p>app_version: ' + row.value.application_version_name + '</p>');
        }
        if(row.value.android_version) {
            send('<p>android_version: ' + row.value.android_version + '</p>');
        }
        if(row.value.device) {
            send('<p>device: ' + row.value.device + '</p>');
        }
        if(row.value.signature) {
            send('<p>crash line: ' + row.value.signature.full + '</p>');
        }
        send('</description>');
        send('<guid>' + row.id + '</guid>');
        send('<pubDate>' + row.key + '</pubDate>')
        send('</item>');
    }
    send('</channel>');
    send('</rss>');
}