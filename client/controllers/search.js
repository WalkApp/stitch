import React from 'react';
import Controller from '../base/controller';
import SearchView from '../views/search';


export default class UserController extends Controller {
  index (ctx, done) {
    this.renderView(<SearchView />, done);
  }
}
