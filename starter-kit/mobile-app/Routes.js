import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoadingScreen from './src/screens/loading';
import Home from './src/screens/home';
import Chat from './src/screens/chat';
import SearchResources from './src/screens/resources-search';
import AddResource from './src/screens/resource-add';
import EditResource from './src/screens/resource-edit';
import MyResources from './src/screens/resources-my';
import Map from './src/screens/map';
import Onboarding from './src/screens/onboarding';
import SignIn from './src/screens/signin';
import Signup from './src/screens/signup';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import * as actions from './src/store/actions';

import {HomeIcon, DonateIcon, SearchIcon} from './src/images/svg-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ResourcesStackOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={{
          padding: 10,
        }}
        onPress={() => navigation.navigate('Chat')}>
        <Feather name="message-square" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      );
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    gestureEnabled: false,
    headerStyle: {
      backgroundColor: 'rgb(26, 72, 255)',
    },
  };
};

const DonationsStackOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={{
          padding: 10,
        }}
        onPress={() => navigation.navigate('Add Donation')}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      );
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    gestureEnabled: false,
    headerStyle: {
      backgroundColor: 'rgb(26, 72, 255)',
    },
  };
};

const HomeOptions = ({navigation}) => {
  return {
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: 'rgb(26, 72, 255)',
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      );
    },
  };
};

const tabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  tabStyle: {
    backgroundColor: 'rgb(26, 72, 255)',
    paddingTop: 5,
  },
};

const TabLayout = () => (
  <Tab.Navigator
    style={{paddingTop: 50}}
    initialRouteName="Home"
    tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={HomeStackLayout}
      options={{
        tabBarIcon: ({color}) => <HomeIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Donate"
      component={DonateStackLayout}
      options={{
        tabBarIcon: ({color}) => <DonateIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackLayout}
      options={{
        tabBarIcon: ({color}) => <SearchIcon fill={color} />,
      }}
    />
  </Tab.Navigator>
);

const HomeStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={HomeOptions} />
  </Stack.Navigator>
);

const DonateStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Donations"
      component={MyResources}
      options={DonationsStackOptions}
    />
    <Stack.Screen
      name="Add Donation"
      component={AddResource}
      options={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: 'rgb(26, 72, 255)',
        },
      }}
    />
    <Stack.Screen
      name="Edit Donation"
      component={EditResource}
      options={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: 'rgb(26, 72, 255)',
        },
      }}
    />
  </Stack.Navigator>
);

const SearchStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search Resources"
      component={SearchResources}
      options={ResourcesStackOptions}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: 'rgb(26, 72, 255)',
        },
      }}
    />
    <Stack.Screen
      name="Map"
      component={Map}
      options={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: 'rgb(26, 72, 255)',
        },
      }}
    />
  </Stack.Navigator>
);

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.showSplashLoader();
  }

  render() {
    return (
      <NavigationContainer>
        {this.props.isLoading ? (
          <LoadingScreen />
        ) : (
          <React.Fragment>
            {!this.props.isLoggedIn ? (
              <Stack.Navigator initialRouteName="Onboarding">
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{
                    headerTitle: '',
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    gestureEnabled: false,
                    headerStyle: {
                      backgroundColor: 'rgb(26, 72, 255)',
                    },
                  }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                    headerTitle: '',
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    gestureEnabled: false,
                    headerStyle: {
                      backgroundColor: 'rgb(26, 72, 255)',
                    },
                  }}
                />
              </Stack.Navigator>
            ) : (
              <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                  name="Tabs"
                  component={TabLayout}
                  options={{
                    headerShown: false,
                  }}
                />
              </Drawer.Navigator>
            )}
          </React.Fragment>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.splashLoader.isLoading,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSplashLoader: () => dispatch(actions.splashLoader()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
