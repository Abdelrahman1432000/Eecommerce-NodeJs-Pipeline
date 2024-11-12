# use Node Js image for Container
FROM node:16

# which container will start work 

WORKDIR /app

# copy package.json and package - lock.json

COPY package*.json ./

# install needed packages 
 RUN npm install

 # copy remain files to workdir 

 COPY . .

 # which port will work for app 

 EXPOSE 3000

 # commend for Run Code 

 CMD [ "node","index.js"]
 