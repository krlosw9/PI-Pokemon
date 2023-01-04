const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    attack: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    defense: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    speed: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    height: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    weight:{
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    img: {
      type: DataTypes.TEXT,
    }
  });
};
