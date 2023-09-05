// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all articles from the database
    const articles = await tables.article.readAll();

    // Respond with the articles in JSON format
    res.json(articles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific article from the database based on the provided ID
    const article = await tables.article.read(req.params.id);

    // If the article is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the article in JSON format
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the article data from the request body
  const article = req.body;

  try {
    // Insert the article into the database
    const insertId = await tables.article.create(article);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted article
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the article data from the request body
  const { id } = req.params;

  try {
    // Delete the article from the database
    await tables.article.delete(id);

    // Respond with HTTP 200 (OK)
    res.sendStatus(200);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readAllFavoriteByUserId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const articles = await tables.article.readAllFavoriteByUserId(id);

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  destroy,
  readAllFavoriteByUserId,
};
