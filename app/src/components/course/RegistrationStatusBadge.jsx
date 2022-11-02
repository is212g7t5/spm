import React, { useEffect, useState } from "react";
import { getRegistrationByStaffAndCourseId } from "src/api/registration";

export default function RegistrationStatusBadge({ staffId, courseId }) {
  const statusToBadgeClass = {
    Completed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Waitlisted: "bg-blue-200 text-blue-800",
    Registered: "bg-yellow-100 text-yellow-800",
    Ongoing: "bg-purple-100 text-purple-800",
    "Not Registered": "bg-gray-100 text-gray-800",
  };

  const [courseStatus, setRegistrationStatus] = useState("");

  useEffect(() => {
    async function getRegistrationStatus(staffId, courseId) {
      const registrationData = await getRegistrationByStaffAndCourseId(staffId, courseId);
      if (Object.keys(registrationData).length === 0) {
        setRegistrationStatus("Not Registered");
      } else {
        setRegistrationStatus(
          registrationData.completionStatus.length > 0
            ? registrationData.completionStatus.trim()
            : registrationData.regStatus.trim(),
        );
      }
    }

    getRegistrationStatus(staffId, courseId);
  }, []);

  return (
    <span
      className={`${statusToBadgeClass[courseStatus]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
    >
      {courseStatus}
    </span>
  );
}
