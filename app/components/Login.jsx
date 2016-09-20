import React from 'react';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'app/actions/actions.jsx';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';

class Login extends React.Component {
  state = {
    email : '',
    password : '',
    finished : false,
    snackBarOpen : false,
    snackBarMessage : ''
  };
  handleSignIn(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.state.email)){
       return this.setState({
        snackBarOpen : true,
        snackBarMessage : 'Please provide a valid email'
      });
    }
    if(this.state.password === ''){
      return this.setState({
        snackBarOpen : true,
        snackBarMessage : 'Please provide password'
      })
    }
    this.setState({
      finished : true
    });
    const {dispatch} = this.props;
    axios.post('/users/signin', {
      email : this.state.email,
      password : this.state.password
    })
    .then((response) => {
      if(response.data.message === 'success'){
        localStorage.setItem('token', response.data.token);
        dispatch(actions.signIn(response.data.token, response.data.user));
        hashHistory.push('/dashboard');
      }else {
        this.setState({
          finished : false,
          snackBarOpen : true,
          snackBarMessage : 'Invalid email or password'
        });
      }
    }).catch((err) => {
      this.setState({
        finished : false,
        snackBarOpen : true,
        snackBarMessage : 'Some error has occured, We are sorry.'
      });
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
  handleRequestClose(reason){
    if(reason === 'timeout'){
      this.setState({
        snackBarOpen : false
      });
    }
  }
  render(){
    const {finished} = this.state;
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
      },
      refresh: {
        display: 'inline-block',
        position: 'relative'
      }
    };
    return (
      <div className="container-fluid" style={style.containerStyle}>
        <div className="row center-xs bottom-xs" style={style.upperRow}>
          <Paper style={style.paperStyle} zDepth={3} rounded={false}>
            {finished ? (
              <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <RefreshIndicator
                  size={50}
                  left={0}
                  top={20}
                  loadingColor={"#FF9800"}
                  status="loading"
                  style={style.refresh}
                />
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </Paper>
        </div>
        <div className="row center-xs bottom-xs" style={style.lowerRow}>
        </div>
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.state.snackBarMessage}
          onRequestClose={this.handleRequestClose.bind(this)}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default connect()(Login);
