FROM node:4.3.1
MAINTAINER Ciani Antony <antony.ciani@heig-vd.ch>

COPY musician.js /opt/app/

RUN npm install uuid
RUN npm install hashmap



ENTRYPOINT ["node", "/opt/app/musician.js"]