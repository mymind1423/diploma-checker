# Diploma Checker Mobile (Flutter)

Version Flutter mobile du projet React **Diploma Checker**. L'application reprend le même flux : connexion JWT, envoi d'image pour OCR et affichage de la liste des diplômes.

## Pré-requis
- Flutter 3.19+ installé
- Dispositif ou émulateur mobile (Android ou iOS)
- API backend accessible sur `http://localhost:3000/api` (adapter dans `lib/services/api_service.dart` si besoin)

## Lancer l'application
1. Se placer dans ce dossier :
   ```bash
   cd flutter_app
   ```
2. Récupérer les dépendances :
   ```bash
   flutter pub get
   ```
3. Démarrer sur un device/emulateur :
   ```bash
   flutter run
   ```

## Fonctionnalités
- **Connexion** : formulaire username/password qui récupère un token JWT via `/login`.
- **OCR Upload** : sélection d'une image depuis la galerie et envoi vers `/ocr`.
- **Liste des diplômes** : récupération et affichage tabulaire des diplômes depuis `/diplomes`.
