export interface LoginTestData {
    testName: string;
    username: string;
    password: string;
    expected: 'success' | 'failure';
    expectedError?: string;
  }
  