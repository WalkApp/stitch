import React from 'react';
import Controller from '../base/controller';
import Welcome from '../views/welcome';
import Signin from '../views/signin';
import Signup from '../views/signup';


export default class WelcomeController extends Controller {
  index (ctx, done) {
    this.renderView(<Welcome />, done);
  }

  signin (ctx, done) {
    this.renderView(<Signin />, done);
  }

  signup (ctx, done) {
    this.renderView(<Signup />, done);
  }
}
