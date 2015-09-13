import _ from 'lodash';
import fs from 'fs';
import deepExtend from 'underscore-deep-extend';
import { contains } from 'libs/utils';


_.mixin({ deepExtend: deepExtend(_) });

const nodeEnv = process.env.NODE_ENV || 'development';

let readConfigs = function (path = '') {
  const envConfPath = `${__dirname}/${path}${nodeEnv}.js`;
  const localConfPath = `${__dirname}/${path}local.js`;
  const confs = [require(`${__dirname}/${path}default.js`)];

  if (fs.existsSync(envConfPath)) {
    confs.push(require(envConfPath));
  }

  if (fs.existsSync(localConfPath)) {
    confs.push(require(localConfPath));
  }

  return confs;
};

let defaults = {
  env: nodeEnv,
  debug: !contains(['staging', 'production'], nodeEnv),
};

let config = _.deepExtend(defaults, ...readConfigs());
config._client = _.deepExtend(...readConfigs('client/'));

export default config;
