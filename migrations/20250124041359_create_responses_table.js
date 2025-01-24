/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const exists = await knex.schema.hasTable("responses");
    if (!exists) {
      return knex.schema.createTable("responses", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.text("response").notNullable();
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      });
    }
  }
  
  export async function down(knex) {
    return knex.schema.dropTableIfExists("responses");
  }