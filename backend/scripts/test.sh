#!/usr/bin/env bash

set -e
set -x

DATABASE="app_automated_test"

alembic upgrade head

pytest --cov=app --cov-report=term-missing app/tests "${@}" || echo "Test completed"

alembic downgrade -$(ls -p alembic/versions | grep -v /$ | wc -l | sed -e 's/^[ \t]*//')
