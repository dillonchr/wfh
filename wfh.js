const inbox = require('inbox');

module.exports = (URL, PORT, USERNAME, PASSWORD, callback) => {
    const client = inbox.createConnection(PORT, URL, {
        secureConnection: true,
        auth: {
            user: USERNAME,
            pass: PASSWORD
        }
    });

    client.connect();

    const respondToCall = (err, result) => {
        callback(err, result);
        client.close();
    };

    const buildResultWithWhosOut = who => {
        return {wfh: +!!who.length, who};
    };

    const itsANoGuys = () => {
        respondToCall(null, buildResultWithWhosOut([]));
    };

    const loadMessages = n => client.listMessages(n, (err, messages) => {
        if (err) {
            respondToCall(err);
        } else {
            const who = messages
                .filter(m => !m.flags.includes('\\Seen') && /wfh/i.test(m.title))
                .map(m => m.from.address.split('@').shift())
                .filter((who, i, a) => a.indexOf(who) === i);
            if (who.length) {
                respondToCall(null, buildResultWithWhosOut(who));
            } else {
                itsANoGuys();
            }
        }
    });

    const openMailbox = () => client.openMailbox('INBOX', (err, info) => {
        if (err) {
            respondToCall(err);
        } else {
            if (info.count) {
                loadMessages(Math.max(info.count, 30) * -1);
            } else {
                itsANoGuys();
            }
        }
    });

    client.on('connect', openMailbox);
    client.on('error', respondToCall);
};
