import React from "react";

export const users = {
  none: "Login",
  staff: "Staff",
  humanResource: "Human Resource",
  manager: "Manager"
}

export const UserContext = React.createContext({
  user: users.none,
  toggleUser: () => {},
});