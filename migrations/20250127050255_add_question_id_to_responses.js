/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.table("responses", (table) => {
      table.integer("question_id").unsigned();
  
      // Adding foreign key constraint
      table
        .foreign("question_id")
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
    });
  };
  