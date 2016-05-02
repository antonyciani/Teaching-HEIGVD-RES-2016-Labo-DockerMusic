FROM node:4.3.1
MAINTAINER Ciani Antony <antony.ciani@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY musician.js /opt/app/

ENTRYPOINT ["node", "/opt/app/musician.js"]