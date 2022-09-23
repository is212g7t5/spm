import React from "react";

export default function CourseStatusBadge({ status }) {
  return (
    <span
      className={`${
        status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      } text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
    >
      {status}
    </span>
  );
}
