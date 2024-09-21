#!/bin/bash

# Instalar dependencias si es necesario
npm install

# Ejecutar webpack para construir los archivos estáticos
npx webpack --config webpack.config.js
