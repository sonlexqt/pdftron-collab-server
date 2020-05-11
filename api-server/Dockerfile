FROM node:lts-alpine

# create app directory
WORKDIR /opt/pdftron-collab-server/api-server

# install app dependencies
COPY package.json ./
RUN npm i

# copy app source code
COPY . .

# expose port and start application
EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
