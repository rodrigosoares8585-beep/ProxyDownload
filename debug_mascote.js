#!/usr/bin/env node

/**
 * Script de Debug - Verifica se mascote.png está acessível
 * Use: node debug_mascote.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 DEBUG MASCOTE - PROXY Audio Downloader\n');
console.log('='.repeat(60));

// Verificar arquivo local
const mascotePath = path.join(__dirname, 'public', 'images', 'mascote.png');
console.log(`📁 Procurando arquivo em: ${mascotePath}`);

if (fs.existsSync(mascotePath)) {
    const stats = fs.statSync(mascotePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ARQUIVO ENCONTRADO!`);
    console.log(`   📦 Tamanho: ${sizeKB} KB`);
    console.log(`   📅 Modificado: ${stats.mtime}`);
} else {
    console.log(`❌ ARQUIVO NÃO ENCONTRADO!`);
    console.log(`   Procurando em: ${mascotePath}`);
}

// Listar arquivos na pasta
console.log(`\n📂 Arquivos em public/images/:`);
const imagesDir = path.join(__dirname, 'public', 'images');
if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    if (files.length > 0) {
        files.forEach(file => console.log(`   📄 ${file}`));
    } else {
        console.log(`   ⚠️  Pasta vazia!`);
    }
} else {
    console.log(`   ❌ Pasta não existe!`);
}

console.log('\n' + '='.repeat(60));
console.log('\n💡 Próximos passos:\n');
console.log('1️⃣  Certifique-se de que mascote.png está em:');
console.log(`    ${mascotePath}\n`);
console.log('2️⃣  Execute server.js:');
console.log('    npm start\n');
console.log('3️⃣  Abra no navegador:');
console.log('    http://localhost:3000\n');
console.log('4️⃣  Abra console (F12) e procure por mensagens ✅ ou ❌\n');
console.log('='.repeat(60) + '\n');
