#!/usr/bin/env bash

set -e
set -x

DATABASE="app_automated_test"

alembic upgrade head || { ec=$?; alembic downgrade 0001; alembic downgrade -1; printf '%s\n' "Alembic upgrade error" >&2; exit $ec; }

pytest --cov=app --cov-report=term-missing app/tests "${@}" || { ec=$?; alembic downgrade 0001; alembic downgrade -1; printf '%s\n' "Test failed" >&2; exit $ec; }

alembic downgrade 0001
alembic downgrade -1

echo "Test completed sucessfully"
