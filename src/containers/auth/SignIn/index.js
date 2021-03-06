import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import OneSignal from 'react-native-onesignal';

import { signIn } from '../../../redux/ducks/auth/auth';

import s from './styles';

const logo = require('../../../assets/images/logo/logoWhite.png');

class SignIn extends Component {
  state = {
    playerId: ''
  }

  componentWillMount() {
    OneSignal.addEventListener('ids', ({ userId }) => this.setState({ playerId: userId }));
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids');
  }

  render() {
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.loginView}>
          <Image style={s.logo} source={logo}/>

          <View style={s.buttons}>
            <Button block onPress={() => this.props.signIn({
              playerId: this.state.playerId
            })}>
              <Text>Sign in with Facebook</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {
    signIn
  }
)(SignIn);
