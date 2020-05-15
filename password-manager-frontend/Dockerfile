# pull official base image
FROM node:13.12.0-alpine
# If missing, container immediately exits from docker if you run without allocating a TTY

RUN apk --no-cache add curl

# set working directory
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package.json yarn.lock ./

# Installs all node packages
RUN yarn

# Copies everything over to Docker environment
COPY . ./
RUN yarn build

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD [ "yarn", "start" ]