# Plantopia 🌱

**Pour lancer l'application**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/plantopia.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd plantopia
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

**Plantopia** est une application mobile Android utilisant la **Réalité Augmentée (RA)**, permettant aux utilisateurs de planter et entretenir des plantes virtuelles. Chaque interaction fait évoluer la plante et transforme l’environnement en RA autour de l’utilisateur. **Plantopia** introduit également des rôles qu'on peut acheter dans la boutique du jeu avec des points qui influencent la croissance des plantes, ainsi que la possibilité de saboter ou d'accélérer leur développement. Les plantes peuvent également mourir si elles ne sont pas suffisamment arrosées.

---

## Fonctionnalités principales 🌿

- **Planter des graines** : Plantez et faites pousser une plante virtuelle dans un pot en RA.
- **Arrosage virtuel** : Arrosez votre plante pour encourager sa croissance.
- **Rôles aléatoires** : Chaque jour, un rôle aléatoire est attribué aux utilisateurs, influençant directement la croissance ou la santé des plantes.
- **Possibilité de mort des plantes** : Si une plante n’est pas arrosée régulièrement, elle peut se faner et mourir.
- **Points Journalier**: À chaque action (connexion, action sur les portes) on gagne des points, et on peut les utiliser dans la boutique. 


---

## Rôles spéciaux 🌟

Dans **Plantopia**, des rôles sont disponible dans la boutique permet à chaque utilisateur au début d'une session. Ces rôles peuvent aider à la croissance des plantes, la ralentir, ou la saboter. Voici les rôles disponibles :

1. **Double Pousse (Grow Booster) 🌿**
   - **Effet** : Ce rôle permet de doubler la vitesse de croissance des plantes lorsqu’elles sont arrosées.
   - **Action** : Chaque arrosage par le joueur avec ce rôle accélère la croissance de la plante, la faisant évoluer deux fois plus vite.
   - **Indication visuelle** : Un halo vert brillant apparaît autour de la plante.
   - 
2. **Neutre (Neutral) 🌾**
   - **Effet** : Ce rôle n'a aucun effet spécial sur les plantes.
   - **Action** : Le joueur peut arroser les plantes normalement sans influence sur leur croissance.
   - **Indication visuelle** : La plante se développe normalement, sans effets visuels spécifiques.

---
# PLANTOPIA Actions and Points System

| **Action**         | **Points Earned** |
|--------------------|-------------------|
| Get on the app      | 10 points         |
| Water a plant       | 20 points         |
| Sun Action          | 25 points         |
| New plant           | 15 points         |

---
## Mécanique de mort des plantes ⚰️

Les plantes dans **Plantopia** nécessitent un arrosage régulier pour survivre. Si une plante reste sans soins pendant une certaine durée (par exemple, 72 heures en temps réel), elle commence à se détériorer et peut mourir.

### Processus de détérioration :
- La plante possède 100hp, elle pert 12hp par jour, les actions des utilisateurs lui redonnent des hp lui permettant de rester en vie. Sans ces actions et une fois arrivé à 0hp la plante meurt et disparait.

### Récupération :
Si la plante est arrosée avant sa mort complète, elle peut récupérer, mais sa croissance sera ralentie pendant un certain temps.

---

## Interactions utilisateur via les gestes 🎮

Les fonctionnalités de **Plantopia** sont contrôlées par des gestes tactiles, permettant aux utilisateurs d’interagir facilement avec les plantes et l’environnement en RA.

1. **Double clic** :
   - **Action** : Planter une graine
   - **Fonctionnalité associée** : 

2. **Glissement vers le haut** :
   - **Action** : Gérer l'ensoleillement 
   - **Fonctionnalité associée** : 

3. **Secoué (Shake)** :
   - **Action** : Arroser la plante
   - **Fonctionnalité associée** :

4. **Glissement vers le bas** :
   - **Action** : Assécher la plante
   - **Fonctionnalité associée** :
---

## Conclusion 🌸

**Plantopia** offre une expérience immersive où les utilisateurs peuvent non seulement prendre soin de leurs plantes en RA, mais aussi interagir avec d'autres joueurs à travers des rôles aléatoires qui rendent chaque session unique et dynamique. Restez vigilant et arrosez vos plantes régulièrement pour éviter qu’elles ne se fanent ou ne soient sabotées !
