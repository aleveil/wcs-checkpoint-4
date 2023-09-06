const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling user-related operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of users
router.get("/users", userControllers.browse);

// Route to get a specific user by ID
router.get("/users/:id", userControllers.read);

// Route to add a new user
router.post("/users", userControllers.add);

// Route to delete an user by ID
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

// Import articleControllers module for handling article-related operations
const articleControllers = require("./controllers/articleControllers");

// Route to get a list of articles
router.get("/articles", articleControllers.browse);

// Route to get a specific article by ID
router.get("/articles/:id", articleControllers.read);

// Route to add a new article
router.post("/articles", articleControllers.add);

// Route to delete an article by ID
router.delete("/articles/:id", articleControllers.destroy);

router.get(
  "/favarticles/:id",
  articleControllers.readAllArticlesByUserIdFavorite
);

/* ************************************************************************* */

// Import favoriteControllers module for handling favorite-related operations
const favoriteControllers = require("./controllers/favoriteControllers");

// Route to get a list of favorites
router.get("/favorites", favoriteControllers.browse);

// Route to get a specific favorite by ID
router.get("/favorites/:id", favoriteControllers.read);

// Route to add a new favorite
router.post("/favorites", favoriteControllers.add);

// Route to delete an favorite by ID
router.delete("/favorites/:id", favoriteControllers.destroy);

router.delete(
  "/favorites/:articleId/:userId",
  favoriteControllers.deleteByArticleIdAndUserId
);

/* ************************************************************************* */
const authControllers = require("./controllers/authControllers");

router.post("/login", authControllers.login);

module.exports = router;
