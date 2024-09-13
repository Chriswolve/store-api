class Product {
  static modelName = 'products';

  static requiredFields = [
    'name',
    'category_id',
    'price',
    'stock',
    'image',
  ];

  constructor({ id, category_id, name, price, image, stock }) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }
}

export default Product;
