### View Swagger API docs
```console
docker pull swaggerapi/swagger-ui
docker run -p 80:8080 -e SWAGGER_JSON=/foo/swagger.yaml -v $(pwd)/apidocs/swagger.yaml:/foo/swagger.yaml swaggerapi/swagger-ui
```

