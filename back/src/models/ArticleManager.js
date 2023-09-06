const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "article" as configuration
    super({ table: "article" });
  }

  // The C of CRUD - Create operation

  async create(article) {
    // Execute the SQL INSERT query to add a new article to the "article" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, content) values (?, ?)`,
      [article.title, article.content]
    );

    // Return the ID of the newly inserted article
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific article by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the article
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all articles from the "article" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of articles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing article

  // async update(article) {
  //   ...
  // }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to remove an article from the "article" table
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);

    return 0;
  }

  async readAllArticlesByUserIdFavorite(id) {
    // Execute the SQL SELECT query to retrieve all articles from the "article" table
    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, IF(favorite.user_id = ?, true, false) AS is_favorite FROM ${this.table} LEFT JOIN favorite ON favorite.article_id = ${this.table}.id && favorite.user_id = ?`,
      [id, id]
    );

    // Return the array of articles
    return rows;
  }
}

module.exports = ArticleManager;
