/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const exists = await knex.schema.hasTable("newsletter");
  if (!exists) {
    return knex.schema.createTable("newsletter", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("update_text").notNullable(); // Updated column name
      table.string("image").notNullable();
      table.string("question").notNullable();
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("newsletter");
}
