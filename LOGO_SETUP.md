# 🤖 Como Adicionar a Logo PROXY

## 📁 Localização do Arquivo

Você deve colocar a logo em:
```
/home/rodrigo/bot_local/src/Site Dowloand de Audio Proxy/public/images/logo.png
```

## 🖼️ Requisitos da Logo

- **Nome:** `logo.png`
- **Formato:** PNG (com fundo transparente é ideal)
- **Tamanho recomendado:** 100x100px até 500x500px
- **Resolução:** Mínimo 72 DPI
- **Peso:** Até 500KB
- **Fundo:** Transparente (opcional, mas recomendado)

## ✨ Características de Exibição

A logo será mostrada com:
- 🎯 **Altura:** 80px (se ligar o servidor)
- 💫 **Efeito de Sombra:** Drop shadow roxo/azul
- 🌊 **Animação:** Flutuação suave vertical (3 segundos)
- 📍 **Posição:** À esquerda do texto "PROXY" no header
- 📱 **Responsiva:** Ajusta em tablets (60px) e mobile (50px)

## 📸 Copiando a Logo

### Opção 1: Via Terminal
```bash
cp /caminho/da/sua/logo.png "/home/rodrigo/bot_local/src/Site Dowloand de Audio Proxy/public/images/logo.png"
```

### Opção 2: Copiar Manualmente
1. Renomeie seu arquivo para `logo.png`
2. Cole em: `Site Dowloand de Audio Proxy/public/images/`

## ✅ Verificar instalação

Depois de colocar a logo, execute:
```bash
npm start
```

E abra: `http://localhost:3000`

Você verá a logo com:
- 📍 Logo flutuante no header
- ✨ Efeito de sombra roxo/azul
- 🎭 Animação flutuante descontraída

## 🎨 Dicas de Design

Para melhor resultado, use uma logo que:
- ✅ Tenha fundo transparente (PNG)
- ✅ Seja quadrada ou levemente retangular
- ✅ Combine com as cores roxo/azul da marca
- ✅ Seja legível mesmo em tamanho reduzido
- ✅ Tenha detalhes que permaneçam claros

## ❓ Problemas?

Se a logo não aparecer:
1. ✅ Verifique se o arquivo está em `public/images/logo.png`
2. ✅ Limpe o cache do navegador (Ctrl+Shift+Delete)
3. ✅ Reinicie o servidor Node.js
4. ✅ Verifique o console (F12) para erros

## 💡 Personalização

Para ajustar o tamanho da logo, edite [style.css](../public/css/style.css):

```css
.logo-image {
    height: 80px;  /* Altere para o tamanho desejado */
    width: auto;
    max-width: 200px;
}
```

---

**Última atualização:** Março 2026  
**Formato:** PNG  
**Tamanho Recomendado:** 100-200px  
