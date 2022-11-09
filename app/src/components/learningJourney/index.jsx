import { useUserContext } from "src/contexts/UserContext";
import StaffLearningJourney from "./staff/StaffLearningJourney";

function LearningJourney() {
  const { currentUserId, currentUserType } = useUserContext();

  switch (currentUserType) {
    case "STAFF":
      return <StaffLearningJourney staffId={currentUserId} />;
    case "HR":
      return <p>You are logged in as HR so you see no Learning Journeys</p>;
    case "MANAGER":
      return <p>You are logged in as MANAGER so you see no Learning Journeys</p>;
    default:
      // temporary addition for development, should not render anything without permission
      return <p>Please log in to view any Learning Journeys</p>;

  }
}

export default LearningJourney;
