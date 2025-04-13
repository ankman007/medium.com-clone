# syntax=docker/dockerfile:1

# Use official Python image
FROM python:3.10-slim

# Install PostgreSQL client and other dependencies
RUN apt-get update && apt-get install -y postgresql-client

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential libpq-dev netcat-openbsd gcc \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . .

# Run collectstatic (optional, for prod)
RUN python manage.py collectstatic --noinput

# Default command
CMD ["gunicorn", "cms.wsgi:application", "--bind", "0.0.0.0:8000"]
