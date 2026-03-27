document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 PROXY - App iniciado');
    
    // Debug de imagem
    console.log('Testando carregamento de mascote.png...');
    fetch('/images/mascote.png')
        .then(res => {
            if(res.ok) console.log('✅ Mascote encontrado em /images/mascote.png (Status: 200)');
            else console.log(`❌ Mascote retornou status: ${res.status}`);
            return res.blob();
        })
        .then(blob => console.log(`📦 Tamanho da imagem: ${(blob.size / 1024).toFixed(2)} KB`))
        .catch(err => {
            console.error('❌ Erro ao carregar mascote:', err);
            console.log('Tentando caminho alternativo: ./images/mascote.png');
        });
    
    const urlInput = document.getElementById('urlInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const urlError = document.getElementById('urlError');
    const statusSection = document.getElementById('statusSection');
    const successSection = document.getElementById('successSection');
    const statusMessage = document.getElementById('statusMessage');
    const progressBar = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const downloadLink = document.getElementById('downloadLink');
    const fileName = document.getElementById('fileName');
    const resetBtn = document.getElementById('resetBtn');

    // Event Listeners
    downloadBtn.addEventListener('click', handleDownload);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleDownload();
    });
    resetBtn.addEventListener('click', resetForm);

    async function handleDownload() {
        const url = urlInput.value.trim();

        console.log('🎵 Iniciando download para URL:', url);

        // Validação
        if (!url) {
            showError('Digite uma URL válida');
            return;
        }

        if (!isValidUrl(url)) {
            showError('URL inválida. Use um link do YouTube, Instagram ou Facebook');
            return;
        }

        if (!isSupportedPlatform(url)) {
            showError('Plataforma não suportada. Use YouTube, Instagram ou Facebook');
            console.log('❌ Plataforma não suportada para URL:', url);
            return;
        }

        console.log('✅ URL validada, iniciando download...');

        // Limpar erros
        urlError.style.display = 'none';

        // Mostrar status
        statusSection.style.display = 'block';
        successSection.style.display = 'none';
        downloadBtn.disabled = true;
        resetProgress();

        try {
            statusMessage.textContent = 'Validando URL...';
            updateProgress(10);

            statusMessage.textContent = 'Conectando ao servidor...';
            updateProgress(20);

            console.log('📡 Fazendo requisição para /api/download...');

            // Chamar API do backend
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            console.log('📡 Resposta recebida:', response.status, response.statusText);

            if (!response.ok) {
                const error = await response.json();
                console.error('❌ Erro da API:', error);
                throw new Error(error.error || 'Erro ao baixar o áudio');
            }

            statusMessage.textContent = 'Processando vídeo...';
            updateProgress(50);

            console.log('📦 Baixando arquivo...');

            // Simular progresso enquanto aguarda o file (melhor seria com WebSocket)
            const interval = setInterval(() => {
                const current = parseInt(progressFill.style.width) || 50;
                if (current < 90) {
                    updateProgress(current + Math.random() * 15);
                }
            }, 500);

            const blob = await response.blob();
            clearInterval(interval);

            console.log('✅ Arquivo baixado, tamanho:', blob.size, 'bytes');

            statusMessage.textContent = 'Finalizando...';
            updateProgress(95);

            // Extrair nome do arquivo
            const contentDisposition = response.headers.get('content-disposition');
            let fileNameValue = 'audio.mp3';
            
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?([^"]*)"?/);
                if (match && match[1]) {
                    fileNameValue = decodeURIComponent(match[1]);
                }
            }

            // Criar URL do blob e disparar download
            const blobUrl = window.URL.createObjectURL(blob);
            downloadLink.href = blobUrl;
            downloadLink.download = fileNameValue;

            updateProgress(100);
            statusMessage.textContent = 'Pronto!';

            // Aguardar um pouco antes de mostrar sucesso
            setTimeout(() => {
                statusSection.style.display = 'none';
                successSection.style.display = 'block';
                fileName.textContent = `Arquivo: ${fileNameValue}`;
            }, 500);

            // Auto-iniciar download após 500ms
            setTimeout(() => {
                downloadLink.click();
            }, 500);

        } catch (error) {
            showError(error.message || 'Erro ao processar o vídeo. Tente novamente.');
            statusSection.style.display = 'none';
        } finally {
            downloadBtn.disabled = false;
        }
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function isSupportedPlatform(url) {
        const supportedDomains = [
            'youtube.com',
            'youtu.be',
            'instagram.com',
            'fb.watch',
            'facebook.com'
        ];
        return supportedDomains.some(domain => url.includes(domain));
    }

    function showError(message) {
        urlError.textContent = message;
        urlError.style.display = 'block';
        statusSection.style.display = 'none';
        successSection.style.display = 'none';
    }

    function updateProgress(percent) {
        percent = Math.min(percent, 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = Math.floor(percent) + '%';
    }

    function resetProgress() {
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
    }

    function resetForm() {
        urlInput.value = '';
        urlError.style.display = 'none';
        statusSection.style.display = 'none';
        successSection.style.display = 'none';
        resetProgress();
        downloadBtn.disabled = false;
        urlInput.focus();
    }
});
