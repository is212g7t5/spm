import { Route, Switch } from "react-router-dom";
import LearningJourney from "src/components/learningJourney";
import LearningJourneyDetails from "src/components/learningJourney/details";

export default function LearningJourneys() {
  return (
    <Switch>
      <Route exact path={["/", "/learning-journeys"]} component={LearningJourney} />
      <Route exact path='/learning-journeys/:LJId' component={LearningJourneyDetails} />
    </Switch>
  );
}
