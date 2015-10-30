import session from 'express-session';
import MongoStoreFactory from 'connect-mongo';
import config from 'config';

const MongoStore = MongoStoreFactory(session);

export default function () {
  return session({
    resave: false,
    saveUninitialized: false,
    secret: config.session.secret,
    cookie: { maxAge: config.session.maxAge },
    store: new MongoStore({
      url: `mongodb://${config.mongodb.host}/${config.mongodb.database}`
    })
  });
}