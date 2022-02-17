FROM node:14.17.0-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN chmod 777 /app
COPY . .
RUN npm run build
USER 1000
EXPOSE 4000
CMD ["npm", "run", "serve"]
