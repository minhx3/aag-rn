import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import { View } from 'native-base';

import TabNavigator from '../../../navigation/TabNavigator';
import ReviewInternalNotification from '../ReviewInternalNotification';

import { initSocket } from '../../../redux/ducks/chat/rooms';
import { fetchProfile } from '../../../redux/ducks/profile/profile';
import { openNotification } from '../../../redux/ducks/common/review';


class Main extends Component {
  componentWillMount() {
    this.props.initSocket();
    this.props.fetchProfile();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    OneSignal.addEventListener('opened', (notify) => console.log(notify));
    OneSignal.addEventListener('received', (notify) => this.onReceiveReviewNotification(notify));
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
  }

  onBackPress = () => {
    const { nav } = this.props;
    this.props.navigation.dispatch(NavigationActions.back());
    return nav !== this.props.nav;
  }

  onReceiveReviewNotification = (notification) => {
    const review = notification 
      && notification.payload 
      && notification.payload.additionalData 
      && notification.payload.additionalData.review 
      || null;

    if (review) {
      const { 
        payload: {
          additionalData: {
            userId: id,
            userPicture: picture,
            userName: name
          }
        }
      } = notification;

      this.props.openNotification({ id, picture, name });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ExploreReviewAdvisor')}><Text>OPEN FEEDBACK VIEW</Text></TouchableOpacity>
        <TabNavigator navigation={this.props.navigation}/>
        <ReviewInternalNotification/>
      </View>
    );
  }
}

Main.router = TabNavigator.router;

export default connect(
  (state) => ({
    nav: state.nav
  }),
  {
    initSocket,
    fetchProfile,
    openNotification
  }
)(withNavigation(Main));