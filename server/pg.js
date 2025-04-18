const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const run = async () => {
  const hashedPassword = await hashPassword("12345");
  console.log(hashedPassword);
};

run();
