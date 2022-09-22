## Installation

Navigate to root folder of `backend`

```
cd /path/to/is212g5t7-project/backend
```

Install dependencies

```
pip install --upgrade pip
pip install -r requirements.txt
```

```
For Windows, the library mysqlclient fails on certain pythons.
To resolve: view this link:
https://stackoverflow.com/questions/61244344/pip-install-mysqlclient-with-python-3-8-not-working
```

Load environment variables into a .env file. File should be placed in the root directory - backend.

```
PYTHONPATH="${PYTHONPATH}:."
DB_SERVER=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DATABASE=spm
```

Run pre-start to initialize database (if not already initialized)

```
. ./prestart.sh
```

Run REST API app in development mode

```
uvicorn --reload --host 0.0.0.0 --port 8081 "app.main:app"
```

## Contributing

Pre-commit hooks are enabled on this repository. To install

```
pre-commit install --install-hooks
```

To manually run pre-commits

```
pre-commit run --all-files
```

## Testing

Navigate to root folder of `backend`
```
cd /path/to/is212g5t7-project/backend
```

Ensure the environment variables are set up as above in `Installation`

Run the tests
```
./tests-start.sh
```

Within the test script, it runs an `alembic upgrade` before and `alembic downgrade` after the tests to reset and restore the test database schema. Currently, this may cause concurrent testing to interfere with one another. This also means that the test database is not reset between unit tests (and therefore needs to be arranged accordingly).

For changes with alembic version related changes, ensure that the `alembic downgrade -x` command accurately reflects the number of alembic versions to downgrade by (e.g. 2 alembic versions, `x` should be 2)
