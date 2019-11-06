import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React, {useState, useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import { navigation } from './app-navigation';
import routes from './app-routes';
import './App.scss';
import './dx-styles.scss';
import { Footer, LoginForm } from './components';
import {
  SideNavOuterToolbar as SideNavBarLayout,
  SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';
import { AuthContext } from "./context/auth";


const AuthPage = (props) => (
  <SideNavBarLayout menuItems={navigation} title={appInfo.title} {...props}>
    <Switch>
      {routes.map(item => (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        />
      ))}
      <Redirect to={'/home'} />
    </Switch>
    <Footer>
      Copyright © 2011-2019 Developer Express Inc.
      <br />
      All trademarks or registered trademarks are property of their
      respective owners.
    </Footer>
  </SideNavBarLayout>
);

function App(props){

    const [authTokens, setAuthTokens] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [screenSizeClass, setScreenSizeClass] = useState(getScreenSizeClass());

    const setTokens = (data) => {
        //localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    function getScreenSizeClass() {
        const screenSizes = sizes();
        return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
    }

    useEffect(() => {
        function screenSizeChanged() {
            setScreenSizeClass(getScreenSizeClass())
        }
        subscribe(screenSizeChanged);
        return () => {
            unsubscribe(screenSizeChanged);
        };
    });

    

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <div className={`app ${screenSizeClass}`}>
                <Router>{loggedIn ? <AuthPage setLoggedIn={setLoggedIn}/> :
                    <SingleCard>
                        <Route render={() => <LoginForm setLoggedIn={setLoggedIn} />} />
                    </SingleCard>
                }</Router>
                </div>
        </AuthContext.Provider>
    );

}

export default App;
