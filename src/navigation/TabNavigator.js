import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import CustomTabNavigation from '../components/common/CustomTabNavigator';

import Explore from '../containers/explore/Explore';
import SubExplore from '../containers/explore/SubExplore';
import AdvisorProfile from '../containers/explore/AdvisorProfile';
import ReviewAdvisor from '../containers/explore/ReviewAdvisor';

import Rooms from '../containers/chat/Rooms';
import Chat from '../containers/chat/Chat';
import AudioCall from '../containers/chat/AudioCall';

import Profile from '../containers/profile/Profile';
import Settings from '../containers/profile/Settings';
import EditProfile from '../containers/profile/EditProfile';
import EditBio from '../containers/profile/EditBio';
import EditTags from '../containers/profile/EditTags';

const ExploreStack = createStackNavigator({
  ExploreExplore: { screen: Explore },
  ExploreSubExplore: { screen: SubExplore },
  ExploreAdvisorProfile: { screen: AdvisorProfile },
  ExploreReviewAdvisor: { screen: ReviewAdvisor }
}, {
  initialRouteName: 'ExploreExplore',
  headerMode: 'none',
});

// hide tab bar
ExploreStack.navigationOptions = ({ navigation }) => 
  navigation.state.routes[navigation.state.index].routeName === 'ExploreReviewAdvisor'
    ? ({ tabBarVisible: false })
    : null;


const ChatStack = createStackNavigator({
  ChatRooms: { screen: Rooms },
  ChatChat: { screen: Chat },
  ChatAudioCall: { screen: AudioCall }
}, {
  initialRouteName: 'ChatRooms',
  headerMode: 'none'
});

// hide tab bar
ChatStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'ChatChat') return ({ tabBarVisible: false });
  if (routeName === 'ChatAudioCall') return ({ tabBarVisible: false });
  return null;
}


const ProfileStack = createStackNavigator({
  ProfileProfile: { screen: Profile },
  ProfileSettings: { screen: Settings },
  ProfileEditProfile: { screen: EditProfile },
  ProfileEditBio: { screen: EditBio },
  ProfileEditTags: { screen: EditTags }
}, {
  initialRouteName: 'ProfileProfile',
  headerMode: 'none'
});

export default createBottomTabNavigator({
  Explore: ExploreStack,
  Chat: ChatStack,
  Profile: ProfileStack
}, {
  initialRouteName: 'Explore',
  headerMode: 'none',
  tabBarComponent: CustomTabNavigation
});