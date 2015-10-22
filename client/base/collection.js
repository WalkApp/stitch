import _ from 'lodash';
import $ from 'jquery';
import { Collection } from 'backbone';
import config from 'config';
import urlQuery from 'libs/url_query';


export default class BaseCollection extends Collection {
  constructor (models, opts, data = {}) {
    super(models, opts);
    this.pagination = this.paginationDefault();

    if (data.filterModel) this.filterModel = data.filterModel;
    if (data.params) this.params = data.params;
    if (data.order) this.order = data.order;
    if (data.pagination) _.assign(this.pagination, data.pagination);
  }

  paginationDefault () {
    return {
      page: 1,
      perPage: 20,
    };
  }

  baseUrl () {
    return `${this.apiRoot}${_.result(this, 'urlPath')}`;
  }

  url () {
    let url = this.baseUrl();
    let params = {
      page: this.pagination.page,
      per_page: this.pagination.perPage,
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
    this.pagination.total = resp.total;
    this.pagination.totalPages = Math.ceil(this.pagination.total / this.pagination.perPage);

    return resp.collection;
  }

  canLoadMore () {
    return this.pagination.page < this.pagination.totalPages;
  }

  toJSON () {
    let pagination = this.pagination;
    let filterModel = this.filterModel;
    let params = this.params;
    let order = this.order;
    let canLoadMore = this.canLoadMore();
    let items = super.toJSON();

    return { items, canLoadMore, pagination, filterModel, params, order };
  }

  fetchCount () {
    let dfd = this.$(`${this.baseUrl()}/count`);
    dfd.then((resp) => {
      this.count = resp.count;
    });

    return dfd;
  }
}

BaseCollection.prototype.$ = $.ajax;
BaseCollection.prototype.apiRoot = config.api_root || config._client.api_root;
BaseCollection.prototype.idAttribute = '_id';
