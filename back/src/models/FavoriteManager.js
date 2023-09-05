const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "favorite" as configuration
    super({ table: "favorite" });
  }

  // The C of CRUD - Create operation

  async create(favorite) {
    // Execute the SQL INSERT query to add a new favorite to the "favorite" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, article_id) values (?, ?)`,
      [favorite.user_id, favorite.article_id]
    );

    // Return the ID of the newly inserted favorite
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific favorite by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the favorite
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all favorites from the "favorite" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of favorites
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing favorite

  // async update(favorite) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an favorite from the "favorite" table
    await this.database.query(`delete from ${this.table} where id = ?`, [id]);

    return 0;
  }
}

module.exports = FavoriteManager;
