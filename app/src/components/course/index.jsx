import React, { useContext } from "react";
import { users, UserContext } from "../user/UserContext";
import StaffCourse from "./staff/StaffCourse";

function Course() {
  const [user, setUser] = useContext(UserContext);

  switch (user || "login") {
    case users.staff.name:
      return <StaffCourse/>;
    case users.hr.name:
      return <div/>;
    case users.manager.name:
      return <div/>;
    default:
      // temporary addition for development, should not render anything without permission
      return <StaffCourse/>; 
  }
}

export default Course;
