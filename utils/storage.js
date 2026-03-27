const isHostedEnvironment = process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || process.env.NODE_ENV === 'production';

const defaultDownloadFolder = isHostedEnvironment ? '/tmp/proxy-downloads' : './downloads';
const defaultTempFolder = isHostedEnvironment ? '/tmp/proxy-temp' : './temp';

module.exports = {
    downloadFolder: process.env.DOWNLOAD_FOLDER || defaultDownloadFolder,
    tempFolder: process.env.TEMP_FOLDER || defaultTempFolder,
};
