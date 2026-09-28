# Vérifications de l’aperçu, mises à jour le 17 septembre 2026

Cette version est un aperçu à compléter avant publication. La réalisation du portfolio et la mise à jour du CV ne sont pas encore terminées.

## Vérifié

- Mode jour/nuit : fondu de 0,8 seconde observé avec une couleur de fond intermédiaire et les deux icônes partiellement visibles ; état final clair et disparition de la classe de transition confirmés.
- Choix retrouvé après rechargement de l’accueil et sur la page de veille. L’activation au clavier conserve le focus. En mode réduit, le changement est immédiat. Les clics alternés rapides conduisent au dernier mode demandé.
- Les cinq pages ont été vérifiées dans les deux thèmes à 320, 480, 960 et 1440 pixels : 40 contrôles sans débordement horizontal ni erreur console. Le bouton conserve une cible de 44 × 44 pixels sur petit écran ; le menu et Échap fonctionnent toujours.
- Palette jour : contrastes mesurés de 13,42:1 pour le texte principal, 6,36:1 pour le texte secondaire sur sa surface, 6,91:1 pour le bouton principal et 6,13:1 pour les notes. Les paires vérifiées dépassent 4,5:1 dans les deux thèmes.
- Après intégration React : les composants sont rendus sur les cinq pages, avec six liens de navigation, à 320, 768 et 1440 pixels. Aucun débordement horizontal ni message console n’a été relevé.
- Le menu React s’ouvre et se ferme ; Échap restitue le focus au bouton. Un clic vers les projets ferme le menu mobile et conserve l’ancre correcte. Les sections « Projets » puis « Parcours » sont signalées par `aria-current="location"` lors de leur consultation.
- Le mode réduit initial, l’activation volontaire, la pause stable de l’orbite et la reprise ont été vérifiés de nouveau avec les états React.
- Les fichiers applicatifs passent le contrôle syntaxique Node.js. La préparation locale du fichier React de production réussit ; les licences React, React DOM et Scheduler sont incluses.
- Ajout du 17 septembre : mouvement orbital observé dans le navigateur, pause vérifiée par deux lectures de position identiques et reprise confirmée.
- La préférence de réduction des mouvements est active dans le navigateur de test : l’orbite est immobile au chargement, puis démarre après activation volontaire avec « Animer ».
- L’apparition d’un aperçu de projet a été observée pendant le défilement : l’animation CSS `apparition` est déclenchée sur le bloc visible.
- Après ajout des animations, les cinq pages ont été contrôlées de nouveau à 320, 768 et 1440 pixels, sans débordement horizontal ni erreur console. Le menu mobile et sa fermeture avec Échap ont également été revérifiés. L’accueil animé à 320 pixels et l’en-tête à 960 pixels restent dans la largeur disponible.
- Les cinq pages conservent leur contenu en HTML. React 19.3.0 et React DOM 19.3.0 sont intégrés localement pour la navigation et les commandes d’animation, après autorisation de l’utilisateur. Aucun moteur 3D ou canvas n’est utilisé.
- Les fichiers et les ancres des liens locaux existent. Aucun lien local ne pointe vers une page manquante.
- Chaque page possède un seul titre principal et un seul élément `main`. Les titres suivent une hiérarchie cohérente et les références des régions accessibles existent.
- Les cinq pages ont été ouvertes dans le navigateur avec des fenêtres de 320, 768 et 1440 pixels de largeur. Aucun débordement horizontal n’a été mesuré.
- L’accueil et la veille ont été inspectés visuellement sur mobile ; l’accueil et les aperçus de projets sur ordinateur.
- Les captures de Simmu-Impôt et d’EYE’s.Contact se chargent dans le nouveau portfolio. Les pages de détails les utilisent également.
- Le menu mobile s’ouvre, annonce son état avec `aria-expanded`, se ferme avec Échap et rend le focus au bouton.
- Le lien « Aller au contenu » amène le focus au contenu principal après ajout de `tabindex="-1"` sur `main`.
- La syntaxe du JavaScript est valide. Aucune erreur console n’a été relevée pendant le contrôle de la veille.
- Dans la palette nuit initiale, les associations principales sur le fond général dépassent 9:1 ; sur la surface claire, le texte secondaire reste à 8:1. Le bouton principal nuit conserve un contraste de 11,43:1.
- Aucun formulaire, script chargé depuis un service tiers, police distante ou outil de suivi n’est ajouté au site. React et ses licences sont livrés dans le dossier local.
- Les liens de la veille renvoient aux sources officielles consultées le 16 septembre 2026. Les articles précisent leurs dates et leurs statuts.

## Réalisé dans le code, sans essai complet sur un appareil réel

- Le passage à chaud entre les préférences de mouvement de l’appareil et la suspension des animations dans un onglet masqué sont prévus dans le code, sans essai dédié. Les réglages du système n’ont pas été modifiés pendant les tests.
- Le HTML conserve les liens de navigation visibles en l’absence de JavaScript. Le navigateur de test n’a pas été placé dans un mode JavaScript désactivé.
- Les chemins sont relatifs pour un hébergement GitHub Pages sous `/portfolio/`. Le nouveau site n’a pas été publié et la vérification après déploiement reste à faire.
- L’affichage sur téléphone et tablette a été contrôlé par dimensions de fenêtre. Les essais sur Safari iOS, Firefox, un téléphone réel et avec un lecteur d’écran restent à réaliser.
- Les tests du navigateur ont utilisé le serveur local. L’ouverture par double-clic n’a pas fait l’objet d’un essai distinct ; les scripts classiques locaux, sans modules ni requêtes réseau applicatives, sont prévus pour cet usage.
- Le repli lorsque le navigateur interdit le stockage local est prévu avec `try/catch`, sans modification des paramètres de stockage du navigateur de test.

## Informations nécessaires pour terminer

- Entreprise, poste, dates, missions et rythme de la nouvelle alternance ; option SLAM ou SISR.
- Contexte, période, contribution personnelle, difficultés et apprentissages de Simmu-Impôt, EYE’s.Contact et du guide Gringer.
- Confirmation de la version du projet EYE’s.Contact et liens supplémentaires éventuels.
- E-mail, ville, période de l’activité d’animateur et traitement de l’âge sur le CV.
- Coordonnées et choix de confidentialité pour finaliser les mentions légales.
- Validation du profil LinkedIn à utiliser : le CV et l’ancien site contiennent deux adresses différentes.

## Points particuliers

Le CV IPSSI actualisé n’a pas encore été créé, car les informations d’alternance manquent. Aucun ancien CV n’est joint ni proposé au téléchargement.

La version publique d’EYE’s.Contact contient deux images manquantes et plusieurs liens de maquette. Le nouveau portfolio utilise une capture de son en-tête et de sa présentation, et signale ces limites dans la fiche. Les dépôts des projets n’ont pas été modifiés.

Le calcul de Simmu-Impôt n’a pas fait l’objet d’une validation fiscale. La fiche décrit le prototype et son barème ancien ; elle ne le présente pas comme un service de calcul d’impôt actuel.

Les boutons e-mail, LinkedIn et de téléchargement du CV seront vérifiés une fois les informations confirmées et le PDF actualisé ajouté.
