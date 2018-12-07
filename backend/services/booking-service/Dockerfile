
# Install node env
FROM node:8

# Create app directory
WORKDIR /booking-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

# Open port
#EXPOSE 9001

CMD [ "npm", "start" ]
