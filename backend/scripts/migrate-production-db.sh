DATABASE="production"

alembic downgrade 0001
alembic downgrade -1

alembic upgrade head || { ec=$?; alembic downgrade -1; printf '%s\n' "Alembic upgrade error" >&2; exit $ec; }
