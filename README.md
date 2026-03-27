# PROXY - Audio Downloader - Guia Completo

## 📋 Requisitos

- **Node.js** 14+ 
- **npm** ou **yarn**
- **FFmpeg** (para conversão de áudio)
- **yt-dlp** (para download de vídeos)

## 🚀 Instalação Rápida

### 1. Instalar Dependências do Node.js
```bash
npm install
```

### 2. Instalar FFmpeg

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**macOS (com Homebrew):**
```bash
brew install ffmpeg
```

**Windows (com Chocolatey):**
```bash
choco install ffmpeg
```

### 3. Instalar yt-dlp

**Ubuntu/Debian:**
```bash
sudo apt install yt-dlp
```

**macOS:**
```bash
brew install yt-dlp
```

**Windows (com pip):**
```bash
pip install yt-dlp
```

Ou baixe direto de: https://github.com/yt-dlp/yt-dlp/releases

### 4. Configurar Variáveis (.env)
```bash
PORT=3000
NODE_ENV=development
DOWNLOAD_FOLDER=./downloads
TEMP_FOLDER=./temp
MAX_FILE_SIZE=500
```

## 🏃 Execução

### Desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Produção:
```bash
npm start
```

O site estará disponível em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
Site Dowloand de Audio Proxy/
├── public/                    # Arquivos da interface web
│   ├── index.html            # Página principal
│   ├── js/
│   │   └── app.js            # Lógica do frontend
│   └── css/
│       ├── style.css         # Estilos principais
│       └── responsive.css    # Responsividade
├── routes/
│   └── downloader.js         # Rotas da API
├── utils/
│   └── downloader.js         # Lógica de download
├── downloads/                # Pasta de downloads (gerada pelo app)
├── temp/                     # Pasta temporária (gerada pelo app)
├── server.js                 # Servidor Express
├── package.json              # Dependências
├── .env                      # Variáveis de ambiente
└── README.md                 # Este arquivo
```

## 🎯 Funcionalidades

✅ Download de áudio do YouTube  
✅ Download de áudio do Instagram  
✅ Download de áudio do Facebook  
✅ Conversão automática para MP3  
✅ Interface responsiva  
✅ Progresso em tempo real  
✅ Limpeza automática de arquivos antigos  

## 🔧 API Endpoints

### POST /api/download
Faz download do áudio de um vídeo

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
- Arquivo MP3 (binary)
- Header: `Content-Disposition: attachment; filename="audio.mp3"`

**Erros:**
```json
{
  "error": "Descrição do erro"
}
```

### GET /api/test
Verifica se a API está funcionando

**Response:**
```json
{
  "message": "API funcionando corretamente"
}
```

### GET /health
Health check do servidor

**Response:**
```json
{
  "status": "online",
  "message": "Servidor funcionando!"
}
```

## � Deploy para Produção

### Plataformas Recomendadas

#### 1. **Railway** (Mais Fácil)
1. Acesse: https://railway.app
2. Conecte seu repositório Git
3. Railway detecta automaticamente Node.js
4. Adicione variável: `NODE_ENV=production`
5. Deploy automático com domínio gratuito

#### 2. **Render**
1. Acesse: https://render.com
2. Crie "Web Service"
3. Conecte repositório
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Adicione variável: `NODE_ENV=production`

#### 3. **Heroku**
1. Instale Heroku CLI
2. `heroku create seu-app-proxy`
3. `git push heroku main`
4. Adicione variável: `NODE_ENV=production`

### Requisitos para Produção

- **Node.js 18+**
- **yt-dlp** disponível no sistema
- **Espaço em disco** para arquivos temporários
- **Variável PORT** (definida automaticamente pelas plataformas)

### Otimização para Produção

- Arquivos temporários são limpos automaticamente
- Limite de tamanho de arquivo configurável
- CORS habilitado para web
- Tratamento de erros robusto

## 📱 Responsividade Mobile

O site é totalmente responsivo e otimizado para:
- 📱 iPhone (iOS Safari)
- 🤖 Android (Chrome, Firefox)
- 💻 Desktop (Chrome, Firefox, Safari, Edge)

**Funcionalidades Mobile:**
- Toque otimizado nos botões
- Prevenção de zoom no iOS
- Layout adaptável
- Download direto no navegador

## �🐛 Troubleshooting

### Problema: "yt-dlp comando não encontrado"
**Solução:** Instale o yt-dlp via pip: `pip install yt-dlp` ou `pip3 install yt-dlp`

### Problema: "FFmpeg não encontrado"
**Solução:** Instale o FFmpeg para seu sistema operacional (ver Instalação acima)

### Problema: Erro 500 ao fazer download
**Solução:** 
1. Verifique se a URL é válida
2. Teste a URL diretamente com yt-dlp em terminal
3. Verifique os logs do servidor

### Problema: Arquivo muito grande
**Solução:** A conversão pode levar tempo. Aguarde pacientemente. O limite padrão é 500MB.

## ⚙️ Configurações Avançadas

### Alterar Qualidade de Áudio
No arquivo `utils/downloader.js`, altere:
```javascript
// De 192 para a qualidade desejada (128, 192, 256, etc.)
const command = `yt-dlp -x --audio-format mp3 --audio-quality 192 ...`
```

### Alterar Tempo de Limpeza
No arquivo `utils/downloader.js`:
```javascript
// De 60 minutos para o tempo desejado
setInterval(() => {
    downloaderManager.cleanupOldFiles(60);
}, 30 * 60 * 1000);
```

### Limitar Tamanho de Arquivo
Edite o `MAX_FILE_SIZE` no arquivo `.env` (em MB)

## 📝 Notas Importantes

⚠️ **Respeite os Direitos Autorais**: Use apenas para conteúdo pessoal ou com permissão do proprietário.

⚠️ **Limite de Downloads**: Configure limite apropriado em produção para evitar abuso.

⚠️ **Segurança**: A partir do próximo update, implemente:
- Validação de rate limiting
- Autenticação se necessário
- Logs de auditoria
- HTTPS em produção

## 📞 Suporte

Para problemas ou sugestões, verifique:
1. Logs do servidor
2. Console do navegador (F12)
3. Documentação oficial do yt-dlp: https://github.com/yt-dlp/yt-dlp

## 📄 Licença

MIT

---

**Projeto:** PROXY - Audio Downloader  
**Versão:** 1.0.0  
**Última atualização:** Março 2026
