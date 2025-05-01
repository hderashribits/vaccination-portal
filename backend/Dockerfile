# Use Node 20 LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other backend files
COPY . .

# Expose port
EXPOSE 5000

# Command to run
CMD ["npm", "run", "dev"]
