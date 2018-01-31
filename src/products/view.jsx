import React, {Component} from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';


import {PurchaseButtons} from '../cart/buttons';
import LoadProduct from './load';
import {values, productsGrid} from './index';
import ProductTabs from './tabs';


function displayRelated(product) {
  if (product.related.length)
    return <div className="section">
      <h2 className="subtitle">Related Products</h2>
      {productsGrid(product.related)}
    </div>;

  return <div />
}

const ProductDetails = (product, preview=false) => (
<div>
 <div className="section product-header">
    <div className="container">
      <div className="columns">
        <div className="column">
          <span className="title is-3">{product.name}</span>
          <span className="title is-3 has-text-muted">&nbsp;|&nbsp;</span>
          <span className="title is-4 has-text-muted">{values(product.categories).join(', ')}</span>
        </div>
      </div>
    </div>
  </div>
  <div className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-6">
          <div className="image is-2by2">
            <img src={`${API_URL}${product.images[0]}`} />
          </div>
        </div>
        <div className="column is-5 is-offset-1">
          <div className="title is-2 product-title">{product.name}</div>
          <p className="title is-3 has-text-muted">£{product.cost}</p>
          <hr />
          <p>{product.description}</p>
          <br/>
          <p className="control">
            {product.stock > 0  ?
                <PurchaseButtons productId={product._id.$oid}
                                 preview={preview} /> :
                <b>Out of Stock</b>
            }
        </p>
          {/*<br />
          <table className="table">
            <tbody>
              <tr>
                <td className="has-text-right">
                  <strong>Added</strong>&nbsp;
                </td>
                <td>{moment(product.datetime).fromNow()}</td>
              </tr>
            </tbody>
          </table>
          */}
        </div>
      </div>
    </div>
  </div>
  <div className="section">
      <ProductTabs product={product} />
  </div>
  {displayRelated(product)}
</div>
);

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.params.productId,
      i: 0
    };
  }

  componentWillReceiveProps() {
    if (this.props.params.productId != this.state.productId)
      this.setState({i: this.state.i + 1,
                     productId: this.props.params.productId});
  }


  render() {
      var onLoad = (productData) =>
          ProductDetails(productData, this.props.preview);

      return <LoadProduct productId={this.props.params.productId}
                          onLoad={onLoad}
                          key={this.state.i}/>;
    }
}
ProductPage.defaultProps = {
  preview: false
}

export default withRouter(ProductPage);
