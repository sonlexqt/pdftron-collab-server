FROM node:lts-alpine

# create app directory
WORKDIR /opt/pdftron-collab-server/ws-server

# install app dependencies
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force

# copy app source code
COPY . .

# expose port and start application
EXPOSE 4000

CMD ["npm", "start"]
