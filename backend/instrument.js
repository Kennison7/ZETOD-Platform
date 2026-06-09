const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://4cb34d0361d6c89caa79f2589100f436@o4511523695624192.ingest.de.sentry.io/4511523774201936",
  sendDefaultPii: true,
});
