
import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2

export let query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export let query2 = await Animal.findOne({
    where: { species: 'fish' }
});

// Get all animals belonging to the human with primary key 5
export let query3 =  await Animal.findAll({
    where: { humanId: 5 }
});

// Get all animals born in a year greater than (but not equal to) 2015.
export let query4 =  await Animal.findAll({
    where: {birthYear: { [Op.gt]: 2015,
      [Op.ne]: null 
    }},
    raw: true
    });

    console.log(query4); // Log the output to inspect the raw records

// Get all the humans with first names that start with "J"
export let query5 = await Human.findAll({
    where: {fname: { [Op.like]: 'J%'}}
    });

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
    where: {birthYear: { [Op.is]: null}}
    });



// Get all the animals with species "fish" OR "rabbit"
export let query7 = await Animal.findAll({
    where: {
        [Op.or]: [
          { species: 'fish' },
          { species: 'rabbit' }
        ]
      }
    });



// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 =  await Human.findAll({
    where: {email: { [Op.notLike]: '%gmail%' }}
    });

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals 
export async function printHumansAndAnimals() {  
    try {  
      // Fetch data from Humans and include related Animals records  
      const data = await Human.findAll({  
        include: {  
          model: Animal,  as: 'Animals',
          attributes: ['name', 'species']  
        },  
        attributes: ['fname', 'lname']  
      });  
  
      // Print the fetched data  
      data.forEach((row) => {  
        console.log(row.fname, row.lname);  
        if (row.Animals && row.Animals.length > 0) {  
          row.Animals.forEach((animal) => {  
            console.log(animal.name, animal.species);  
          });  
        } else {  
          console.log('  No related Animal records found.');  
        }  
      });  
    } catch (error) {  
      console.error('Error fetching data:', error);  
    }  
  }


// Return a Set containing the full names of humans  
// with animals of the given species.  
export async function getHumansByAnimalSpecies(species) {  
    const human = new Set(); // Create a new Set to store unique full names  
  
    try {  
      // Fetch humans who have animals of the specified species  
      const data = await Human.findAll({  
        include: {  
          model: Animal,  
          where: { species: species }, // Filter by the given species  
          attributes: [] // No need to retrieve attributes from Animals  
        },  
        attributes: ['fname', 'lname'] // Get first and last names of Humans  
      });  
  
      // Construct full names and add them to the Set  
      data.forEach((human) => {  
        const fullName = `${human.fname} ${human.lname}`;  
        humans.add(fullName); // Add the full name to the Set to ensure uniqueness  
      });  
  
      // Return the Set containing unique full names  
      return human;  
    } catch (error) {  
      console.error('Error fetching data:', error);  
      return human; // Return the empty Set in case of an error  
    }  
  }