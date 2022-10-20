import React, { useEffect, useState } from "react";
import { getRegistrationByStaffAndCourseId } from "src/api/registration";

export default function CourseStatusBadge({ staffId, courseId }) {
  const statusToBadgeClass = {
    Completed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Waitlisted: "bg-blue-200 text-blue-800",
    Registered: "bg-yellow-100 text-yellow-800",
    Ongoing: "bg-purple-100 text-purple-800",
    "Not Registered": "bg-gray-100 text-gray-800",
  };

  const [courseStatus, setCourseStatus] = useState("");

  useEffect(() => {
    async function getCourseStatus(staffId, courseId) {
      const registrationData = await getRegistrationByStaffAndCourseId(staffId, courseId);
      if (Object.keys(registrationData).length === 0) {
        setCourseStatus("Not Registered");
      } else {
        setCourseStatus(
          registrationData.completionStatus.length > 0
            ? registrationData.completionStatus.trim()
            : registrationData.regStatus.trim(),
        );
      }
    }

    getCourseStatus(staffId, courseId);
  }, []);

  if (courseStatus === "Completed") {
    return (
      <span
        className={`${statusToBadgeClass[courseStatus]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
      >
        {courseStatus}
      </span>
    );
  }

  return (
    <span
      className={`${statusToBadgeClass[courseStatus]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
    >
      {courseStatus}
    </span>
  );
}
