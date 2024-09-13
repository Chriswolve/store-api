import { faker } from '@faker-js/faker';
import ProductModel from '../frameworks/database/models/ProductModel.js';
import CategoryModel from '../frameworks/database/models/CategoryModel.js';

export default async function seedProducts() {
  try {
    const categories = await CategoryModel.find();
    if (categories.length === 0) {
      throw new Error('No categories found. Please seed categories first.');
    }

    const products = Array.from({ length: 100 }, () => {
      const category = faker.helpers.arrayElement(categories);
      return {
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 1, max: 10000 }),
        stock: faker.number.int({ min: 0, max: 10000 }),
        image: faker.image.url(),
        category_id: category._id,
      };
    });

    await ProductModel.insertMany(products);
    console.log(`${products.length} products have been seeded successfully.`);
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
