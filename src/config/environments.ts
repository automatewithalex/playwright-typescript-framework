export type EnvironmentName = 'production' | 'local';

export interface Environment {
  automateWithAlex: string;
  testBlocks: string;
  testBlocksApi: string;
}

export const environments: Record<EnvironmentName, Environment> = {
  production: {
    automateWithAlex: 'https://www.automatewithalex.com',
    testBlocks: 'https://testblocks.io',
    testBlocksApi: 'https://api.testblocks.io',
  },
  local: {
    automateWithAlex: 'http://localhost:3000',
    testBlocks: 'http://localhost:5173',
    testBlocksApi: 'http://localhost:3001',
  },
};
