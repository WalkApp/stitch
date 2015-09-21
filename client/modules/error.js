import _ from 'lodash';
import env from 'libs/env';
import langs from 'config/langs';
import {format} from '../../libs/utils';


export default function (error) {
  if (_.isString(error)) {
    return langs.errorMessage(env.get('lang'), error);
  }

  let messages = [];

  for (let key in error) {
    let message = _.capitalize(format(angs.errorMessage(env.get('lang'), error), key));
    messages.push(message);
  }

  return messages.join('\n');
}
