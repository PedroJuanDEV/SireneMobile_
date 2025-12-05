const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

(async () => {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) {
      console.error('DATABASE_URL não definido. Verifique o arquivo .env');
      process.exit(2);
    }
    console.log('Usando DATABASE_URL (início):', url.length > 80 ? url.slice(0, 80) + '...' : url);

    const client = new MongoClient(url, { connectTimeoutMS: 10000, serverSelectionTimeoutMS: 10000 });
    console.log('Tentando conectar...');
    await client.connect();
    console.log('Conectado com sucesso ao MongoDB');
    try {
      const admin = client.db().admin();
      const info = await admin.serverStatus();
      console.log('serverStatus recebido, version:', info.version);
    } catch (e) {
      console.warn('Não foi possível obter serverStatus (pode ser por permissões):', e && e.message);
    }
    await client.close();
  } catch (e) {
    console.error('Erro na conexão:', e);
    process.exitCode = 1;
  }
})();
