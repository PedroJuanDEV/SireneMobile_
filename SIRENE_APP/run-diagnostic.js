const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const { execSync } = require('child_process');

dotenv.config();

(async () => {
  try {
    const orig = process.env.DATABASE_URL;
    if (!orig) {
      console.error('.env ou DATABASE_URL não encontrado.');
      process.exit(2);
    }

    const suffix = (orig.includes('?') ? '&' : '?') + 'tls=true&tlsAllowInvalidCertificates=true';
    const modified = orig + suffix;
    console.log('Usando DATABASE_URL modificado (início):', modified.length > 120 ? modified.slice(0,120) + '...' : modified);

    console.log('\n== Teste de conexão via driver mongodb ==');
    try {
      const client = new MongoClient(modified, { connectTimeoutMS: 10000, serverSelectionTimeoutMS: 10000 });
      await client.connect();
      console.log('Conectado com sucesso (tls permissivo).');
      await client.close();
    } catch (e) {
      console.error('Falha na conexão com tls permissivo:', e && e.message ? e.message : e);
    }

    console.log('\n== Tentativa de prisma db push (com DATABASE_URL temporário) ==');
    try {
      const env = Object.assign({}, process.env, { DATABASE_URL: modified });
      const out = execSync('npx prisma db push', { env, stdio: 'inherit' });
      // execSync with stdio:inherit will already print output
    } catch (e) {
      console.error('\nprisma db push falhou (saída acima).');
    }

  } catch (err) {
    console.error('Erro inesperado:', err);
    process.exit(1);
  }
})();
