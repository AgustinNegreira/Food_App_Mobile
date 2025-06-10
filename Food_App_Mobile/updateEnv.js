const fs = require('fs');
const axios = require('axios');

const NGROK_API_URL = 'http://127.0.0.1:4040/api/tunnels';
const ENV_FILE = '.env';
const ENV_VAR_NAME = 'EXPO_PUBLIC_API_URL';
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 1000; // 1 segundo

async function getNgrokUrl() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get(NGROK_API_URL);
      const tunnels = response.data.tunnels;

      const httpsTunnel = tunnels.find(tunnel => tunnel.public_url.startsWith('https://'));
      if (httpsTunnel) {
        return httpsTunnel.public_url;
      }

      console.log(`Intento ${attempt}: Túnel HTTPS no encontrado aún, esperando...`);
    } catch (error) {
      console.log(`Intento ${attempt}: Error consultando ngrok API, esperando...`);
    }

    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
  }

  throw new Error('No se pudo obtener la URL del túnel HTTPS después de varios intentos.');
}

async function updateEnv() {
  try {
    const apiUrl = await getNgrokUrl();
    console.log(`✅ URL del túnel HTTPS encontrada: ${apiUrl}`);

    let envContent = '';
    if (fs.existsSync(ENV_FILE)) {
      envContent = fs.readFileSync(ENV_FILE, 'utf-8');
    }

    const apiVar = `${ENV_VAR_NAME}=${apiUrl}`;
    const regex = new RegExp(`^${ENV_VAR_NAME}=.*$`, 'm');

    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, apiVar);
    } else {
      envContent += `\n${apiVar}\n`;
    }

    fs.writeFileSync(ENV_FILE, envContent.trim());

    console.log(`✅ Variable ${ENV_VAR_NAME} actualizada en ${ENV_FILE}`);

  } catch (error) {
    console.error('❌ Error al obtener la URL de ngrok:', error.message);
  }
}

updateEnv();
