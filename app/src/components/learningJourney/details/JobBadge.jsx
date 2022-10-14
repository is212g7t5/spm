import React from "react";

export default function JobBadge({ jobName, isActive }) {
    return (
        <div className={`py-2 max-h-44 ${isActive ? "bg-primary" : "bg-gray-100"} text-white rounded-lg shadow-md text-base text-center overflow-hidden text-ellipsis font-semibold`}>
            {jobName}
        </div>
    )
}
