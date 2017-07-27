import React, {Component} from 'react';
import moment from 'moment';

import {BuyNowButton, AddToCartButton} from '../cart/buttons';
import LoadProduct from './load';
import {values} from './index';
import ProductTabs from './tabs';

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
          <div className="title is-2">{product.name}</div>
          <p className="title is-3 has-text-muted">£{product.cost}</p>
          <hr />
          <p>{product.description}</p>
          <br/>
          <p className="control">
            <BuyNowButton productId={product._id.$oid} preview={preview}/>&nbsp;
            <AddToCartButton productId={product._id.$oid} preview={preview}/>
          </p>
          <br />
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
        </div>
      </div>
    </div>
  </div>
  <div className="section">
      <ProductTabs product={product} />
  </div>
</div>
);

const ProductPage = (props) => {
  var onLoad = (productData) =>
      ProductDetails(productData, props.preview);

  return <LoadProduct productId={props.params.productId}
                      onLoad={onLoad} />;
}

ProductPage.defaultProps = {
  preview: false
}

export default ProductPage;
