import _ from 'lodash';
import lang from '../lang';


export default function (error) {
  if (_.isString(error)) {
    return lang.errors[error];
  }

  let messages = [];

  for (let key in error) {
    let message = _.capitalize(format(lang.errors[error[key]], key));
    messages.push(message);
  }

  return messages.join('\n');
}