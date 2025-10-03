import { v4 as uuidv4 } from 'uuid';

class SavedAsteroid {
  constructor(id, nasa_id, name, diameter_min, diameter_max, velocity, miss_distance, is_hazardous, close_approach_date, notes) {
    this.id = id;
    this.nasa_id = nasa_id;
    this.name = name;
    this.diameter_min = diameter_min;
    this.diameter_max = diameter_max;
    this.velocity = velocity;
    this.miss_distance = miss_distance;
    this.is_hazardous = is_hazardous;
    this.close_approach_date = close_approach_date;
    this.notes = notes;
  }

  static async create({ nasa_id, name, diameter_min, diameter_max, velocity, miss_distance, is_hazardous, close_approach_date, notes }) {
    const id = uuidv4();
    const asteroid = new SavedAsteroid(id, nasa_id, name, diameter_min, diameter_max, velocity, miss_distance, is_hazardous, close_approach_date, notes);
    
    // Store in localStorage
    let savedAsteroids = JSON.parse(localStorage.getItem('savedAsteroids')) || [];
    savedAsteroids.push(asteroid);
    localStorage.setItem('savedAsteroids', JSON.stringify(savedAsteroids));

    return asteroid;
  }

  static async list() {
    let savedAsteroids = JSON.parse(localStorage.getItem('savedAsteroids')) || [];
    return savedAsteroids.map(asteroid => new SavedAsteroid(
      asteroid.id,
      asteroid.nasa_id,
      asteroid.name,
      asteroid.diameter_min,
      asteroid.diameter_max,
      asteroid.velocity,
      asteroid.miss_distance,
      asteroid.is_hazardous,
      asteroid.close_approach_date,
      asteroid.notes
    ));
  }

  static async delete(id) {
    let savedAsteroids = JSON.parse(localStorage.getItem('savedAsteroids')) || [];
    savedAsteroids = savedAsteroids.filter(asteroid => asteroid.id !== id);
    localStorage.setItem('savedAsteroids', JSON.stringify(savedAsteroids));
  }
}

export { SavedAsteroid };
