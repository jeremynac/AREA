# Git Workflow

## Norme de commit

- **[INIT]** -> Début d'un projet ou d'une fonctionalité.
- **[ADD]** -> Rajout d'une fonctionnalité preque fini  
- **[FIX]** -> Fixer un bug ou une fonctionnalité  
- **[MOD]** -> Modification d'une fonctionnalité  

## Branches

Ici on différencie notre production (master) des branches de dev (dev-*)

### Branches production

- **master**: Production. Ici sont envoyé les features une fois débugué

### Branches de dev

- **dev**: On regroupe ici toutes les fonctionnalités une fois ces dernières développées et on test l'integration avant de mettre sur master.  
  
- **dev-front-react**: Toute la partie développement côté web est regroupé ici.
- **dev-flutter**: Toute la partie développement côté mobile est regroupé ici.  
  
- **dev-back**: Regroupe toutes les fonctionnalités prêtes dans le back.
- **dev-back-\***: Chaque fonctionnalité du back est dans une branche précise et pull-requesté par la suite dans dev-back.

### Passage d'une branche à l'autre:
Pour passer d'une branche à l'autre, on utilise des Pull request. L'idée de base était d'utiliser des Githubs Actions mais les limites imposés par Epitech nous ont forcé à abandonner cette idée. On vérifie à chaque Pull Request que ça merge correctement.


### Exemple
- Dev-front-react  

- Pull request vers dev  

- On check que tout marche bien sur la pull request et on accepte la request.  

- Une fois l’intégration effectué sur dev  

- Pull request vers master  

- Acceptation de la pull request.