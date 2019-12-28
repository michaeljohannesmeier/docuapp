FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 9090
RUN mkdir -p /back/
ADD ./target/*.jar /back/docuapp.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "/back/docuapp.jar"]