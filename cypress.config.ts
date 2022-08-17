import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';
import { defineConfig } from 'cypress';

const { GoogleSocialLogin } = require('cypress-social-logins').plugins;

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 5,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  env: {
    extensionLength: '2',
    clearUnit: 'true',
    propDetailsToDefault: 'true',
  },
  videoUploadOnPasses: false,
  videoCompression: 51,
  e2e: {
    specPattern: [
      './integration/**/*.ts',
      './e2e/features/*.{feature,features,ts}',
      './e2e/features/**/*.{feature,features,ts}',
    ],
    baseUrl: 'https://google.com',
    experimentalSessionAndOrigin: true,
    supportFile: false,
    setupNodeEvents,
    env: {
      environment: 'dev',
    }
    
  },
});

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) : Promise<Cypress.PluginConfigOptions> {
  let testStore: any = {};

  on(
    'file:preprocessor',
    browserify(config, {
      typescript: require.resolve('typescript'),
    })
  );
  await addCucumberPreprocessorPlugin(on, config);
  
  require('cypress-terminal-report/src/installLogsPrinter')(on, {
    printLogsToConsole: 'onFail',
    includeSuccessfulHookLogs: true,
  });

  on('task', {
    GoogleSocialLogin
  });
  
  return config;
}
