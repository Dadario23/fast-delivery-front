
FROM node:20


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]