# ZeToD Frontend

Landing page React pour la plateforme **ZeToD** (Zero To Deploy) — évaluation des compétences Python réelles.

## Stack

- React + Vite
- Tailwind CSS v4
- React Router DOM
- Lucide React

## Démarrage local

```bash
npm install
npm run dev
```

Sur Windows PowerShell, si `npm` est bloqué :

```powershell
npm.cmd run dev
```

## Backend

L'URL du backend est configurée via la variable d'environnement :

```env
VITE_API_URL=https://zetod-backend.onrender.com
```

Copiez `.env.example` vers `.env` avant le développement local.

Le bouton **Commencer l'évaluation** redirige vers `{VITE_API_URL}/assessment`.

## Déploiement Vercel

1. Connectez-vous sur [vercel.com](https://vercel.com) avec GitHub.
2. Importez le dépôt `ZETOD-Platform`.
3. **Root Directory** : `frontend` (monorepo) ou `.` (si ce dossier est le dépôt frontend seul).
4. **Framework Preset** : Vite
5. **Build Command** : `npm run build`
6. **Output Directory** : `dist`
7. Ajoutez la variable d'environnement :
   - `VITE_API_URL` = `https://zetod-backend.onrender.com`
8. Déployez.

## Git (soumission)

```bash
git add .
git commit -m "Add frontend landing page"
git push
```
