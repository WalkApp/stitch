export default function (req, res, next) {
  res.locals.lang = 'en';
  res.locals.env.lang = 'en';
  req.lang = 'en';
  next();
}
