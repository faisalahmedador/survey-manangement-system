# Use Node.js as base image
FROM node:20 AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY package*.json ./

# Clean npm cache first
RUN npm cache clean --force

RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN npx nest build

# Use a smaller image for production
FROM node:20-alpine

WORKDIR /app

# Copy built assets and node_modules from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/docker-entrypoint.sh ./
COPY --from=build /app/src ./src
COPY --from=build /app/tsconfig.json ./

# Make entrypoint script executable
RUN chmod +x docker-entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Start the application
ENTRYPOINT ["./docker-entrypoint.sh"]
