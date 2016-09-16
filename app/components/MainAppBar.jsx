import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';

class MainAppBar extends React.Component {
  constructor(){
    super();
    this._handleClick = this._handleClick.bind(this);
    this.state = {open:false}
  }

  _handleClick(){
    this.setState({open : !this.state.open})
  }
  render(){
    var styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        top: 0,
        left: 0
      }
    };
    return (
      <div>
          <Drawer
            ref="leftNav"
            docked={false}
            onRequestChange={(open) => this.setState({open})}
            open={this.state.open}
            containerStyle={{'top' : '64px'}}/>
          <AppBar
            title="Title"
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
            style={styles.appBar}
            onLeftIconButtonTouchTap={this._handleClick}
          />
      </div>
    );
  }
}

export default MainAppBar;
