'use strict';
var SequelizeSlugify = require('sequelize-slugify');

module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    channel: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  SequelizeSlugify.slugifyModel(Room, {
    source: ['name']
  });

  return Room;
};