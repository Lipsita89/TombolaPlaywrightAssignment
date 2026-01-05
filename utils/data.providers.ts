import fs from 'fs';
import path from 'path';
import { LoginTestData } from '../types/LoginTestData';

export class DataProvider {

  private static readFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }

    return fs.readFileSync(filePath, 'utf8');
  }

  static getJson(relativePath: string) {
    try {
      return JSON.parse(this.readFile(relativePath));
    } catch (error) {
      throw new Error(`Invalid JSON in file: ${relativePath}`);
    }
  }

  static getLoginTests(relativePath: string): LoginTestData[] {
    const json = this.getJson(relativePath);
  
    if (!Array.isArray(json.loginTests)) {
      throw new Error(
        'Expected "loginTests" to be an array in logindata.json'
      );
    }
    return json.loginTests as LoginTestData[];
  }
}
