import React from 'react';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'app/actions/actions.jsx';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Login extends React.Component {
  state = {
    email : '',
    password : ''
  };
  handleSignIn(){
    const {dispatch} = this.props;
    axios.post('/users/signin', {
      email : this.state.email,
      password : this.state.password
    })
    .then((response) => {
      dispatch(actions.signIn('123', '234'));
    }).catch((err) => {
      console.log('here in err');
      console.log(err);
    });
  }
  handleEmail(event){
    this.setState({
      email : event.target.value
    });
  }
  handlePassword(event){
    this.setState({
      password : event.target.value
    });
  }
  render(){
    const style = {
      paperStyle : {
        height: 400,
        width: 400,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        marginBottom : -125
      },
      upperRow : {
        height : '50vh',
        backgroundColor : '#448AFF',
      },
      lowerRow : {
        height : '50vh',
        backgroundColor : '#FFFFFF',
      },
      containerStyle : {
        height : '100vh'
      },
      buttonStyle : {
        marginTop : 20
      }
    };
    return (
      <div className="container-fluid" style={style.containerStyle}>
        <div className="row center-xs bottom-xs" style={style.upperRow}>
          <Paper style={style.paperStyle} zDepth={3} rounded={false}>
            <br></br>
            <div><h2>Sign in</h2></div>
            <TextField
              hintText="eg. john@example.com"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
              floatingLabelText="Email"/>
              <TextField
                onChange={this.handlePassword.bind(this)}
                floatingLabelText="Password"
                value={this.state.password}
                type="password"
              /><br></br>
            <br></br>
            <RaisedButton label="Sign in" primary={true} style={style.buttonStyle} onTouchTap={this.handleSignIn.bind(this)}/>
            <br></br>
            <br></br>
            <FlatButton label="Don't have an account?" href="/#/signup" primary={true} />
          </Paper>
        </div>
        <div className="row center-xs bottom-xs" style={style.lowerRow}>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
