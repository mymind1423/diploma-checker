# Portail de Vérification des Diplômes — Documentation

**Résumé**: Ce dépôt contient une application React (Create React App) servant de portail de vérification des diplômes. L'application propose : authentification, upload OCR, recherche par référence, affichage détaillé des diplômes, gestion des étudiants, et un tableau de bord moderne.

**Stack principal**:
- **Frontend**: React (react, react-dom), Bootstrap, axios, lottie-react, react-icons
- **Dev / build**: react-scripts (Create React App)

**Ce README** décrit : installation rapide, structure du projet, composants principaux, points d'API utilisés et étapes de développement courantes.

**Prérequis**:
- Node.js (>=14) et npm
- Backend API accessible (par défaut `http://localhost:3000/api`)

**Installation & Exécution**

Exécutez ces commandes depuis la racine du projet (`c:\Users\mouad\Documents\frontend`):

```powershell
npm install
npm start
```

Ouvrez ensuite `http://localhost:3000`.

**Variables d'environnement**
- Si vous souhaitez configurer l'URL de l'API depuis un fichier `.env`, ajoutez par exemple :

```text
REACT_APP_API_URL=http://localhost:3000/api
```

et modifiez `src/services/api.js` pour utiliser `process.env.REACT_APP_API_URL`.

**Points d'API appelés (attendus par le frontend)**
- `POST /api/auth/login` — login (renvoie `accessToken`)
- `POST /api/auth/refresh` — rafraîchir token (cookies)
- `POST /api/ocr/upload` — upload et extraction OCR (renvoie référence)
- `GET /api/diplomes/:reference` — obtenir diplôme par référence
- `GET /api/students` — liste des étudiants
- `PUT /api/users/me` — (optionnel) mise à jour du profil utilisateur

Adaptez ces routes si votre backend utilise des chemins différents.

**Structure importante du projet**
- `public/` : index.html, manifest, assets statiques
- `src/` : code source React
	- `src/App.js` : composant principal + pages + logique d'auth et fetch sécurisé
	- `src/index.js` : point d'entrée
	- `src/components/` : composants UI (Sidebar, NavBar, Dashboard, Students, Profile, Settings, Footer, etc.)
	- `src/services/api.js` : wrapper axios / fonctions d'API
	- `src/assets/` : images et animations Lottie
	- `src/App.css`, `src/theme.css` : styles globaux

**Composants clés**
- `Sidebar.jsx` : navigation latérale
- `NavBar.jsx` : barre supérieure (recherche, notifications, utilisateur)
- `Dashboard.jsx` : cartes de statistiques et actions rapides
- `OcrUpload.jsx` : composant d'upload OCR
- `DiplomeList.jsx` / `DiplomaCard` : affichage détaillé du diplôme (maintenant affiche toutes les clés renvoyées par l'API)
- `Students.jsx` : table des étudiants avec recherche côté client
- `Profile.jsx` : editeur de profil (nom d'utilisateur, mot de passe)

**Comportement principal**
- Authentification par token : le frontend stocke le token en mémoire et utilise `secureFetch` (wrapper) pour ajouter `Authorization: Bearer <token>`.
- Si une requête renvoie 401, `secureFetch` tente d'appeler `POST /api/auth/refresh` pour obtenir un nouveau token puis répète la requête.
- L'upload OCR renvoie une `reference` qui est ensuite utilisée pour récupérer le diplôme complet.
- L'affichage du diplôme a été amélioré : toutes les clés retournées dans l'objet `result.data` sont listées, les liens/images sont affichés et chaque valeur est copiable via un bouton.

**Personnalisation & amélioration possible**
- Remplacer la gestion du token en mémoire par `localStorage` ou `redux` si nécessaire.
- Ajouter `react-router-dom` pour routes réelles (actuellement les pages sont gérées par état `page`).
- Ajouter tests unitaires pour composants et intégration API.
- Ajouter toasts/notifications (ex: react-toastify) pour les retours utilisateur (copie, sauvegarde profil, erreurs serveur).

**Conseils de développement**
- Pour modifier l'URL API globalement : vérifier `src/services/api.js` et/ou utiliser `REACT_APP_API_URL`.
- Pour ajouter une nouvelle page : créer un composant dans `src/components/`, ajouter une entrée dans `Sidebar.jsx` et rendre conditionnellement depuis `src/App.js`.

**Débogage rapide**
- Erreur CORS : vérifier la configuration du backend et autoriser `http://localhost:3000`.
- 401 / refresh : assurez-vous que `POST /api/auth/refresh` fonctionne avec `credentials: include` si vous utilisez refresh token via cookie.

**Contribuer**
- Fork, créez une branche `feature/xxx`, envoyez une pull request. Documentez votre changement dans ce README.

---

Si vous voulez, je peux :
- Générer une version en anglais aussi.
- Ajouter un `CONTRIBUTING.md` et un guide de style.
- Mettre en place `react-router-dom` et migrer la navigation vers de vraies routes.

Dites-moi ce que vous préférez et j'ajoute ces éléments.
