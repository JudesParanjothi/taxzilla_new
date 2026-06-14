// Usage: node scripts/hash-password.mjs "YourStrongPassword"
// Prints a bcrypt hash you can paste into ADMIN_PASSWORD_HASH in .env.local
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "YourStrongPassword"');
  process.exit(1);
}

if (password.length < 10) {
  console.error("Refusing to hash: choose a password of at least 10 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);
