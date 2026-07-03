const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const envPath = path.join(__dirname, '.env');

const passwordsToTry = [];
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'your_password') {
  passwordsToTry.push(process.env.DB_PASSWORD);
}
passwordsToTry.push('');
passwordsToTry.push('root');
passwordsToTry.push('your_password');

async function setupDatabase() {
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  
  // Strip SQL comments (-- comment) and block comments (/* comment */)
  const cleanSql = schemaSql
    .replace(/--.*$/gm, '') // Remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
    
  // Split sql statements by semicolon, but filter out empty/whitespace statements
  const statements = cleanSql
    .split(';')
    .map(st => st.trim())
    .filter(st => st.length > 0);

  let connection;
  let successfulPassword = null;

  for (const password of passwordsToTry) {
    try {
      console.log(`Attempting connection to MySQL with user 'root' and password: '${password}'`);
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: 'root',
        password: password
      });
      successfulPassword = password;
      console.log('✔ Connected successfully to MySQL!');
      break;
    } catch (err) {
      console.log(`✖ Connection failed with password '${password}': ${err.message}`);
    }
  }

  if (!connection) {
    console.error('\n❌ Could not connect to MySQL with any of the tried passwords.');
    console.error('Please edit backend/.env with your correct DB_PASSWORD and try again.');
    process.exit(1);
  }

  try {
    console.log(`\nStarting database setup... Total statements to run: ${statements.length}`);
    
    // Execute each SQL statement sequentially
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const firstLine = statement.split('\n')[0].trim().substring(0, 60);
      console.log(`Running statement ${i + 1}/${statements.length}: ${firstLine}...`);
      await connection.query(statement);
    }

    console.log('\n✔ All SQL statements executed successfully!');

    // Update .env file with the successful password and database name
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    envContent = envContent.replace(
      /DB_PASSWORD=.*/,
      `DB_PASSWORD=${successfulPassword}`
    );
    envContent = envContent.replace(
      /DB_NAME=.*/,
      `DB_NAME=petpal_db`
    );

    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('✔ Updated backend/.env with correct credentials!');
    
    await connection.end();
    console.log('\n🎉 MySQL setup is fully complete and connected!');
  } catch (err) {
    console.error(`❌ SQL Execution Error: ${err.message}`);
    if (connection) await connection.end();
    process.exit(1);
  }
}

setupDatabase();
