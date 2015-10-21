export default {
  server: {
    ip: '127.0.0.1',
    port: parseInt(process.env.PORT, 10) || 3000,
  },

  session: {
    secret: 'sheistouchingme',
    maxAge: 86400000,
  },
};
