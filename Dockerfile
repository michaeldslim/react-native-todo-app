# Simple Dockerfile for Expo React Native app
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies first (better build cache)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expo default ports (adjust if you use different ones)
EXPOSE 8081 19000 19001 19002

# Start Expo dev server by default
CMD ["npm", "run", "start"]
