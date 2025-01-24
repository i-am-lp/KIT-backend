export async function up(knex) {
    const exists = await knex.schema.hasColumn("user", "email");
    if (!exists) {
      return knex.schema.table("user", (table) => {
        table.string("email");
      });
    }
  }
  
  export async function down(knex) {
    return knex.schema.table("user", (table) => {
      table.dropColumn("email");
    });
  }
  