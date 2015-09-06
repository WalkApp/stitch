import ViewController from '../base/view_controller';


export default class SearchController extends ViewController {
  search (req, res) {
    this.renderView(req, res, 'search');
  }

  router () {
    this.get('/search', this.search);
  }
}

SearchController.prototype.logPrefix = 'search-controller';
