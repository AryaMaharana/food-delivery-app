FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY restaurant-service/pom.xml restaurant-service/pom.xml
COPY restaurant-service/src restaurant-service/src
RUN mvn -f restaurant-service/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/restaurant-service/target/restaurant-service-1.0.0.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","app.jar"]
