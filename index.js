const { signup, login } = require('./auth');

const args = process.argv.slice(2);
const [command, username, password] = args;

if (!username || !password) {
  console.log('Usage: node index.js <signup|login> <username> <password>');
  process.exit(1);
}

(async () => {
  if (command === 'signup') {
    await signup(username, password);
  } else if (command === 'login') {
    await login(username, password);
  } else {
    console.log('Invalid command. Use "signup" or "login".');
  }
})();
