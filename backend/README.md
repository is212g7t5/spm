# Backend for Learning Journey Planning System

This is the application root for the backend system of LJPS.

## Prerequisites

- Recommended platform
    - Development: macOS Monterey (Intel)
    - Production: Linux (Ubuntu 16.04)
- Python 3.8
- MySQL >=8.0 server

### Set-up Local Directories

Clone this repository or download the files to local directory.
Open a terminal session and navigate to this application root (`.../is212g5t7-project/backend`)

```bash
cd /path/to/is212g5t7-project/backend
```

### Provide Environment Variables

This backend application relies on the accompanying MySQL server for data persistence. We need to provide it the following information. Edit the `.env.example` using any text editor (`vi .env.example`).
    1. Replace `<>` fields with the respective information
    2. Rename `.env.example` to `.env`

**Note: `.env` is automatically ignored by git, do not edit the PYTHONPATH variable**
```bash
# Clone into a .env file
PYTHONPATH="${PYTHONPATH}:." # DO NOT CHANGE THIS
DB_SERVER=<DB SERVER>
DB_PORT=<DB PORT>
DB_USER=<DB USER>
DB_PASSWORD=<DB PASSWORD>
DATABASE=<DB SCHEMA>
```

### Install Dependencies

```
pip install --upgrade pip
pip install -r requirements.txt
```

### Preparing DB Schema

Run pre-start to initialize database (if not already initialized)

```
. ./prestart.sh
```

## Production Mode

```bash
uvicorn --host 0.0.0.0 --port 8081 "app.main:app"
```

## Development Mode

Run REST API app in development mode

```bash
uvicorn --reload --host 0.0.0.0 --port 8081 "app.main:app"
```

## Auto-Generated Docs

Upon running the application either either `production` or `development` mode, API Swagger docs can be found by navigating to [http://localhost:8081/docs](http://localhost:8081/docs).

## Troubleshooting

For Windows, the library mysqlclient fails on certain pythons.
To resolve: view this [thread](https://stackoverflow.com/questions/61244344/pip-install-mysqlclient-with-python-3-8-not-working)

## Contributing

Pre-commit hooks are enabled on this repository. To install

```bash
pre-commit install --install-hooks
```

To manually run pre-commits

```bash
pre-commit run --all-files
```

## Testing

Navigate to root folder of `backend`

```bash
cd /path/to/is212g5t7-project/backend
```

Ensure the environment variables are set up as above in `Installation`

Run the tests (unit tests and integration tests)

```bash
./tests-start.sh
```

Within the test script, it runs an `alembic upgrade` before and `alembic downgrade` after the tests to reset and restore the test database schema. Currently, this may cause concurrent testing to interfere with one another. Also, test database tables are truncated between each test module.

For changes with alembic version related changes, ensure that the `alembic downgrade -x` command accurately reflects the number of alembic versions to downgrade by (e.g. 2 alembic versions, `x` should be 2)
