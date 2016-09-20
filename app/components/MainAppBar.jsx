import React from 'react';
import {Link, hashHistory} from 'react-router';
import * as actions from 'app/actions/actions.jsx';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import Home from 'material-ui/svg-icons/action/home';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Group from 'material-ui/svg-icons/social/group';
import BusinessCenter from 'material-ui/svg-icons/places/business-center';
import Settings from 'material-ui/svg-icons/action/settings';
import Feedback from 'material-ui/svg-icons/action/feedback';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import {ListItem} from 'material-ui/List';

class MainAppBar extends React.Component {
  constructor(){
    super();
    this._handleClick = this._handleClick.bind(this);
    this.state = {open:false}
  }

  _handleClick(){
    this.setState({open : !this.state.open})
  }
  handleSignOut(){
    const {dispatch} = this.props;
    localStorage.removeItem('token');
    dispatch(actions.signOut());
  }
  render(){
    var styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        top: 0,
        left: 0
      },
      containerStyle : {
        'marginTop' : '64px'
      },
      paper : {
        display: 'inline-block',
        float: 'left',
        lineHeight : '50px'
      }
    };
    return (
      <div>
          <Drawer
            ref="leftNav"
            docked={false}
            onRequestChange={(open) => this.setState({open})}
            open={this.state.open}
            containerStyle={{'top' : '64px'}}>
            <Menu desktop={true}>
              <ListItem primaryText="Home" href="/#/dashboard" leftIcon={<Home />} onTouchTap={this._handleClick}></ListItem>
              <ListItem primaryText="Products" href="/#/dashboard/products" leftIcon={<ViewList />} onTouchTap={this._handleClick}></ListItem>
              <ListItem primaryText="Customers" leftIcon={<Group />} onTouchTap={this._handleClick}></ListItem>
              <Divider></Divider>
              <ListItem primaryText="Manage Business" leftIcon={<BusinessCenter />} onTouchTap={this._handleClick}></ListItem>
              <ListItem primaryText="Settings" leftIcon={<Settings />} onTouchTap={this._handleClick}></ListItem>
              <Divider></Divider>
              <ListItem primaryText="Help & Feedback" leftIcon={<Feedback />} onTouchTap={this._handleClick}></ListItem>
              <ListItem primaryText="Sign out" onTouchTap={this.handleSignOut.bind(this)} leftIcon={<PowerSettingsNew />}></ListItem>
            </Menu>
          </Drawer>
          <AppBar
            title="RetailX"
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut.bind(this)}/>
              </IconMenu>
            }
            style={styles.appBar}
            onLeftIconButtonTouchTap={this._handleClick}
          />
      </div>
    );
  }
}

export default connect()(MainAppBar);
