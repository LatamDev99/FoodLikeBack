require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_URL} = process.env

const sequelize = new Sequelize(DB_URL,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      define: {
         timestamps: false,  // Puedes establecer esto como true si deseas usar timestamps
         underscored: true,  // Esta opción convierte los nombres de las columnas en snake_case
       },
      define: {
         timestamps: false,  // Puedes establecer esto como true si deseas usar timestamps
         underscored: true,  // Esta opción convierte los nombres de las columnas en snake_case
       },
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Aqui los modelos
const { Cliente, Restaurante, Platillo, Review, Marca, CategoriaRestaurante, CategoriaPlatillo } = sequelize.models;
/*
Crear las relaciones de muchos a muchos entre Restaurantes y Categorias
*/
Restaurante.belongsToMany(CategoriaRestaurante, { through:"Categorias"});
CategoriaRestaurante.belongsToMany(Restaurante, { through:"Categorias"});
/*

Crear las relaciones de muchos a muchos entre Restaurantes y Platillos
*/
Restaurante.belongsToMany(CategoriaPlatillo, { through:"CategoriasP"});
CategoriaPlatillo.belongsToMany(Restaurante, { through:"CategoriasP"});
/*

Crear relacion de muchos a muchos Cliente y Categoria, con una tabla intermedia llamada preferencias
*/
Cliente.belongsToMany(CategoriaRestaurante, { through:"preferencias"});
CategoriaRestaurante.belongsToMany(Cliente, { through:"preferencias"});
/*
Crear la relacion entre Restaurante y Marca, la marca puede tener varios restaurantes pero los restaurates solo una marca
*/
Marca.hasMany(Restaurante, { foreignKey: 'marcaId' });
Restaurante.belongsTo(Marca, { foreignKey: 'marcaId' });     /*Listo*/    
/*
Crear la relacion entre Cliente y Review, el cliente puede hacer varios reviews pero el review solo pertenece a un cliente
*/
Cliente.hasMany(Review, { foreignKey:"clienteId"});
Review.belongsTo(Cliente, { foreignKey:"clienteId"});       /*Listo*/          
/*
Crear la relacion entre Review y Restaurante, la review solo puede pertenecer a un restaurante pero el restaurante puede tener varios reviews
*/
Restaurante.hasMany(Review, { foreignKey:"restauranteId"});
Review.belongsTo(Restaurante, { foreignKey:"restauranteId"});
/*
Crear la relacion entre restaurante y platillo, con una tabla intermedia que se llame menú, el restaurante puede tener varios platillos y el platillo solo un restaurante
*/
CategoriaPlatillo.hasMany(Platillo, { foreignKey: "CategoriaPlatilloId"});
Platillo.belongsTo(CategoriaPlatillo, { foreignKey: "CategoriaPlatilloId"});


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
