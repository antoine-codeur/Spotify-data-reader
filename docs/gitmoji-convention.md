# Gitmoji Commit Convention

This documentation explains how to use the [Gitmoji](https://gitmoji.dev/) convention for our commit messages.

## What is Gitmoji?

Gitmoji is an initiative to standardize and explain the use of emojis in Git commit messages. By using emojis in commit messages, we can easily identify the purpose or intention of a commit at a glance.

## How to Use Gitmoji

Basic format for a commit message:
```
:emoji: Concise subject
```

Example:
```
:sparkles: Add user login functionality
```

## Common Emoji Guide

| Emoji | Code | Description | Usage |
| ----- | ---- | ----------- | ----------- |
| ✨ | `:sparkles:` | New features | When you add a new feature |
| 🐛 | `:bug:` | Bug fix | When you fix a bug |
| 📝 | `:memo:` | Documentation | When you add or update documentation |
| 💄 | `:lipstick:` | UI/Style | When you work on UI and styles |
| ♻️ | `:recycle:` | Refactoring | When you refactor or clean up code |
| 🔥 | `:fire:` | Remove code | When you remove code or files |
| 🚀 | `:rocket:` | Deployment | When you deploy new versions |
| 🔧 | `:wrench:` | Configuration | When you modify configuration files |
| ✅ | `:white_check_mark:` | Tests | When you add or fix tests |
| 🔒 | `:lock:` | Security | When you work on security |
| 👌 | `:ok_hand:` | Code approval | When addressing code review feedback |
| 🍝 | `:spaghetti:` | Spaghetti code | When you know you're adding technical debt |

## Rare Emoji Guide

| Emoji | Code | Description | Usage |
| ----- | ---- | ----------- | ----------- |
| ⚡ | `:zap:` | Performance | When improving performance |
| 🧠 | `:brain:` | Smart solution | When implementing a clever solution |
| 🔍 | `:mag:` | SEO | When improving search engine optimization |
| 🧩 | `:puzzle_piece:` | New integration | When adding third-party services |
| 🚑️ | `:ambulance:` | Critical hotfix | When fixing a critical issue in production |
| 🧯 | `:fire_extinguisher:` | Firefighting | When putting out production fires |
| 🤪 | `:zany_face:` | Wild code | When your code works but you're not sure why |

## Legendary Emoji Guide

| Emoji | Code | Description | Usage |
| ----- | ---- | ----------- | ----------- |
| 🎉 | `:tada:` | Major release | When shipping a major feature or version |
| ⚠️ | `:warning:` | Breaking change | When making major breaking changes |
| 🚨 | `:rotating_light:` | Emergency change | When making urgent fixes under pressure |
| 🧨 | `:firecracker:` | Big refactor | When doing a complete codebase refactor |
| 💩 | `:poop:` | Bad code | When you have to write terrible code for compatibility |

## Unique
There's only one truly unique emoji that should be used with extreme caution:

| Emoji | Code | Description | Usage |
| ----- | ---- | ----------- | ----------- |
| 🦆 | `:duck:` | Duck debugging | When you solve a problem by explaining it to a rubber duck |

## Installing the Gitmoji CLI

To make using Gitmoji easier, you can install the CLI tool:

```bash
npm i -g gitmoji-cli
```

Then, use `gitmoji -c` instead of `git commit` to start using emojis in your commits.

## Additional Resources

- [Official Gitmoji website](https://gitmoji.dev/)
- [Complete emoji reference](https://gitmoji.dev/reference)
- [Project GitHub](https://github.com/carloscuesta/gitmoji)

---

# Convention de Commit Gitmoji

Cette documentation explique comment utiliser la convention [Gitmoji](https://gitmoji.dev/) pour nos messages de commit.

## Qu'est-ce que Gitmoji ?

Gitmoji est une initiative pour standardiser et expliquer l'utilisation des emojis dans les messages de commit Git. En utilisant des emojis dans les messages de commit, nous pouvons identifier facilement l'objectif ou l'intention d'un commit en jetant simplement un coup d'œil.

## Comment utiliser Gitmoji

Format de base pour un message de commit :
```
:emoji: Sujet concis
```

Exemple :
```
:sparkles: Ajouter la fonctionnalité de connexion des utilisateurs
```

## Guide des emojis courants

| Emoji | Code | Description | Utilisation |
| ----- | ---- | ----------- | ----------- |
| ✨ | `:sparkles:` | Nouvelles fonctionnalités | Lorsque vous ajoutez une nouvelle fonctionnalité |
| 🐛 | `:bug:` | Correction de bug | Lorsque vous corrigez un bug |
| 📝 | `:memo:` | Documentation | Lorsque vous ajoutez ou mettez à jour la documentation |
| 💄 | `:lipstick:` | UI/Style | Lorsque vous travaillez sur l'interface utilisateur et les styles |
| ♻️ | `:recycle:` | Refactorisation | Lorsque vous refactorisez ou nettoyez le code |
| 🔥 | `:fire:` | Suppression de code | Lorsque vous supprimez du code ou des fichiers |
| 🚀 | `:rocket:` | Déploiement | Lorsque vous déployez de nouvelles versions |
| 🔧 | `:wrench:` | Configuration | Lorsque vous modifiez des fichiers de configuration |
| ✅ | `:white_check_mark:` | Tests | Lorsque vous ajoutez ou corrigez des tests |
| 🔒 | `:lock:` | Sécurité | Lorsque vous travaillez sur la sécurité |
| 👌 | `:ok_hand:` | Approbation du code | Quand vous répondez aux commentaires de revue de code |
| 🍝 | `:spaghetti:` | Code spaghetti | Quand vous savez que vous ajoutez de la dette technique |

## Guide des emojis rares

| Emoji | Code | Description | Utilisation |
| ----- | ---- | ----------- | ----------- |
| ⚡ | `:zap:` | Performance | Quand vous améliorez les performances |
| 🧠 | `:brain:` | Solution intelligente | Quand vous implémentez une solution astucieuse |
| 🔍 | `:mag:` | SEO | Quand vous améliorez l'optimisation pour les moteurs de recherche |
| 🧩 | `:puzzle_piece:` | Nouvelle intégration | Quand vous ajoutez des services tiers |
| 🚑️ | `:ambulance:` | Correctif critique | Quand vous corrigez un problème critique en production |
| 🧯 | `:fire_extinguisher:` | Lutte contre les incendies | Quand vous éteignez des incendies en production |
| 🤪 | `:zany_face:` | Code bizarre | Quand votre code fonctionne mais vous ne savez pas pourquoi |

## Guide des emojis légendaires

| Emoji | Code | Description | Utilisation |
| ----- | ---- | ----------- | ----------- |
| 🎉 | `:tada:` | Version majeure | Quand vous livrez une fonctionnalité ou version majeure |
| ⚠️ | `:warning:` | Changement radical | Quand vous effectuez des changements majeurs incompatibles |
| 🚨 | `:rotating_light:` | Changement d'urgence | Quand vous effectuez des corrections urgentes sous pression |
| 🧨 | `:firecracker:` | Grande refactorisation | Quand vous refactorisez complètement le code |
| 💩 | `:poop:` | Mauvais code | Quand vous devez écrire du code terrible pour la compatibilité |

## Unique
Il n'y a qu'un seul emoji vraiment unique qui doit être utilisé avec une extrême prudence :

| Emoji | Code | Description | Utilisation |
| ----- | ---- | ----------- | ----------- |
| 🦆 | `:duck:` | Débogage par canard | Quand vous résolvez un problème en l'expliquant à un canard en plastique |

## Installation du CLI Gitmoji

Pour faciliter l'utilisation de Gitmoji, vous pouvez installer l'outil CLI :

```bash
npm i -g gitmoji-cli
```

Ensuite, utilisez `gitmoji -c` au lieu de `git commit` pour commencer à utiliser les émojis dans vos commits.

## Ressources supplémentaires

- [Site officiel Gitmoji](https://gitmoji.dev/)
- [Référence complète des emojis](https://gitmoji.dev/reference)
- [GitHub du projet](https://github.com/carloscuesta/gitmoji)