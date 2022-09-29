import React from "react";
import LearningJourneyTile from "./LearningJourneyTile";

function LearningJourney() {
  const LearningJourneyData = [
    {
      learningId: 1,
      jobName: "Visual Designer",
      jobDesc: "Designing visual elements that users see and interact with in order to create a good user experience.",
      isJobActive: true
    },
    {
      learningId: 2,
      jobName: "Software Engineer",
      jobDesc: "Designing, developing, and testing software that runs on a computer or mobile device.",
      isJobActive: true
    },
    {
      learningId: 3,
      jobName: "Accountant",
      jobDesc: "Accountants are responsible for preparing and examining financial records.",
      isJobActive: false
    },
    {
      learningId: 4,
      jobName: "Data Scientist",
      jobDesc: "Data scientists are responsible for collecting, analyzing, and interpreting large amounts of data.",
      isJobActive: true
    }
  ];

  const learningJourneyList = LearningJourneyData.map((learningJourney, index) => (
    <LearningJourneyTile 
      key={index}
      learningId={learningJourney.learningId}
      jobName={learningJourney.jobName}
      jobDesc={learningJourney.jobDesc}
      isJobActive={learningJourney.isJobActive}
    />
  ));

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>My Learning Journeys</h1>
      {learningJourneyList}
    </div>
  );
}

export default LearningJourney;
