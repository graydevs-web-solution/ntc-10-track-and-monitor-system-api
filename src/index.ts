import log from './logger/index';
import app from './app';

const PORT = process.env.PORT || 3000

app().listen(PORT, () => {
  log.info(`Our app is running on port ${PORT}`);
})
