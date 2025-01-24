import newsletter from "../seed-data/newsletter.js";
import responses from "../seed-data/responses.js";
import users from "../seed-data/user.js"

export async function seed(knex) {
  await knex.raw("SET FOREIGN_KEY_CHECKS = 0;");
  await knex("responses").truncate();
  await knex("newsletter").truncate();
  await knex("user").truncate();
  await knex.raw("SET FOREIGN_KEY_CHECKS = 1;"); 


  await knex("user").insert(users);
  await knex("newsletter").insert(newsletter);
  await knex("responses").insert(responses);
}
