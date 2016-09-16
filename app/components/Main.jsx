import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import MainAppBar from 'app/components/MainAppBar.jsx';

require('style!css!flexboxgrid/dist/flexboxgrid.min.css');

class Main extends React.Component {
  render(){
    return (
      <MuiThemeProvider>
        <MainAppBar />
      </MuiThemeProvider>
    );
  }
}

module.exports = Main;
