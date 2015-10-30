import session from 'express-session';
import MongoStoreFactory from 'connect-mongo';
import config from 'config';

const MongoStore = MongoStoreFactory(session);

export default session({
  resave: false,
  saveUninitialized: false,
  secret: config.session.secret,
  cookie: {maxAge: config.session.maxAge},
  store: new MongoStore({
    url: `mongodb://${config.session.db.host}/${config.session.db.database}`
  })
});
