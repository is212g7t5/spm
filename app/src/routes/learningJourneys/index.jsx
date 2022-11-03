import { Route, Switch } from "react-router-dom";
import LearningJourney from "src/components/learningJourney";
import LearningJourneyDetails from "src/components/learningJourney/details";

export default function LearningJourneys() {
  return (
    <Switch>
      <div className='w-11/12 max-w-7xl mx-auto'>
        <Route exact path={["/", "/learning-journeys"]} component={LearningJourney} />
        <Route exact path='/learning-journeys/:LJId' component={LearningJourneyDetails} />
      </div>
    </Switch>
  );
}
