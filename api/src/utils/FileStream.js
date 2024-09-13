import { promises as fs } from 'fs';


class FileStream {
  constructor(filePath) {
    this.filePath = filePath;
  }
  async read() {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }
  async write(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}

export default FileStream;
