FROM node:16

WORKDIR /usr/src/workdir
COPY . .
RUN ["npm", "i"];
EXPOSE 3000

CMD ["npm", "start"]