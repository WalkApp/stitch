import _ from 'lodash';
import { Collection } from 'backbone';
import config from 'config';
import urlQuery from 'libs/url_query';


export default class BaseCollection extends Collection {
  url () {
    var
      params = {},
      url = `${this.apiRoot}${_.result(this, 'urlPath')}`;

    if (this.order) {
      params.order = this.order
    }

    if (this.filter) {
      params.filter = this.filter;
    }

    return urlQuery(url, params);
  }

  parse (resp) {
    return resp.collection;
  }
}

BaseCollection.prototype.urlPath = null;
BaseCollection.prototype.apiRoot = config.api_root || config._client.api_root;
BaseCollection.prototype.idAttribute = '_id';
