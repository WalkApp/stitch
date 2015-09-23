import _ from 'lodash';
import $ from 'jquery';
import { Collection } from 'backbone';
import config from 'config';
import urlQuery from 'libs/url_query';


export default class BaseCollection extends Collection {
  constructor (attrs, opts) {
    super(attrs, opts);
    this.paginationConfig = this.paginationDefault();
  }

  paginationDefault () {
    return {
      page: 1,
      perPage: 2,
    };
  }

  baseUrl () {
    return `${this.apiRoot}${_.result(this, 'urlPath')}`;
  }

  url () {
    let url = this.baseUrl();
    let params = {
      page: this.paginationConfig.page,
      per_page: this.paginationConfig.perPage,
    };

    if (this.order) {
      params.order = this.order;
    }

    if (this.filterModel) {
      params.filter = this.filterModel;
    }

    return urlQuery(url, params);
  }

  parse (resp) {
    return resp.collection;
  }

  fetchCount () {
    let dfd = this.$(`${this.baseUrl()}/count`);
    dfd.done((resp) => {
      this.count = resp.count;
    });

    return dfd;
  }
}

BaseCollection.prototype.$ = $.ajax;
BaseCollection.prototype.apiRoot = config.api_root || config._client.api_root;
BaseCollection.prototype.idAttribute = '_id';
