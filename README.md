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
    <li><a href="#usage">Usage</a></li>
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
- [Backend Documentation](http://spm-g7t5-api.herokuapp.com/docs)

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

To be updated nearer to first release.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
