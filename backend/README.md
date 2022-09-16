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

Load environment variables
```
PYTHONPATH="${PYTHONPATH}:."
DB_SERVER=
DB_PORT=
DB_USER=
DB_PASSWORD=
DATABASE=
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
