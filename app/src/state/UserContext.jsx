import React from "react";
import { Route } from 'react-router-dom';

export const users = {
  none: "Login",
  staff: "Staff",
  humanResource: "Human Resource",
  manager: "Manager"
}

export const UserContext = React.createContext({
  user: users.none,
  logout: () => {},
  login: () => {},
});

class UserProvider extends React.Component {
  constructor() {
    super()
    this.state = { user: users.none }
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.setState({ user: users.none })
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          logout: this.logout,
          login: (value) => this.setState({user: users[value]}),
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const UserCheck = ({ user: User, component: Component, default: Default, ...rest }) => (
  <UserContext.Consumer>
    {({ user }) => (
      <Route
        render={
          props =>
            user === User
            ? <Component { ...props }/>
            : <Default { ...props }/>
        }
        {...rest}
      />
    )
    }

  </UserContext.Consumer>
)
export { UserProvider, UserCheck }

