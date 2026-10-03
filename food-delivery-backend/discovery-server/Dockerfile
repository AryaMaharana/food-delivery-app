FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY discovery-server/pom.xml discovery-server/pom.xml
COPY discovery-server/src discovery-server/src
RUN mvn -f discovery-server/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/discovery-server/target/discovery-server-1.0.0.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java","-jar","app.jar"]
