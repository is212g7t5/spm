import React from "react";

export default function CourseStatusBadge({registrationStatus, completionStatus}) {
  const statusToBadgeClass = {
    "Completed": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800", 
    "Waitlisted": "bg-blue-200 text-blue-800",
    "Registered": "bg-yellow-100 text-yellow-800",
    "Not Registered": "bg-purple-100 text-purple-800"
  };

  if (completionStatus === "Completed") {
    return (
      <span className={`${statusToBadgeClass[completionStatus]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}>
        {completionStatus}
      </span>
    );
  }

  return (
    <span className={`${statusToBadgeClass[registrationStatus]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}>{registrationStatus}</span>
  );
}
