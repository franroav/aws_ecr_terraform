FROM node:12.4.0-alpine as debug

WORKDIR /work/

COPY ./src/package.json /work/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./src/ /work/src/

ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./src/server.js" ]

FROM node:12.4.0-alpine as prod

WORKDIR /work/
COPY ./src/package.json /work/package.json
RUN npm install
COPY ./src/ /work/

# Create log directory
RUN mkdir -p /var/log/containers
# Ensure the log directory is writeable
RUN chmod -R 777 /var/log/containers

# CMD ["node", "./src/server.js"]

CMD node .






# FROM node:12.4.0-alpine as debug

# WORKDIR /work/

# COPY ./src/package.json /work/package.json
# RUN npm install
# RUN npm install -g nodemon

# COPY ./src/ /work/src/

# ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./src/server.js" ]

# FROM node:12.4.0-alpine as prod

# WORKDIR /work/
# COPY ./src/package.json /work/package.json
# RUN npm install
# COPY ./src/ /work/

# CMD node .







# # Make your container listen on port 3000 at runtime
# EXPOSE 3000

# # Define the command to run your app using CMD which defines your runtime
# CMD ["node", "./src/server.js"]

# # Use an official Node runtime as a parent image for development
# FROM node:12.4.0-alpine as debug

# # Set the working directory in the container for debug stage
# WORKDIR /work/

# # Copy the package.json file to the work directory
# COPY ./src/package.json /work/package.json

# # Install any needed packages specified in package.json
# RUN npm install

# # Globally install nodemon for development
# RUN npm install -g nodemon

# # Copy the rest of the application
# COPY ./src/ /work/src/

# # Run the app when the container launches with nodemon and debugging enabled
# ENTRYPOINT ["nodemon", "--inspect=0.0.0.0", "./src/server.js"]

# # Use an official Node runtime as a parent image for production
# FROM node:12.4.0-alpine as prod

# # Set the working directory in the container for production stage
# WORKDIR /work/

# # Copy the package.json file to the work directory
# COPY ./src/package.json /work/package.json

# # Install any needed packages specified in package.json
# RUN npm install

# # Copy the rest of the application
# COPY ./src/ /work/

# # Make your container listen on port 3000 at runtime
# EXPOSE 3000

# # Define the command to run your app using CMD which defines your runtime
# CMD ["node", "./src/server.js"]
