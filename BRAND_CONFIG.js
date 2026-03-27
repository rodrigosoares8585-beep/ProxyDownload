/**
 * PROXY - Audio Downloader
 * Marca: PROXY™
 * Versão: 1.0
 * 
 * Arquivos de Branding:
 * - public/index.html (Logo, título, footer com marca)
 * - public/css/style.css (Estilos, cores, animações)
 * - config.js (Configurações centralizadas)
 * - BRAND_GUIDE.md (Guia completo da marca)
 * - package.json (Metadados do projeto)
 * - README.md (Documentação com marca)
 */

const BRAND_CONFIG = {
  name: 'PROXY',
  trademark: 'PROXY™',
  tagline: 'Sua marca de qualidade',
  fullName: 'PROXY - Audio Downloader',
  version: '1.0.0',
  year: 2026,
  
  // Cores Oficiais
  colors: {
    primary: '#6d28d9',
    primaryLight: '#7c3aed',
    primaryDark: '#5b21b6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    background: '#0f172a',
    backgroundLight: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155'
  },
  
  // Plataformas Suportadas
  platforms: ['YouTube', 'Instagram', 'Facebook'],
  
  // Redes Sociais (quando aplicável)
  social: {
    github: 'https://github.com/seu-usuario/proxy',
    twitter: '@ProxyAudioDL',
    website: 'www.proxy-audio.com'
  },
  
  // Configurações Técnicas
  technical: {
    maxFileSize: 500, // MB
    audioQuality: 192, // kbps
    cleanupTimeMinutes: 60,
    serverPort: 3000
  }
};

console.log(`🤖 ${BRAND_CONFIG.fullName} v${BRAND_CONFIG.version}`);
console.log(`Marca Oficial: ${BRAND_CONFIG.trademark}`);

module.exports = BRAND_CONFIG;
