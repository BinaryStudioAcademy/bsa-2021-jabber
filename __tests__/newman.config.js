const newman = require('newman');

newman.run(
  {
    collection: require('./specs/jabber.postman_collection.json'),
    reporters: ['cli', 'json'],
    environment: require('./specs/envs.postman_environment.json'),
    color: 'on',
    delayRequest: 500,
    timeout: 60000,
  },

  function (err, summary) {
    if (err || summary.run.error || summary.run.failures.length) {
      process.exit(1);
    }
  },
);
