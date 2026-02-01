#!/bin/sh

# Wait for database to be ready (optional but recommended)
# You could use a tool like wait-for-it.sh here if needed

echo "Running database seeding..."
npm run seed || echo "Seeding failed but continuing..."

echo "Starting the application..."
npm run start:prod
