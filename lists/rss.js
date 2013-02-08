function (head, req) {
    send('<rss version="0.91">');

    send('<channel>');
    send('<title>Latest Crash Reports</title>');
    send('<link>http://' + req.headers.Host + '/' + req.path[0] + '/' + '_design/acralyzer/index.html</link>');
    send('<description>Acralyzer latest crash reports.</description>');
    while (row = getRow()) {
        send('<item>');
        send('<title>');
        if(row.value.signature) {
            send(row.value.signature.digest);
        }
        send('</title>');
        send('<link>http://'+ req.headers.Host);
        send('/' + req.path[0] + '/' + '_design/acralyzer/index.html#/ReportDetails?id=' + row.id +'</link>');
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