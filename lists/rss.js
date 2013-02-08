function (head, req) {
    send('<rss version="0.91">');

    send('<channel>');
    send('<title>The Smallest test channel</title>');
    send('<link>http://www.thesmallest.com/</link>');
    send('<description>Example channel construction test</description>');
    while (row = getRow()) {
        send('<item>');
        send('<title>New lessonette</title>');
        send('<link>http://www.thesmallest.com/lessonettes/</link>');
        send('<description>The Smallest publishes a new lesson</description>');
        send('</item>');
    }
    send('</channel>');
    send('</rss>');
}