import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

export default function RolesPage() {

    const [roles, setRoles] = useState()

    return (
        <>
            <SearchBar title="Search Roles" searchBarPlaceholder="Search by job, title, skills..." />
            <div>
                <h1 className="text-2xl font-semibold pl-8 pt-9">View All Roles</h1>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-8 mt-4 shadow-2xl">
                    <ul>
                        <li className="border-b border-b-cyan-700 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div>
                                <text className="text-base font-medium leading-6 text-gray-900">Role Name</text>
                                <p className="mt-1 max-w-2xl text-sm font-medium text-gray-500">Department</p>
                            </div>
                            <button type="button"
                                className="sm:col-span-1 sm:mt-0 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                <span>Create Learning Journey</span>
                            </button>

                        </li>
                        <li className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Algorithm Engineer</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Engineering</dd>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    )
}