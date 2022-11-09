import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStaffContext } from "src/contexts/StaffContext";
import { getJobById } from "src/api/jobs";
import { getLearningJourneysByStaffId } from "src/api/learningJourney";
import LearningJourneyTile from "../LearningJourneyTile";
import LJDeletionPopUp from "../details/LJDeletionPopUp";

function StaffLearningJourney({ staffId }) {
  const { learningJourneys, setLearningJourneys } = useStaffContext();
  
  const [selectedLJ, setSelectedLJ] = useState(null);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [isDeletionButtonClicked, setIsDeletionButtonClicked] = useState(false);

  const onDeletionModalOpen = () => {
    setIsDeletionModalOpen(!isDeletionModalOpen);
  };

  const onDeletionButtonClick = () => {
    setIsDeletionButtonClicked(!isDeletionButtonClicked);
  };

  useEffect(() => {
    let result;
    const jobsPromise = [];
    getAllLearningJourneysAndDetails();

    async function getAllLearningJourneysAndDetails() {
      if (!staffId) {
        toast.warning("No User Logged in yet");
        return;
      }

      const learningJourneysReturnedFromBackend = await getLearningJourneysByStaffId(staffId);
      for (let i = 0; i < learningJourneysReturnedFromBackend.length; i += 1) {
        jobsPromise.push(getJobById(learningJourneysReturnedFromBackend[i].jobId));
      }

      result = await Promise.all(jobsPromise);
      for (let i = 0; i < jobsPromise.length; i += 1) {
        learningJourneysReturnedFromBackend[i].jobName = result[i].jobName;
        learningJourneysReturnedFromBackend[i].jobDesc = result[i].jobDesc;
        learningJourneysReturnedFromBackend[i].isJobActive = result[i].isActive;
      }

      setLearningJourneys(learningJourneysReturnedFromBackend);
    }
  }, [staffId]);

  const renderLearningJourneys = learningJourneys.map(
    ({ LJId, jobName, jobDesc, isJobActive, imgUrl }, index) => (
      <LearningJourneyTile
        key={index}
        LJId={LJId}
        jobName={jobName}
        jobDesc={jobDesc}
        isJobActive={isJobActive}
        setSelectedLJ={setSelectedLJ}
        onDeletionModalOpen={onDeletionModalOpen}
        LJImgUrl="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
      />
    ),
  );

  return (
    <div className='flex flex-col container mt-10 p-10 mx-auto w-full w-full bg-white rounded-lg shadow-lg'>
      <h1 className='mb-5 text-3xl text-left font-bold'>My Learning Journeys</h1>
      <div className='flex grid lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {learningJourneys.length === 0 ? "No Learning Journeys Found" : renderLearningJourneys}
      </div>

      <LJDeletionPopUp
        isDeletionModalOpen={isDeletionModalOpen}
        setIsDeletionModalOpen={setIsDeletionModalOpen}
        LJId={selectedLJ}
        onDeletionButtonClick={onDeletionButtonClick}
      />
    </div>
  );
}

export default StaffLearningJourney;
