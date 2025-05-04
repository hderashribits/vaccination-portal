# Use Node 20 LTS
FROM node:20

# Set working directory
WORKDIR /app

# Accept BACKEND_PORT as a build-time argument
ARG BACKEND_PORT

# Set BACKEND_PORT as an environment variable at runtime
ENV BACKEND_PORT=${BACKEND_PORT}


# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other backend files
COPY . .

# Expose port
EXPOSE ${BACKEND_PORT}

# Command to run
CMD ["npm", "run", "dev"]
