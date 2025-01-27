import bcrypt from "bcrypt";

const hashedPasswords = [
  await bcrypt.hash("password123", 10), // Password for Lauren Phillips
  await bcrypt.hash("password123", 10), // Password for Dana Osborn
  await bcrypt.hash("password123", 10), // Password for Geena Massara
  await bcrypt.hash("password123", 10), // Password for Andrea Larsen
  await bcrypt.hash("password123", 10), // Password for Jordan Phillips
];

const users = [
  {
    id: 1,
    name: "Lauren Phillips",
    email: "lauren.phillips@example.com",
    password: hashedPasswords[0],
  },
  {
    id: 2,
    name: "Dana Osborn",
    email: "dana.osborn@example.com",
    password: hashedPasswords[1],
  },
  {
    id: 3,
    name: "Geena Massara",
    email: "geena.massara@example.com",
    password: hashedPasswords[2],
  },
  {
    id: 4,
    name: "Andrea Larsen",
    email: "andrea.larsen@example.com",
    password: hashedPasswords[3],
  },
  {
    id: 5,
    name: "Jordan Phillips",
    email: "jordan.phillips@example.com",
    password: hashedPasswords[4],
  },
];

export default users;
