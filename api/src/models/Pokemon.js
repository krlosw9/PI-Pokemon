const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    live: {
      type: DataTypes.FLOAT
    },
    attack: {
      type: DataTypes.FLOAT
    },
    shield: {
      type: DataTypes.FLOAT
    },
    speed: {
      type: DataTypes.FLOAT
    },
    height: {
      type: DataTypes.FLOAT    
    },
    weight:{
      type: DataTypes.FLOAT
    }
  });
};
