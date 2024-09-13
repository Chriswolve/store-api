import { faker } from '@faker-js/faker';
import CategoryModel from '../frameworks/database/models/CategoryModel.js';

export default async function seedCategories() {
  const categories = Array.from({ length: 10 }, () => ({
    name: faker.commerce.department(),
    description: faker.lorem.sentences(2),
    image: faker.image.url(),
  }));

  try {
    await CategoryModel.insertMany(categories);
    console.log(`${categories.length} categories have been seeded successfully.`);
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}
