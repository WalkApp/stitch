import _ from 'lodash';
import querystring from 'querystring';


export default {
  getParams () {
    return querystring.parse(window.location.search.slice(1)) || {};
  },

  buildUrl (url, params) {
    let query = querystring.stringify(params);

    if (query.length) {
      url += `?${query}`;
    }

    return url;
  },

  overrideUrl (params) {
    let url = window.location.pathname;

    params = _.assign(getParams(), params);

    for (let key in params) {
      if (params[key] == null || !params[key].length) {
        delete params[key];
      }
    }

    let query = querystring.stringify(params);

    if (query.length) {
      url += `?${query}`;
    }

    return url;
  },
};
