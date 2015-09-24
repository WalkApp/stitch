import _ from 'lodash';
import $ from 'jquery';
import { Collection } from 'backbone';
import config from 'config';
import urlQuery from 'libs/url_query';


export default class BaseCollection extends Collection {
  constructor (models, opts = {}) {
    super(models, opts);
    this.pagination = this.paginationDefault();

    if (opts.filter) this.filter = opts.filter;
    if (opts.pagination) _.assign(this.pagination, opts.pagination);
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
    let filter = this.filter;
    let canLoadMore = this.canLoadMore();
    let items = super.toJSON();

    return { items, canLoadMore, pagination, filter };
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
