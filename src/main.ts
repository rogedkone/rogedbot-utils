import './bot';

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ', err);
});
