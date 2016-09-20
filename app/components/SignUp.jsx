import React from 'react';
import axios from 'axios';
import {hashHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';
import * as actions from 'app/actions/actions.jsx';
import {connect} from 'react-redux';


class SignUp extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
    snackBarOpen : false,
    snackBarMessage : '',
    fieldValues : {
      firstName : '',
      lastName : '',
      dob : null,
      shopNumber : '',
      street : '',
      pinCode : '',
      city : '',
      stateProvince : '',
      country : '',
      email : '',
      password : ''
    },
    cPassword : '',
    dataSource : ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],
  };


  constructor(){
    super();
    this.handleNext = this.handleNext.bind(this);
  };

  handleNext = () => {
    const {stepIndex, fieldValues, cPassword} = this.state;
    if(stepIndex === 0 && (fieldValues.firstName === '' || fieldValues.lastName === '')){
      return this.setState({
        snackBarOpen : true,
        snackBarMessage : 'Please provide first-name and last-name'
      });
    }
    if(stepIndex === 1 && (fieldValues.shopNumber === '' || fieldValues.street === '' || fieldValues.pinCode === '' || fieldValues.city === '' || fieldValues.stateProvince === '' || fieldValues.country === '')){
      return this.setState({
        snackBarOpen : true,
        snackBarMessage : 'Please provide all the details'
      });
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(stepIndex === 2){
      if(!re.test(fieldValues.email)){
        return this.setState({
          snackBarOpen : true,
          snackBarMessage : 'Please provide a valid email'
        });
      }
      var repassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/;
      if(!repassword.test(fieldValues.password)){
        return this.setState({
          snackBarOpen : true,
          snackBarMessage : 'Please provide a valid password'
        });
      }
      if(fieldValues.password !== cPassword){
        return this.setState({
          snackBarOpen : true,
          snackBarMessage : 'Password doesn\'t match. Try again.'
        });
      }
    }
    var {dispatch} = this.props;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
    if(stepIndex >= 2){
      const email = fieldValues.email;
      const password = fieldValues.password;
      axios.post('/users/signup', {
        user : this.state.fieldValues
      })
      .then((response) => {
        console.log(response);
        if(response.data.message === 'success'){
          axios.post('/users/signin', {
            email : email,
            password : password
          })
          .then((response) => {
            dispatch(actions.signIn(response.data.token, response.data.user));
          }).catch((err) => {
            console.log(err);
          });
        } else {
          console.log('failure');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleFirstName = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, firstName : event.target.value}
    });
  };

  handleLastName = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, lastName : event.target.value}
    });
  };

  handleDOB = (event, value) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, dob : value}
    });
  };

  handleShopNumber = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, shopNumber : event.target.value}
    });
  };

  handleStreet = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, street : event.target.value}
    });
  };

  handlePinCode = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, pinCode : event.target.value}
    });
  };

  handleCity = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, city : event.target.value}
    });
  };

  handleStateProvince = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, stateProvince : event.target.value}
    });
  };

  handleCountry = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, country : event.target.value}
    });
  };

  handleEmail = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, email : event.target.value}
    });
  };

  handlePassword = (event) => {
    this.setState({
      fieldValues : { ...this.state.fieldValues, password : event.target.value}
    });
  };

  handleCPassword = (event) => {
    this.setState({
      cPassword : event.target.value
    });
  };

  getStepContent(stepIndex) {
    const {dataSource} = this.state;
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              value={this.state.fieldValues.firstName}
              onChange={this.handleFirstName.bind(this)}
              hintText="eg. John"
              name="firstName"
              floatingLabelText="First Name"/>
            <br></br>
            <TextField
              value={this.state.fieldValues.lastName}
              onChange={this.handleLastName.bind(this)}
              hintText="eg. White"
              floatingLabelText="Last Name" />
            <br></br>
            <br></br>
            <DatePicker value={this.state.fieldValues.dob} onChange={this.handleDOB.bind(this)} hintText="Date of Birth" mode="landscape" />
            <br></br>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Your business address</p>
            <div className="row">
              <div className="col-xs-6">
                <TextField
                  value={this.state.fieldValues.shopNumber}
                  onChange={this.handleShopNumber.bind(this)}
                  hintText="eg. 221/B"
                  floatingLabelText="Shop number"/>
                <br></br>
              </div>
              <div className="col-xs-6">
                <TextField
                  value={this.state.fieldValues.street}
                  onChange={this.handleStreet.bind(this)}
                  hintText="eg. Baker Street"
                  floatingLabelText="Street" />
                <br></br>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <TextField
                  value={this.state.fieldValues.pinCode}
                  onChange={this.handlePinCode.bind(this)}
                  hintText="eg. 382721"
                  floatingLabelText="Pin Code" />
                <br></br>
              </div>
              <div className="col-xs-6">
              <TextField
                value={this.state.fieldValues.city}
                onChange={this.handleCity.bind(this)}
                hintText="eg. London"
                floatingLabelText="City" />
              <br></br>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <TextField
                  value={this.state.fieldValues.stateProvince}
                  onChange={this.handleStateProvince.bind(this)}
                  hintText="eg. Gujarat"
                  floatingLabelText="State" />
                <br></br>
              </div>
              <div className="col-xs-6">
                <AutoComplete
                  searchText={this.state.fieldValues.country}
                  onNewRequest = {
                    (chosenRequest, index) => {
                      this.setState({
                        fieldValues : {...this.state.fieldValues, country : dataSource[index]}
                      });
                    }
                  }
                  onChange={this.handleCountry.bind(this)}
                  hintText="eg. United Kingdom"
                  dataSource={dataSource}
                  floatingLabelText="Country"
                />
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              value={this.state.fieldValues.email}
              onChange={this.handleEmail.bind(this)}
              hintText="eg. john@white.com"
              floatingLabelText="Email"/>
            <br></br>
            <TextField
              value={this.state.fieldValues.password}
              onChange={this.handlePassword.bind(this)}
              type="password"
              floatingLabelText="Password" />
            <br></br>
            <TextField
              value={this.state.cPassword}
              onChange={this.handleCPassword.bind(this)}
              type="password"
              floatingLabelText="Confirm Password" />
            <br></br>
            <br></br>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  handleRequestClose(reason){
    if(reason === 'timeout'){
      this.setState({
        snackBarOpen : false
      });
    }
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const style = {
      paperStyle : {
        height: 550,
        width: 700,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        position : 'relative',
        marginBottom : -250
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
            <br></br>
            <br></br>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Your information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Business information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Login information</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
              {finished ? (
                <div>
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
                  <div>{this.getStepContent(stepIndex)}</div>
                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary={true}
                      onTouchTap={this.handleNext}
                    />
                  </div>
                  {(stepIndex == 0) ? (
                  <div>
                    <FlatButton
                    label="Already have an account?"
                    href="/#/"
                    style={{marginTop: 40}}
                    primary={true}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                </div>
              )}
            </div>
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

export default connect()(SignUp);
