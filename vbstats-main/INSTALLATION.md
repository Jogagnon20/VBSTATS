# 🚀 Installation Rapide - VBSTATS

## Pour installer l'app sur vos appareils sans Expo Go

### ⚡ Méthode la plus simple (recommandée)

1. **Installer EAS CLI** (une seule fois)
   ```bash
   npm install -g eas-cli
   ```

2. **Se connecter** (créez un compte gratuit si nécessaire)
   ```bash
   eas login
   ```

3. **Créer l'APK Android**
   ```bash
   npm run build:android
   ```
   Ou directement :
   ```bash
   eas build --platform android --profile preview
   ```

4. **Attendre 5-15 minutes**
   Le build se fait dans le cloud, vous n'avez rien à configurer !

5. **Télécharger et installer**
   - Un lien de téléchargement vous sera fourni
   - Ou scannez le QR code avec votre appareil Android
   - Installez l'APK

✅ **C'est tout !** Votre application est installée.

---

## 📱 Scripts disponibles

```bash
# Build Android (APK - facile à installer)
npm run build:android

# Build Android Production (AAB - pour Google Play)
npm run build:android:prod

# Build iOS (nécessite compte Apple Developer)
npm run build:ios

# Build Android + iOS
npm run build:all
```

---

## 📖 Documentation complète

Pour plus de détails, consultez **[BUILD.md](./BUILD.md)** qui contient :
- Instructions détaillées pour Android et iOS
- Build local (sans cloud)
- Dépannage
- Astuces de distribution

---

## ⚠️ Notes importantes

### Android
- ✅ Pas besoin de compte Google Play
- ✅ Installation directe de l'APK
- ✅ Gratuit

### iOS
- ⚠️ Nécessite un compte Apple Developer (99$/an)
- ⚠️ Installation via TestFlight ou Ad Hoc
- ⚠️ Processus plus complexe

---

## 💡 FAQ

**Q : L'installation est bloquée sur Android ?**
→ Activez "Sources inconnues" dans les paramètres de sécurité

**Q : Combien de temps prend le build ?**
→ 5 à 15 minutes avec EAS Build

**Q : Puis-je partager l'APK avec d'autres ?**
→ Oui ! Partagez le lien ou le fichier APK directement

**Q : Dois-je payer pour EAS Build ?**
→ Non, le plan gratuit permet 30 builds/mois

**Q : L'app se mettra-t-elle à jour automatiquement ?**
→ Non, vous devrez créer et installer une nouvelle version manuellement

---

## 🆘 Besoin d'aide ?

Consultez [BUILD.md](./BUILD.md) pour des instructions plus détaillées et du dépannage.
