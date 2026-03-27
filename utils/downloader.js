const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { downloadFolder, tempFolder } = require('./storage');

class DownloaderManager {
    constructor() {
        this.ensureFolders();
    }

    ensureFolders() {
        if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder, { recursive: true });
        }
        if (!fs.existsSync(tempFolder)) {
            fs.mkdirSync(tempFolder, { recursive: true });
        }
    }

    async downloadAudio(url) {
        const timestamp = Date.now();
        const randomId = crypto.randomBytes(4).toString('hex');
        const fileName = `audio_${timestamp}_${randomId}.mp3`;
        const outputPath = path.join(downloadFolder, fileName);

        try {
            // Usar yt-dlp para baixar o áudio
            const command = `yt-dlp -x --audio-format mp3 --audio-quality 192 -o "${path.join(tempFolder, '%(title)s_%(id)s')}" "${url}" 2>&1`;
            
            console.log(`Iniciando download de: ${url}`);
            const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
            console.log('Saída yt-dlp:', output);

            // Encontrar o arquivo baixado
            const files = fs.readdirSync(tempFolder);
            const mp3File = files.find(f => f.endsWith('.mp3'));

            if (!mp3File) {
                throw new Error('Nenhum arquivo MP3 foi gerado');
            }

            const tempPath = path.join(tempFolder, mp3File);
            fs.renameSync(tempPath, outputPath);

            console.log(`Áudio salvo em: ${outputPath}`);
            return outputPath;

        } catch (error) {
            const details = error?.stdout || error?.stderr || error?.message || 'Erro desconhecido';
            console.error('Erro ao fazer download:', details);
            throw new Error(this.getFriendlyErrorMessage(details));
        }
    }

    getFriendlyErrorMessage(details) {
        const normalizedDetails = String(details).toLowerCase();

        if (normalizedDetails.includes('instagram') && normalizedDetails.includes('login required')) {
            return 'O Instagram bloqueou este video para acesso sem login. Tente outro link publico ou configure cookies de uma conta.';
        }

        if (normalizedDetails.includes('instagram') && normalizedDetails.includes('rate-limit reached')) {
            return 'O Instagram limitou temporariamente as requisicoes deste servidor. Tente novamente mais tarde.';
        }

        if (normalizedDetails.includes('ffmpeg') && normalizedDetails.includes('not found')) {
            return 'O servidor nao encontrou o FFmpeg durante o processamento do audio.';
        }

        if (normalizedDetails.includes('yt-dlp') && normalizedDetails.includes('not found')) {
            return 'O servidor nao encontrou o yt-dlp durante o processamento do video.';
        }

        return 'Falha ao processar o video no servidor. Verifique os logs do Render para ver o detalhe do yt-dlp.';
    }

    async cleanupOldFiles(maxAgeMinutes = 60) {
        try {
            const now = Date.now();
            const maxAge = maxAgeMinutes * 60 * 1000;

            const cleanupFolder = (folder) => {
                const files = fs.readdirSync(folder);
                files.forEach(file => {
                    const filePath = path.join(folder, file);
                    const stats = fs.statSync(filePath);
                    if (now - stats.mtimeMs > maxAge) {
                        fs.unlinkSync(filePath);
                    }
                });
            };

            cleanupFolder(downloadFolder);
            cleanupFolder(tempFolder);
        } catch (error) {
            console.error('Erro ao limpar arquivos:', error);
        }
    }
}

const downloaderManager = new DownloaderManager();

// Limpar arquivos antigos a cada 30 minutos
setInterval(() => {
    downloaderManager.cleanupOldFiles(60);
}, 30 * 60 * 1000);

module.exports = { downloaderManager };
