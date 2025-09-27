# Stage 1: Build
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all modules and parent pom
COPY ../pom.xml ./pom.xml
COPY ../common ../common
COPY ../auth-service ./auth-service
COPY ../customer-service ../customer-service

WORKDIR /app/auth-service
#RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY auth-service/target/auth-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
