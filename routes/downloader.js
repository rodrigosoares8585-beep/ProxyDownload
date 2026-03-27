const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { downloaderManager } = require('../utils/downloader');
const { downloadFolder } = require('../utils/storage');

console.log('🔧 [ROUTES] Carregando rotas do downloader...');

// Middleware para log de todas as requisições da API
router.use((req, res, next) => {
    console.log(`📡 [API] ${req.method} ${req.path}`);
    next();
});

console.log('🔧 [ROUTES] Stack do router:', router.stack.map(layer => layer.route ? layer.route.path : 'middleware'));

// Rota para download
router.post('/download', async (req, res) => {
    try {
        const { url } = req.body;

        console.log('🎵 [API] Recebida requisição de download para URL:', url);

        if (!url) {
            console.log('❌ [API] URL não fornecida');
            return res.status(400).json({ error: 'URL é obrigatória' });
        }

        // Validar URL
        try {
            new URL(url);
            console.log('✅ [API] URL validada');
        } catch {
            console.log('❌ [API] URL inválida');
            return res.status(400).json({ error: 'URL inválida' });
        }

        // Verificar plataforma suportada
        const supportedPlatforms = ['youtube.com', 'youtu.be', 'instagram.com', 'fb.watch', 'facebook.com'];
        const isSupported = supportedPlatforms.some(domain => url.includes(domain));

        if (!isSupported) {
            console.log('❌ [API] Plataforma não suportada:', url);
            return res.status(400).json({ error: 'Plataforma não suportada' });
        }

        console.log('🚀 [API] Iniciando download...');

        // Iniciar download
        const filePath = await downloaderManager.downloadAudio(url);

        console.log('✅ [API] Download concluído, arquivo:', filePath);

        // Verificar se o arquivo existe
        if (!fs.existsSync(filePath)) {
            console.log('❌ [API] Arquivo não encontrado após download');
            return res.status(500).json({ error: 'Erro ao processar o áudio' });
        }

        // Enviar arquivo
        const fileName = path.basename(filePath);
        console.log('📤 [API] Enviando arquivo:', fileName);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        // Deletar arquivo após envio (opcional)
        fileStream.on('end', () => {
            setTimeout(() => {
                try {
                    fs.unlinkSync(filePath);
                    console.log('🗑️ [API] Arquivo temporário deletado:', fileName);
                } catch (err) {
                    console.error('❌ [API] Erro ao deletar arquivo:', err);
                }
            }, 1000);
        });

    } catch (error) {
        console.error('❌ [API] Erro no download:', error.message);
        res.status(500).json({ error: error.message || 'Erro ao processar' });
    }
});

// Rota para teste
console.log('🔧 [ROUTES] Definindo rota /test');
router.get('/test', (req, res) => {
    res.json({ message: 'API funcionando corretamente' });
});

// Rota simples para debug
console.log('🔧 [ROUTES] Definindo rota /debug');
router.get('/debug', (req, res) => {
    res.json({ message: 'Debug route working', timestamp: new Date().toISOString() });
});

module.exports = router;
