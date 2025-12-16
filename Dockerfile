FROM ubuntu:latest

FROM maven:3.8.5-openjdk-17 AS BUILD
WORKDIR /app
COPY CarRentingSystem /app
RUN mvn clean package

FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=BUILD /app/target/expenseTracker-0.0.1-SNAPSHOT.jar expenseApp.jar
EXPOSE 9000
ENTRYPOINT ["java", "-jar", "expenseApp.jar"]

FROM node:16 AS ANGULAR_BUILD
WORKDIR /app  
COPY car_rental_angular /app
RUN npm install
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=ANGULAR_BUILD /app/dist/car_rental_angular /usr/share/ng
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
