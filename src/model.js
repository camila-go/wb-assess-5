//import { DataTypes, Model } from 'sequelize';
import { Sequelize, DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
}

// TODO: Human.init()
//class Human extends Model {}
  Human.init (
    {
  humanId:  {
    type: DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  }
}, {
    modelName: 'human',
    sequelize:db,
  });




export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// TODO: Animal.init()
//class Animals extends Model {}
  Animal.init (
    {
  animalId:  {
    type: DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  birthYear:{
    type:DataTypes.INTEGER,
  }
}, {
    modelName: 'animal',
    sequelize:db,
  });


// TODO: Define Relationship
Human.hasMany(Animal,{foreignKey: 'humanId'});
Animal.belongsTo(Human, {foreignKey:'humanId'});

export default db;
