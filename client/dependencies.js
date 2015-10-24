import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import Dropzone from 'dropzone';


window.Backbone = Backbone;
window.Backbone.LocalStorage = LocalStorage;

window.appNode = document.getElementById('app-node');
window.titleNode =  document.getElementsByTagName('title')[0];

Dropzone.autoDiscover = false;

$.ajaxSetup({
  crossDomain: true,
  dataType: 'json',
  contentType: 'application/json',
  processData: false,
  beforeSend: function () {
    if (_.isObject(this.data) && this.type.toLowerCase() !== 'get') {
      this.data = JSON.stringify(this.data);
    }
  },
});
