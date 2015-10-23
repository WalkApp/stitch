import React from 'react';
import Component from '../../base/component';


export default class LoadMore extends Component {
  constructor (props) {
    super(props);
    this.Collection = props.Collection;
  }

  loadMore () {
    let collection = new this.Collection(null, null, this.props.data);
    collection.pagination.page += 1;

    let dfd = collection.fetch();
    dfd.then(() => {
      this.trigger('load', collection.toJSON());
    });
  }

  render () {
    return <div>
      {this.props.data.canLoadMore
        ? <button className="m-btn m-btn-load-more" onClick={this.loadMore.bind(this)}>
            {this.lang.captions.load_more}
          </button>
        : false
      }
    </div>;
  }
}
