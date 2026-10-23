import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // Agar tidak terjadi error SSL saat koneksi ke PostgreSQL lokal Docker
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    // Koneksi Redis
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  // Konfigurasi Vite HMR & Host agar Medusa Admin bisa diakses via domain publik di Dokploy
  admin: {
    vite: (config) => {
      return {
        server: {
          host: "0.0.0.0",
          allowedHosts: [
            "admin.oplay.id",
            "localhost",
            "127.0.0.1",
            ".oplay.id"
          ],
          hmr: {
            port: 5173,
            clientPort: 5173,
          },
        },
      }
    },
  },
})