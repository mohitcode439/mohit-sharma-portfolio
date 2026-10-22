# Build stage: compile and package the Spring Boot jar
FROM maven:3-eclipse-temurin-25 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q -DskipTests package

# Runtime stage: JRE only, non-root user
FROM eclipse-temurin:25-jre
WORKDIR /app
RUN useradd --system --uid 1001 spring
COPY --from=build /app/target/portfolio-api-*.jar app.jar
USER spring

# Inside the container the app must listen on all interfaces so the platform can route traffic to it
ENV SERVER_ADDRESS=0.0.0.0
# Free hosting tiers give ~512 MB: cap the heap and use the lightweight serial GC
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC -XX:TieredStopAtLevel=1"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
