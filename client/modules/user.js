import Model from '../base/model';
import vent from './vent';


class User extends Model {
  signin (data) {
    var dfd = this.$({
      url: `${this.apiRoot}/auth`,
      type: 'post',
      data: data
    });

    dfd.done((resp) => {
      vent.trigger('user:signin');
    });

    return dfd;
  }
}

export default new User();
