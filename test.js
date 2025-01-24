import knex from "knex";
import knexConfig from "./knexfile.js"; // Make sure this is the correct path to your knexfile

// Initialize knex with the development configuration
const db = knex(knexConfig.development);

(async () => {
  try {
    const users = await db("user").select("*");
    console.log("Users:", users);

    const newsletters = await db("newsletter").select("*");
    console.log("Newsletters:", newsletters);

    const responses = await db("responses").select("*");
    console.log("Responses:", responses);
  } catch (error) {
    console.error("Error querying the database:", error);
  } finally {
    await db.destroy(); // Close the connection properly
  }
})();
