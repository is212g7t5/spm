import { useState, useEffect } from "react";
import { Switch, Route, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateLearningJourney() {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path} component={FailedLearningJourney} />
        <Route path={`${path}/:jobId`} component={LearningJourneyWithJobId} />
      </Switch>
    </div>
  );
}

function FailedLearningJourney() {
  const history = useHistory();
  useEffect(() => {
    history.push("/jobs");
    toast.error("You have been redirected. Please select a Job Role to create a learning journey");
  }, []);

  return <div>Redirecting...</div>;
}

function LearningJourneyWithJobId() {
  const [selectedJobId, setselectedJobId] = useState(null);
  const { jobId } = useParams();
  const history = useHistory();

  return <div>Hello World</div>;
}
