import React from 'react';
import Controller from '../base/controller';
import User from '../views/user';


export default class UserController extends Controller {
  index (ctx, done) {
    this.renderView(<User />, done);
  }
}
