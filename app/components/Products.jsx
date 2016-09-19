import React from 'react';
import {Link} from 'react-router';

class Products extends React.Component {
  render(){
    return (
      <div>
        <h1>This is Products</h1>
        <Link to="/">Login link</Link>
      </div>
    );
  }
}

export default Products;
