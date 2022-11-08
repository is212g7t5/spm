<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Learning Journey Planning System (SPM Project)</h3>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
      <ul>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#backend">Backend</a></li>
        <li><a href="#database">Database</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#continuous-integration">Continuous Integration</a></li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#access-control">Access Control</a></li>
            <li><a href="#staff-features">Staff Features</a></li>
            <li><a href="#hr-features">HR Features</a></li>
            <li><a href="#manager-features">Manager Features</a></li>
        </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This Learning Journey Planning System aims to allow All-In-One staff to set their learning goal for a position that they are working towards to. Currently, the project is targetted for the first release, which would encompass 5 core features.

- Users should be able to select a role they want and see a list of skills required
- Users should be able to see the courses they can take to acquire those skills, and add/remove them on their learning journey
- CRUD for roles
- CRUD for skills
- Assigning skills to roles; assigning skills to courses

Find the project live at:

- [Web Application](https://spm-g7t5.netlify.app/)
- [Backend Documentation](http://spm-g7t5-api-prod.herokuapp.com/docs)

Due to the deployment location of the services in the US, access in other regions might face delays. This latency optimization will be resolved in subsequent releases.

<p align="right">(<a href="#top">back to top</a>)</p>


## Built With

This project was built with 3 main components, namely `Frontend`, `Backend` and `Database`. For more details, refer to our [C4 diagram](https://lucid.app/lucidchart/917160f4-24f3-4fdb-9611-b897c1b35953/edit?viewport_loc=3951%2C1158%2C5833%2C2991%2C0_0&invitationId=inv_c7e02413-c4ff-48ea-aa1c-51ffd59156fc)
### Frontend

Found in the folder `/app`. Built with:

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
### Backend

Found in the folder `/backend`. Built with:

- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

### Database

Production database is a hosted MySQL AWS RDS instance. Database versioning is handled by [Alembic](https://pypi.org/project/alembic/) that is incorporated in our backend.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

We've compiled detailed setup guides for both the `Frontend` and `Backend` components.

- [Frontend README](https://github.com/is212g7t5/spm/blob/master/app/README.md)
- [Backend README](https://github.com/is212g7t5/spm/blob/master/backend/README.md)

For the database set up, refer to the [Backend README](https://github.com/is212g7t5/spm/blob/master/backend/README.md) to insert compatible MySQL 8.0 server credentials.

<p align="right">(<a href="#top">back to top</a>)</p>

## Continuous Integration

Continuous Integration is enabled for this repository via GitHub Actions, with each PR automatically triggering relevant CI pipelines. Deployment is handled by periodic manual redeploys.

Refer to the relevant CI pipeline scripts in `/.github/workflows`.

- [Frontend PRs](https://github.com/is212g7t5/spm/blob/master/.github/workflows/node.js.yml)
- [Backend PRs](https://github.com/is212g7t5/spm/blob/master/.github/workflows/python-app.yml)

<!-- USAGE EXAMPLES -->
## Usage

### Access Control

Access control is currently being segmented into 4 possible states (`Not logged in`, `Staff`, `HR` amd `Manager`). Use the dropdown menu in the top-right corner of the navbar to toggle between the 4 states.
<img src="assets/access_control_toggle.png" alt="Access Control Toggle" />

Selecting one of the four possible states simulates the access control permissions of the particular state. Each of these states are also pegged to a specific user (specified by `id`) and the default can be changed in `/app/src/contexts/UserContext.jsx`, as defined in the `USER_TYPES` const.

Alternatively, the states can be changed through the session storage of the web browser followed by a web browser refresh. For example, the `userId` and `user` can be changed as seen below.
<img src="assets/session_storage.png" alt="Session Storage" />

By extension, this means that users with multiple roles, should log in as each of their role in order to access that role's features.

> For e.g., a HR user should log in as a `Staff` to view their learning journey planning, but log in as a `HR` to edit the jobs available.

This design choice was made to facilitate a cleaner user interface (not having both "user" and "admin" related permissions in the same location), which will ultimately be supported by a role-separated login page in subsequent releases.

### Staff Features

Logging in as a Staff allows us to access learning journey planning features.

#### Learning Journey

By default, the main page (https://spm-g7t5.netlify.app/) leads us to the overview of a Staff's learning journeys.

<img src="assets/staff/learning_journey.png" alt="Staff Learning Journey" />

Clicking into the menu button unique to each learning journey allows us to view more details or delete a learning journey.

<img src="assets/staff/learning_journey_menu.png" alt="Staff Learning Journey Menu" />

##### Learning Journey Details

Clicking on `view` leads us to the specific details of a particular learning journey.

<img src="assets/staff/learning_journey_detail.png" alt="Staff Learning Journey Detail" />

Within this view, we're able to see the current courses planned for a learning journey, which includes the course status and skills of each of the courses. On the right, we're able to see the target job role of the learning journey, as well as its respective skills.

Clicking on `Edit Learning Journey` allows us to add/remove courses to the learning journey.

<img src="assets/staff/edit_learning_journey.png" alt="Staff Edit Learning Journey" />

Selecting a skill brings up a menu of its respective courses, which can then be added to the current learning journey.

<img src="assets/staff/learning_journey_skill_course.png" alt="Staff Learning Journey Skill Course" />

Alternatively, clicking the cross on existing courses at the bottom removes the course from the learning journey. Do note that there is a minimum of 1 course in each learning journey.

Finally, selecting `Update Learning Journey` saves the course changes.

#### Skills

Navigate to the skills page (https://spm-g7t5.netlify.app/skills) or click on the `Skills` tab in the navbar to view all active skills. Clicking on any of the skills reveals the skill's descriptions and its accompanying courses.

<img src="assets/staff/skills.png" alt="Staff Skills" />

#### Courses

Navigate to the courses page (https://spm-g7t5.netlify.app/courses) or click on the `Courses` tab in the navbar to view all active courses. Clicking on any of the courses reveals the course's descriptions and its accompanying skills.

Each course also carries a color-coded tag, which can either be (`Not registered`, `Waitlist`, `Rejected`, `Registered`, `OnGoing`, `Completed`).

<img src="assets/staff/courses.png" alt="Staff Courses" />

#### Job Roles

Navigate to the job roles page (https://spm-g7t5.netlify.app/jobs) or click on the `Job Roles` tab in the navbar to view all active job roles. Clicking on any of the job roles reveals the job role's descriptions and its accompanying skills.

<img src="assets/staff/jobs.png" alt="Staff Jobs" />

It is also on this page where new learning journeys are created. The `+ New Learning Journey` button in the navbar will reroute the user to this page so that they can specify the job role that they want to create a new learning journey for. This is then completed by clicking on the `Create Learning Journey` button in the desired job role.

##### Creating a Learning Journey

In the create learning journey page, the job details are displayed at the top, followed by the respective skills, similar to the update page earlier.

<img src="assets/staff/create_learning_journey.png" alt="Staff Create Learning Journey" />

Selecting on a skill required brings up a list of courses, which can then be added to the learning journey.

<img src="assets/staff/create_learning_journey_skill_course.png" alt="Staff Create Learning Journey Skill Course" />

Once at least 1 course is added to the learning course, the `Create Learning Journey` button becomes active and the user can create the learning journey with the associated courses.

### HR Features

Logging in as a HR allows us to access skill, course and job role management features.

#### Skills

A similar view to the Staff's version of skills is displayed, with the addition of 3 buttons:
- `Create New Skill`
- `Edit`
- `Deactivate`

<img src="assets/hr/skills.png" alt="HR Skills" />

##### Create New Skill

Selecting the `Create New Skill` option brings up a page to furnish the skill name and description for a new skill. By default, new skills are set to active.

<img src="assets/hr/create_skill.png" alt="HR Create Skill" />

#### Edit

Selecting the `Edit` option on a skill brings up its respective edit skill page. Changes in the fields will then be saved after using the `Update Skill` button.

<img src="assets/hr/edit_skill.png" alt="HR Edit Skill" />

#### Deactivate

Selecting the `Deactivate` option on a skill brings up a confirmation window to "soft-delete" a skill (i.e. set the skill to inactive). This would prevent Staff users from viewing the respective skill.

<img src="assets/hr/deactivate_skill.png" alt="HR Deactivate Skill" />

<p align="right">(<a href="#top">back to top</a>)</p>

### Courses

A similar view to the Staff's version of skills is displayed, with the addition of 1 button:
- `Edit`

Also, course statuses are displayed via color coded tags (`Active`, `Pending` and `Retired`) instead of the course registration status.

<img src="assets/hr/courses.png" alt="HR Courses" />

#### Edit

Selecting the `Edit` option on a course brings up its respective edit course page. Skills can be assigned/removed using the dropdown box and crosses.

<img src="assets/hr/edit_course.png" alt="HR Edit Course" />

### Job Roles

A similar view to the Staff's version of job roles is displayed, with the addition of 3 buttons:
- `Create New Job`
- `Edit`
- `Deactivate`

<img src="assets/hr/jobs.png" alt="HR Jobs" />

##### Create New Job

Selecting the `Create New Job` option brings up a page to furnish the job name and description for a new job. In addition, skills can be assigned in this page. By default, new jobs are set to active.

<img src="assets/hr/create_job.png" alt="HR Create Job" />

#### Edit

Selecting the `Edit` option on a job role brings up its respective edit job role page. Changes in the fields will then be saved after using the `Update Job` button.

<img src="assets/hr/edit_job.png" alt="HR Edit Job" />

#### Deactivate

Selecting the `Deactivate` option on a job role brings up a confirmation window to "soft-delete" a job role (i.e. set the job role to inactive). This would prevent Staff users from viewing the respective job role.

<img src="assets/hr/deactivate_job.png" alt="HR Deactivate Job" />

### Manager Features

Currently, none of the first release features are unique to Managers, and therefore no notable features are available under this role. Future features such as viewing the skills of their team members will be added in subsequent releases.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
