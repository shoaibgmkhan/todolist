#!/usr/bin/env bash
set -e

cd /todo

./manage.py collectstatic --no-input --clear

if [ "$ENV" = 'DEV' ]; then
    echo "Running Development Server"
    python manage.py runserver 0.0.0.0:8000
else
    echo "Running Production Server"
    gunicorn todo.wsgi:application --bind 0.0.0.0:8000 --workers 3 --log-level=info
fi

exec "$@"