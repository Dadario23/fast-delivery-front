# Establecer la imagen base
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar dependencias (solo las de producción)
RUN npm install --production --omit=dev

# Establecer la variable de entorno DOCKER_BUILD
ENV DOCKER_BUILD=true

# Copiar el resto de los archivos de la aplicación
COPY . .

# Ejecutar el comando de construcción
RUN npm run build

# Exponer el puerto en el que la aplicación corre
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]


