import Iso from 'iso';
import alt from './alt';
import vent from './modules/vent';


Iso.bootstrap((state, meta, container) => {
  window.titleNode = document.getElementsByTagName('title')[0];
  window.appNode = container;

  alt.bootstrap(JSON.stringify(state));
  vent.trigger('state:initialized');
});
