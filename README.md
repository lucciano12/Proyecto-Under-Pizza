# Proyecto Rótulos QR

Monorepo para el sistema de gestión de rótulos con QR.

## Estructura

- **apps/api**: Backend NestJS + Mongoose (MongoDB).
- **apps/web**: Frontend React Dashboard (Gestión de productos, Impresión QR).
- **apps/pwa**: Aplicación Móvil PWA (Escáner QR, Registro de movimientos).
- **packages/shared**: Tipos y Cliente API compartidos.

## Requisitos

- Node.js (v18+)
- MongoDB (Local o Atlas)

## Instalación

Instalar todas las dependencias desde la raíz:

```bash
npm install
```

## Ejecución en Desarrollo

Puedes correr cada aplicación en terminales separadas:

### 1. API (Puerto 3000)
```bash
npm run dev:api
```
Asegúrate de configurar `.env` en `apps/api` con tu `MONGODB_URI`.

### 2. Web (Puerto 5173 - Dashboard)
```bash
npm run dev:web
```

### 3. PWA (Puerto 5174 - Escáner)
```bash
npm run dev:pwa
```

## Producción (PWA y Cámara)
Para que la cámara funcione en la PWA desde un dispositivo móvil:
1. El sitio debe servirse por **HTTPS**.
2. O usar `localhost` (solo para desarrollo en el mismo dispositivo o port forwarding de Android).
3. Para probar en red local, configura Vite para usar HTTPS (`vite --host --https`) o despliega en Vercel/Netlify.

## Scripts del Root

- `npm run dev:api`: Inicia el backend.
- `npm run dev:web`: Inicia el dashboard web.
- `npm run dev:pwa`: Inicia la app móvil.
- `npm run build`: Construye todo el monorrepo.
