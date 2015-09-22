import Iso from 'iso';
import alt from './alt';
import vent from './modules/vent';
import currentUser from './stores/current_user';
import auth from './modules/auth';


Iso.bootstrap((state, meta, container) => {
  window.titleNode = document.getElementsByTagName('title')[0];
  window.appNode = container;

  alt.bootstrap(state);
  vent.trigger('state:initialized');

  if (currentUser.authorized()) {
    auth.setTokenHeaders(currentUser.get());
  }
});
