import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddCourseButton() {
    return (
        <button type="button" className="inline-flex items-center place-content-center outline-gray-400 outline-dashed outline-2 outline-offset-0 max-w-xs max-h-32 bg-transparent rounded-lg shadow-md hover:underline underline-offset-2 decoration-gray-400">
            <PlusIcon className="h-6 w-6 text-black" />
            <span className="text-black">Add Course</span>
        </button>
    )
}
