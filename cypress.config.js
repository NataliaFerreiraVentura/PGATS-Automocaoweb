const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Limpeza automática de arquivos antigos
      on('before:run', () => {
        const cleanupFolders = ['cypress/screenshots', 'cypress/videos', 'cypress/reports'];
        
        cleanupFolders.forEach(folder => {
          if (fs.existsSync(folder)) {
            // Remove arquivos mais antigos que 7 dias
            const files = fs.readdirSync(folder);
            const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            
            files.forEach(file => {
              const filePath = path.join(folder, file);
              const stats = fs.statSync(filePath);
              
              if (stats.mtime.getTime() < sevenDaysAgo) {
                try {
                  if (stats.isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                  } else {
                    fs.unlinkSync(filePath);
                  }
                  console.log(`🧹 Arquivo antigo removido: ${filePath}`);
                } catch (error) {
                  console.warn(`⚠️ Não foi possível remover: ${filePath}`);
                }
              }
            });
          }
        });
      });
      
      return config;
    },
    
    // Configurações otimizadas para projeto limpo
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // Configurações de vídeo otimizadas para tamanho
    video: false, // Desabilitado por padrão para economizar espaço
    videoCompression: 32, // Compressão alta quando habilitado
    videoUploadOnPasses: false,
    
    // Viewport padrão
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts otimizados
    defaultCommandTimeout: 6000,
    requestTimeout: 8000,
    responseTimeout: 8000,
    
    // Performance
    watchForFileChanges: false,
    chromeWebSecurity: false,
    
    // Retry mínimo
    retries: {
      runMode: 1,
      openMode: 0
    },
    
    // Configurações para economia de memória
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 3
  },
});
