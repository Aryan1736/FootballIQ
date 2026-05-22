FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY backened/ .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/backened-0.0.1-SNAPSHOT.jar"]