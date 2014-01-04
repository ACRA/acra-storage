function (head, req) {
    var fixDate = function(s) {
        if (Date.parse) {
            try {
                var d = new Date(Date.parse(s));
                return d.toUTCString();
            } catch (e) {
            }
        }
        return s;
    };

    var escape = function(s){
        if (!s) { s = ""; }
        s = s.toString();
        return s.replace(/&quot;/g, '"')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&amp;/g, '&');
    };

    var appDBPrefix = 'acra-';

    start({ "headers" : {"Content-type" : "application/rss+xml"}});
    var NB_ITEMS_MAX = 30;

    send('<rss version="0.91">');

    send('<channel>');
    var appName = req.path[0].substring(appDBPrefix.length);
    send('<title>' + appName + ' latest Crash Reports</title>');
    send('<link>http://' + req.headers.Host + '/acralyzer/_design/acralyzer/index.html#/dashboard/' + appName + '</link>');
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
        send('/acralyzer/_design/acralyzer/index.html#/report-details/' + appName + '/' + row.id +'</link>');
        send('<description><![CDATA[');
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
        send(']]></description>');
        send('<guid isPermaLink="false">' + row.id + '</guid>');
        send('<pubDate>' + fixDate(row.key) + '</pubDate>');
        send('</item>');
    }
    send('</channel>');
    send('</rss>');

}
