FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY order-service/pom.xml order-service/pom.xml
COPY order-service/src order-service/src
RUN mvn -f order-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/order-service/target/order-service-1.0.0.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","app.jar"]
