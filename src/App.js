import React from "react";
import { Switch, Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";
import LoginContainer from "./container/logincontainer";
import SignupContainer from "./container/signupcontainer";
import MarketplaceContainer from "./container/marketplacecontainer";
import ProfileContainer from "./container/profilecontainer";

class App extends React.Component {
  state = {
    activeUser: null,
    userType: "",
  };

  setActiveUser = (profileCreds, profileType) => {
    this.setState(() => ({
      activeUser: profileCreds,
      userType: profileType,
    }));
  };

  render() {
    return (
      <div>
        <h1>Welcome to the DealMaker Marketplace</h1>
        <NavLink to="/login">
          <button>Log-in</button>
          <br></br>
        </NavLink>
        <NavLink to="/signup">
          <button>Sign-up</button>
          <br></br>
        </NavLink>
        <NavLink to="/marketplace">
          <button>Marketplace</button>
          <br></br>
        </NavLink>
        <NavLink to="/profile">
          <button>My Profile</button>
          <br></br>
        </NavLink>
        <Switch>
          <Route
            path="/login"
            render={() => <LoginContainer setActiveUser={this.setActiveUser} />}
          />
          <Route
            path="/signup"
            render={() => (
              <SignupContainer setActiveUser={this.setActiveUser} />
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <ProfileContainer
                userData={this.state}
                setActiveUser={this.setActiveUser}
              />
            )}
          />
          <Route
            path="/marketplace"
            render={() => (
              <MarketplaceContainer
                userData={this.state}
                setActiveUser={this.setActiveUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
