FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL maintainer="alanhsnn@gmail.com"

ADD backend/target/spacegeekscorner.jar spacegeekscorner.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -jar /spacegeekscorner.jar" ]
