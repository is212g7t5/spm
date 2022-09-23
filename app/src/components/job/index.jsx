import React, { useEffect, useState } from "react";
import axios from "axios";
import JobTile from "./JobTile";

const getJobsApi = "http://localhost:8081/api/v1/job/all";

function Job() {

    const [jobs, setJobs] = useState([]);

    const renderJobList = () => jobs.map((job, index) =>
        <JobTile jobId={job.job_id} jobName={job.job_name} jobDesc={job.job_desc} id={index}/>
    );

    const getJobs = async () => {
        const res = await axios.get(getJobsApi)
        return res
    }

    useEffect(() => {
        const getAllJobs = async() => {
            try {
                const allJobs = await getJobs()
                setJobs(allJobs.data)
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 404) {
                        console.log("No jobs found!")
                    }
                }
            }
        }
        getAllJobs()
    }, [])

    return (
        <div className="flex flex-col container w-11/12 max-w-7xl mt-10 bg-white p-10 mx-auto w-full rounded-lg shadow-lg shadow-blue-200">
            <h1 className="text-3xl text-left font-bold">View All Job Roles</h1>
            {jobs.length === 0 ? "No Jobs Found" : renderJobList()}
        </div>
    );
};

export default Job;
