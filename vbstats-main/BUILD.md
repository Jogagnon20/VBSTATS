# 📦 Guide de Build et Installation - VBSTATS

Ce guide vous explique comment créer des fichiers APK (Android) et IPA (iOS) pour installer VBSTATS sur différents appareils sans passer par Expo Go.

## 🚀 Méthodes d'installation

### Option 1 : EAS Build (Recommandé ⭐)

**Avantages :**
- Builds dans le cloud (pas besoin de configurer Android Studio ou Xcode)
- Processus simplifié
- Support professionnel

#### Prérequis

1. **Créer un compte Expo** (gratuit)
   ```bash
   npx expo register
   ```

2. **Installer EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

3. **Se connecter à Expo**
   ```bash
   eas login
   ```

#### Créer un build Android (APK)

1. **Configurer le projet**
   ```bash
   eas build:configure
   ```

2. **Lancer le build APK**
   ```bash
   eas build --platform android --profile preview
   ```

   Cette commande va :
   - Créer un build dans le cloud
   - Générer un fichier APK
   - Vous donner un lien de téléchargement

3. **Télécharger le APK**
   - Une fois le build terminé (5-15 minutes), vous recevrez un lien
   - Téléchargez le fichier APK sur votre ordinateur

4. **Installer sur Android**

   **Méthode A : Via câble USB**
   ```bash
   # Transférez le APK sur votre appareil
   adb install chemin/vers/votre-app.apk
   ```

   **Méthode B : Via QR Code**
   - EAS Build génère automatiquement un QR code
   - Scannez-le avec votre appareil Android
   - Téléchargez et installez l'APK

   **Méthode C : Via email/cloud**
   - Envoyez le APK par email ou uploadez-le sur Google Drive/Dropbox
   - Téléchargez sur votre appareil Android
   - Ouvrez le fichier et installez (vous devrez peut-être autoriser "Sources inconnues")

#### Créer un build iOS (IPA)

⚠️ **Note :** Pour iOS, vous avez besoin d'un compte Apple Developer (99$/an)

```bash
eas build --platform ios --profile production
```

Pour installer sur iOS :
- Utilisez TestFlight (recommandé)
- Ou distribuez via Ad Hoc

---

### Option 2 : Build Local (Avancé)

Si vous préférez builder localement sans utiliser le cloud :

#### Android

1. **Installer Android Studio**
   - Téléchargez depuis https://developer.android.com/studio

2. **Générer les fichiers natifs**
   ```bash
   npx expo prebuild --platform android
   ```

3. **Builder l'APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Récupérer l'APK**
   Le fichier sera dans : `android/app/build/outputs/apk/release/app-release.apk`

#### iOS

1. **Installer Xcode** (macOS uniquement)

2. **Générer les fichiers natifs**
   ```bash
   npx expo prebuild --platform ios
   ```

3. **Ouvrir dans Xcode**
   ```bash
   open ios/VBSTATS.xcworkspace
   ```

4. **Builder depuis Xcode**

---

## 📱 Installation sur les appareils

### Android

#### Activation des "Sources inconnues"

Avant d'installer un APK, vous devez autoriser l'installation depuis des sources inconnues :

1. Ouvrez **Paramètres**
2. Allez dans **Sécurité** ou **Applications**
3. Activez **Installer des applications inconnues** pour votre navigateur/gestionnaire de fichiers

#### Installation

1. Transférez le fichier APK sur votre appareil Android
2. Ouvrez le fichier APK avec le gestionnaire de fichiers
3. Appuyez sur **Installer**
4. Attendez la fin de l'installation
5. Lancez l'application !

### iOS

#### Via TestFlight (Recommandé)

1. Uploadez votre build sur App Store Connect
2. Invitez les testeurs via email
3. Ils téléchargent TestFlight depuis l'App Store
4. Installent l'app depuis TestFlight

#### Distribution Ad Hoc

Nécessite un compte Apple Developer et les UDIDs des appareils.

---

## 🔧 Configuration des builds

Le fichier `eas.json` contient trois profils :

### Development
```bash
eas build --profile development
```
Pour tester pendant le développement.

### Preview
```bash
eas build --profile preview
```
Pour partager avec des testeurs (génère un APK).

### Production
```bash
eas build --profile production
```
Pour la version finale de l'app.

---

## 📦 Profils de build disponibles

### Profile "preview" (Recommandé pour débuter)
- Génère un **APK** pour Android (facile à installer)
- Pas besoin de compte Google Play
- Parfait pour tester et partager

### Profile "production"
- Génère un **AAB** pour Android (pour Google Play Store)
- Génère un **IPA** pour iOS (pour App Store)

---

## 🎯 Guide rapide pour débutants

**Pour installer sur une tablette Android :**

1. Installez EAS CLI :
   ```bash
   npm install -g eas-cli
   ```

2. Connectez-vous :
   ```bash
   eas login
   ```

3. Créez le build :
   ```bash
   eas build --platform android --profile preview
   ```

4. Attendez 5-15 minutes

5. Scannez le QR code ou téléchargez l'APK depuis le lien fourni

6. Installez l'APK sur votre tablette

✅ **C'est tout !** Votre app est installée et fonctionne sans Expo Go.

---

## 🔄 Mettre à jour l'application

Pour créer une nouvelle version :

1. Modifiez la version dans `app.json` :
   ```json
   {
     "expo": {
       "version": "1.0.1"
     }
   }
   ```

2. Relancez le build :
   ```bash
   eas build --platform android --profile preview
   ```

3. Installez la nouvelle version par-dessus l'ancienne

---

## 💡 Astuces

### Partager l'APK avec d'autres personnes

1. **Via lien direct** : Après le build, EAS génère un lien que vous pouvez partager
2. **Via Google Drive/Dropbox** : Uploadez l'APK et partagez le lien
3. **Via QR Code** : EAS génère automatiquement un QR code

### Réduire la taille de l'APK

Dans `eas.json`, ajoutez :
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
```

### Vérifier le statut de vos builds

```bash
eas build:list
```

---

## 🆘 Dépannage

### "Installation bloquée"
→ Vérifiez que "Sources inconnues" est activé

### "App non installée"
→ Désinstallez l'ancienne version d'abord

### "Build failed"
→ Vérifiez que toutes les dépendances sont installées : `npm install`

### "EAS CLI non trouvé"
→ Installez-le globalement : `npm install -g eas-cli`

---

## 📚 Ressources supplémentaires

- [Documentation EAS Build](https://docs.expo.dev/build/introduction/)
- [Guide d'installation Android](https://docs.expo.dev/build/internal-distribution/)
- [Guide TestFlight iOS](https://docs.expo.dev/build/internal-distribution/#22-create-a-development)

---

## 🎉 Félicitations !

Vous pouvez maintenant distribuer VBSTATS sur tous vos appareils et ceux de votre équipe sans dépendre d'Expo Go !
