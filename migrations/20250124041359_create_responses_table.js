/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("responses", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");

    table
      .integer("question_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("newsletter")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("responses", (table) => {
    table.dropForeign("question_id");
    table.dropColumn("question_id");

    table.dropForeign("user_id");
  });
};
