/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").nullable();
      table.string("password").notNullable();
    });
  
    await knex.schema.createTable("newsletter", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("update_text").notNullable();
      table.string("image").notNullable();
      table.string("question").notNullable();
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  
      table.integer("user_id").unsigned().nullable().references("id").inTable("user").onDelete("CASCADE");
    });
  
    await knex.schema.createTable("responses", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("response").notNullable();
  
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
  
      table
        .integer("question_id")
        .unsigned()
        .references("id")
        .inTable("newsletter")
        .onDelete("CASCADE");
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists("responses");
    await knex.schema.dropTableIfExists("newsletter");
    await knex.schema.dropTableIfExists("user");
  }
  