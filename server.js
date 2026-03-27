require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const audioDownloader = require('./routes/downloader');
const { downloadFolder, tempFolder } = require('./utils/storage');
console.log('🔧 [SERVER] Módulo downloader carregado:', typeof audioDownloader);

const app = express();
const PORT = process.env.PORT || 3001;

// Criar pastas necessárias
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder, { recursive: true });
}
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
console.log('🔧 [SERVER] Montando rotas da API...');
app.use('/api', audioDownloader);
console.log('✅ [SERVER] Rotas da API montadas');

// Rota de teste direta
app.get('/api/testdirect', (req, res) => {
    console.log('🎯 [DIRECT] Rota /api/testdirect chamada');
    res.json({ message: 'Test direct route working' });
});

// Arquivos estáticos
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'online', message: 'Servidor funcionando!' });
});

// Tratamento de erros 404
app.use((req, res) => {
  console.log(`❌ [404] Rota não encontrada: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🤖 ${config.appFullName} v${config.version}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Pasta de downloads: ${downloadFolder}`);
  console.log(`📁 Pasta temporária: ${tempFolder}`);
  console.log(`${'='.repeat(60)}\n`);
});

module.exports = app;
