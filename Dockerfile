# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

#install typescript tsc
RUN npm install -g typescript
RUN npm i --save-dev @types/node

# Copy the rest of the application code to the container
COPY . .

# Expose a port for the Node.js application to listen on
EXPOSE 3333

# Run the Node.js application
# Run yarn build and yarn start
CMD yarn build && yarn start