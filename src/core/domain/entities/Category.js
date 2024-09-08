class Category {
  static modelName = 'categories';

  static requiredFields = [
    'name',
    'description',
    'image',
  ];

  constructor({ id, name, description, image }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }
}

export default Category;
