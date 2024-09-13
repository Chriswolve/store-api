import mongoose from 'mongoose';
import settings from '../config/settings.js';

const uri = settings.LOCAL
  ?`${settings.DB_DRIVER}://${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_NAME}`
  : `${settings.DB_DRIVER}://${settings.DB_USER}:${settings.DB_PASSWORD}@${settings.DB_HOST}/${settings.DB_NAME}?retryWrites=true&w=majority&appName=${settings.DB_CLUSTER}`;
//mongodb+srv://<db_username>:<db_password>@mycluster.atuwo.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster

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

