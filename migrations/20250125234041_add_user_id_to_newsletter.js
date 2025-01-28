export const up = function (knex) {
    return knex.schema.table('newsletter', function (table) {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
    });
  };
  
  export const down = function (knex) {
    return knex.schema.table('newsletter', function (table) {
      table.dropColumn('user_id');
    });
  };
  