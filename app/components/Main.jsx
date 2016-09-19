import React from 'react';
import {connect} from 'react-redux';
import MainAppBar from 'app/components/MainAppBar.jsx';

require('style!css!flexboxgrid/dist/flexboxgrid.min.css');

class Main extends React.Component {
  render(){
    var {auth} = this.props;
    var styles = {
      containerStyle : {
        marginTop : '64px'
      }
    };
    return (
      <div>
        <MainAppBar />
        <div className="container" style={styles.containerStyle}>
          <h1>{this.props.children}</h1>
        </div>
      </div>
    );
  }
}

module.exports = Main;

export default connect(
  (state) => {
    return {
      auth : state.auth
    };
  }
)(Main)
