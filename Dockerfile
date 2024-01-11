# Usa la imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Compila la aplicación para producción
RUN npm run build

# Expone el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]