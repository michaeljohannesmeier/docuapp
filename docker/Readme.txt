

Deploy without db:
---------------------
- package backend spring:
    mvn clean package spring-boot:repackage -Pdockerout

- build angular in prod
    ng build --prod

- run docker-compose locally
    docker-compose up

- deploy live
    npm run deploy


Deploy with fresh db:
-------------------------
- generate new db with backup --> start db container without hibernate spring
    - therefore uncomment db username or password in docker-compose file for spring
    - remove volume to start new
    - run docker-compose so that only db runs
    - open pgAdmin and restore db
    - change db username or password back to functional
    - run docker-compose and deploy


SSL certificate:
-------------------------
- download priv key, cert and intermediate cert from ionos page
- combine cert and intermediate cert with cat cert cert_interm >> bundle_cert.pem
- in nginx config file give path to priv key and bundle_cert.pem
- if error: see if checksum matches: https://knowledge.digicert.com/solution/SO17751.html
