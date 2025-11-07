# Convention de nommage des branches Git

## Règles de base

1. **Préfixe séparé par un tiret bas `_`**  
   Le type de branche (feature, bugfix, etc.) est suivi d’un `_`.  
   **Exemple :** `feature_systeme-authentification`

2. **Mots séparés par des tirets `-`**  
   À l’intérieur du nom descriptif, séparer les mots par des tirets.  
   **Exemples :**  
   `feature_page-inscription`, `bugfix_erreur-affichage-score`

3. **Minuscules uniquement**  
   Toujours en lettres minuscules pour éviter les erreurs de casse.

4. **Caractères autorisés :**  
   - Lettres `a–z`, chiffres `0–9`, tiret bas `_`, tiret `-`  
   - Interdits : espaces, accents ou caractères spéciaux.

5. **Pas de tirets répétés ou finaux :**  
   - Interdit : `feature__nouvelle--connexion-`  
   - Correct : `feature_nouvelle-connexion`

6. **Nom clair et concis :**  
   Représente la tâche, la fonctionnalité ou la correction effectuée.  
   **Bon exemple :** `feature_statistiques-joueur`  
   **Mauvais exemple :** `feature_truc`

---

## Préfixes de branches

L’usage de **préfixes** permet d’identifier la nature du travail sur la branche.

| Type de branche | Préfixe | Description | Exemple |
|-----------------|----------|--------------|----------|
| Fonctionnalité | `feature_` | Développement d’une nouvelle fonctionnalité. | `feature_systeme-authentification` |
| Correction de bogue | `bugfix_` | Correction d’un bogue détecté sur la branche de dev. | `bugfix_affichage-score-joueur` |
| Correction urgente (prod) | `hotfix_` | Correction critique directement sur la production. | `hotfix_regression-chargement-match` |
| Préparation de version | `release_` | Branche pour finaliser une version (tests, ajustements). | `release_v1-0-1` |
| Documentation | `docs_` | Modification ou ajout de documentation. | `docs_ajout-guide-installation` |
| Refactorisation | `refactor_` | Réorganisation ou amélioration du code sans ajout de feature. | `refactor_gestion-evenements` |
| Expérimentation / Prototype | `experiment_` | Test d’une idée ou prototype temporaire. | `experiment_ui-stats-live` |

---

## Bonnes pratiques

- Créer depuis `develop` pour les features et bugfix.  
  Créer depuis `main` pour les hotfix.

- Langue uniforme : choisir **anglais ou français**, mais rester cohérent.

- Longueur raisonnable : 3 à 5 mots maximum dans la racine.

- Pas d’accents ni caractères spéciaux :  
  Utiliser `e` au lieu de `é`, `a` au lieu de `à`, etc.

---

## Exemples de branches valides

| Type | Exemple correct | Exemple incorrect |
|------|-----------------|------------------|
| Feature | `feature_page-inscription` | `feature/page_inscription` |
| Bugfix | `bugfix_erreur-affichage-score` | `bugfix__affichage--score` |
| Hotfix | `hotfix_retrait-bogue-production` | `hotfix-bogue-prod` |
| Release | `release_v1-2-0` | `release/v1.2.0` |
| Docs | `docs_mise-a-jour-readme` | `docs maj readme` |
| Refactor | `refactor_service-evenements` | `refactor-service_evenements` |
| Experiment | `experiment_interface-mobile` | `experiment__interface_mobile` |

# Références:

- https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534