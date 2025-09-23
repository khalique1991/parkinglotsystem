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
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
