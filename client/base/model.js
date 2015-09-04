import Backbone from 'backbone';
import _ from 'lodash';
import config from 'config';
import $ from 'jquery';


export default class Model extends Backbone.Model {
  baseUrl () {
    return `${this.apiRoot}${_.result(this, 'urlPath')}`;
  }

  url () {
    var url = this.baseUrl();

    if (this.id) {
      url += `/${this.id}`;
    }

    return url;
  }
}

Model.prototype.apiRoot = config.api_root || config._client.api_root;
Model.prototype.urlPath = null;
Model.prototype.idAttribute = '_id';
Model.prototype.$ = $.ajax;
