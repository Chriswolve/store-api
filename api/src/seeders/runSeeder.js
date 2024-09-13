import { connectDB, disconnectDB } from '../frameworks/database/db.js';

// Obtenemos el nombre del seeder desde la línea de comandos
const seederName = process.argv[2];

if (!seederName) {
  console.error('Please provide a seeder name to run.');
  process.exit(1);
}

// Dinámicamente importar el seeder basado en el nombre proporcionado
async function runSeeder() {
  try {
    await connectDB();

    const seederModule = await import(`./${seederName}.js`);
    if (typeof seederModule.default !== 'function') {
      throw new Error(`Seeder ${seederName} does not export a default function`);
    }

    await seederModule.default();

    console.log(`${seederName} seeder executed successfully.`);
  } catch (error) {
    console.error(`Error running the ${seederName} seeder:`, error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

runSeeder();
