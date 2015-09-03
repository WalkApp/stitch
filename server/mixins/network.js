import _ from 'lodash';
import request from 'request';
import Q from 'q';
import { contains } from 'libs/utils';


var METHOD_MAP = {
  create: 'POST',
  update: 'PUT',
  patch:  'PATCH',
  delete: 'DELETE',
  read:   'GET'
},

network = {
  request: function (options, callback) {
    if (!options.url) {
      throw new Error('Provide URL via options');
    }

    options = _.assign({ headers: 'User-Agent' }, options);
    request(options, (err, res, body) => {
      var
        resource, error,
        status = _.result(res, 'statusCode') || 0,
        headers =  _.result(res, 'headers');

      if (err || status !== 200) {
        error = { status: status, message: `Couldn't fetch resource: ${status}@${options.url}` };
        callback.call(this, error, null, headers);
        return;
      } else {
        try {
          resource = JSON.parse(body);
        } catch (_error) {

        }

        if (resource) {
          callback.call(this, null, resource, headers);
          return;
        }
      }

      error = { status: status, message: `Couldn't parse API response: ${status}@${options.url}` };
      callback.call(this, error, null, headers);
    });
  },

  sync: function (method, model, params = {}) {
    var
      xhr,
      dfd = Q.defer(),
      xhr = null,
      data = params.data || params.attrs || {},
      options = {
        headers: {},
        method: METHOD_MAP[method],
        dataType: 'json',
        url: params.url || _.result(model, 'url'),
      };

    if (params.headers) {
      options.headers = params.headers;
    }

    if (model.requestHeaders) {
      _.assign(options.headers, model.requestHeaders);
    }

    if (contains(['create', 'update', 'patch'], method)) {
      options.body = _.assign(model.toJSON(params), data);
    } else if (!_.isEmpty(data)) {
      options.qs = data;
    }

    xhr = network.request.call(this, options, (error, resource, headers) => {
      var statusText = error ? 'error' : 'success';

      if (params.complete) {
        params.complete(xhr, statusText, error);
      }

      if (error) {
        dfd.reject(error);

        if (params.error) {
          params.error(xhr, statusText, error);
        }
      } else {
        this._resource = resource;
        this._headers = headers;

        dfd.resolve(resource);

        if (params.success) {
          params.success(resource, statusText, xhr);
        }
      }
    });

    model.trigger('request', model, xhr, params);
    return dfd.promise;
  }
};

export default network;
