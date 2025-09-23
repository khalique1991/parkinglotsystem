FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /app
COPY ../pom.xml ./pom.xml
COPY ../common ../common
COPY ../auth-service ../auth-service
COPY ../customer-service ./customer-service

WORKDIR /app/customer-service
#RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/customer-service/target/*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
