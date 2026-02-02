# ---- BUILD STAGE (Debian, not Alpine) ----
FROM node:20 AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./

# Clean npm cache first
RUN npm cache clean --force

# Install with stable flags
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN npx ng build

# Use Nginx to serve the frontend
FROM nginx:alpine

# Copy built assets from build stage to Nginx html directory
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
