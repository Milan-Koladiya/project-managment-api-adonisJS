"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectsSchema extends Schema {
  up() {
    this.create("projects", (table) => {
      table.string("title", 255);
      table.string("body", 255);
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectsSchema;
