# Build Stage
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Accept the port as a build argument and set as environment variable
ARG FRONTEND_INTERNAL_PORT=80
ENV FRONTEND_INTERNAL_PORT=$FRONTEND_INTERNAL_PORT

# Copy the build output
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Use dynamic port
EXPOSE ${FRONTEND_INTERNAL_PORT}

CMD ["nginx", "-g", "daemon off;"]
