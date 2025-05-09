<h2>Vaccination Portal - Fullstack Development Assignment - Harshit Derashree - 2024tm93173 </h2>
<br> <b>Stack used = MERN stack

### Setup backend, frontend and MongoDB - Pull docker image to kickstart
```console
cd vaccination-portal
docker-compose up -d
```
### Setup .env file and populate a file like the following-
```console
#### Backend
BACKEND_PORT=5001
PROXY_API_URL=http://localhost:5001

#### Frontend
FRONTEND_PORT=5173
FRONTEND_INTERNAL_PORT=80

#### MongoDB
DB_PORT=27017
MONGO_URI=mongodb://mongo:27017/vaccination_db

#### JWT
JWT_SECRET=hardcoded_or_mock_secret
JWT_EXPIRATION=1h
```
### View UI
```console
cd vaccination-portal/frontend
npm run dev
```
### View Swagger API docs
```console
docker pull swaggerapi/swagger-ui
docker run -p 80:8080 -e SWAGGER_JSON=/foo/swagger.yaml -v $(pwd)/apidocs/swagger.yaml:/foo/swagger.yaml swaggerapi/swagger-ui
```

