import ViewController from '../base/view_controller';


export default class SearchController extends ViewController {
  constructor () {
    super();
    this.logPrefix = 'search-controller';
  }

  search (req, res) {
    this.renderEmptyView(req, res, 'search');
  }

  router () {
    this.get('/search', this.search);
  }
}
