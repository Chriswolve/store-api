import mongoose from 'mongoose';
import settings from '../config/settings.js';

const uri = `${settings.DB_DRIVER}://${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_NAME}`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected...');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    console.log('MongoDB disconnected...');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    process.exit(1);
  }
};

// Función para validar ObjectId
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};


export default {
  connectDB,
  disconnectDB
}

