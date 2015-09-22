import './dependencies';
import './modules/window_events';
import './app_state';

import Router from './router';
import log from 'libs/logger';

new Router().run();
log('info', 'app initialized');
