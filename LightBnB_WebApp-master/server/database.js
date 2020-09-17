//Database connection code
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

// Get User with email

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`SELECT *
  FROM users
  WHERE email = $1;`,[email])
  .then(res => res.rows[0])
}
exports.getUserWithEmail = getUserWithEmail;



//Get user with id

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT *
  FROM users 
  WHERE id = $1`,[id])
  .then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;



// add new user to the database
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`
  , [user.name, user.email, user.password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations


// get all reservations for a user
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT reservations.*,properties.*,AVG(property_reviews.rating) as average_rating
  FROM properties JOIN reservations
  ON reservations.property_id = properties.id
  JOIN property_reviews ON 
  property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date 
  LIMIT $2;`,[guest_id,limit])
  .then(res => res.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city.toLowerCase()}%`);
    queryString += `WHERE LOWER(city) LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night > $${queryParams.length}`;
    } else {
      queryString += `AND cost_per_night > $${queryParams.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night$ < $${queryParams.length}`;
    } else {
      queryString += `AND cost_per_night < $${queryParams.length}`;
    }
  }

  queryString += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    if (queryParams.length === 1) {
      queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    } else {
      queryString += ` 
    HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    }
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then(res => res.rows);
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(
    `
    insert into properties (owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *
    `,
    [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms
    ]
  );
};
exports.addProperty = addProperty;