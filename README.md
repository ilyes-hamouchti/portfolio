# Portfolio Ilyes Hamouchti

Site personnel en HTML et CSS, avec des composants React pour la navigation et les commandes d’animation. Il s’ouvre directement dans un navigateur : aucune installation ou compilation n’est nécessaire pour consulter ou modifier le portfolio. React 19.3.0 et React DOM 19.3.0 sont déjà inclus localement dans le dossier livré.

## État de cette version

Il s’agit d’un aperçu de travail. Le thème spatial et futuriste sobre a été confirmé. Les données d’alternance, les contributions aux projets et certaines coordonnées attendent encore confirmation. Les notes signalées dans les pages doivent être remplacées avant publication. Le CV IPSSI actualisé n’est pas encore présent : l’ancien CV n’est pas distribué.

## Ouvrir le site

Ouvrir `index.html` par un double-clic. Garder les fichiers et dossiers ensemble. Les pages, les images et les styles utilisent des chemins relatifs, compatibles avec un dossier GitHub Pages nommé `portfolio`.

## Les fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Présentation, parcours, compétences, projets et contact |
| `projet-simmu-impot.html` | Fiche détaillée de Simmu-Impôt |
| `projet-eyes-contact.html` | Fiche détaillée d’EYE’s.Contact |
| `veille.html` | Méthode et journal de veille React / Node.js |
| `mentions-legales.html` | Informations de publication à finaliser |
| `css/style.css` | Couleurs, mise en page et version mobile |
| `css/animations.css` | Orbite, apparitions, survols et réduction des mouvements |
| `css/theme.css` | Palette jour, bouton soleil/lune et fondu entre les thèmes |
| `js/navigation.js` | Composants React Navigation et BoutonAnimations, menu mobile et section active |
| `js/animations.js` | Hook React useMouvements : apparitions, activation et pause |
| `js/theme.js` | Thème initial, hook React useTheme et mémorisation du choix |
| `js/vendor/` | Bibliothèque React préparée et licences MIT ; ne pas modifier son code minifié |
| `scripts/` et `package.json` | Outils facultatifs pour reconstruire la bibliothèque React locale |
| `assets/images/` | Photo, captures réelles, illustration et favicon SVG |
| `assets/documents/` | Emplacement du seul CV à publier : le CV IPSSI actualisé |

Le header et le footer sont présents dans chaque page HTML pour que les liens restent disponibles sans JavaScript. Modifier leurs liens dans toutes les pages lorsqu’ils changent. React lit les liens de l’en-tête dans ce HTML, puis rend la navigation interactive avec le même composant sur les cinq pages. Le contenu principal et le footer restent en HTML.

## Modifier un texte

Ouvrir le fichier HTML concerné dans un éditeur, rechercher une phrase visible puis modifier le texte entre ses balises. Conserver les identifiants comme `id="projets"` : les liens de navigation les utilisent. Enregistrer en UTF-8 pour conserver les accents.

Un titre principal utilise `<h1>`. Les grandes sections utilisent `<h2>` et leurs sous-parties `<h3>`. Les textes sont dans des `<p>`. Une liste utilise `<ul>` ou `<ol>` et des `<li>`.

## Changer les couleurs

Les variables placées au début de `css/style.css` contrôlent les couleurs du mode nuit : `--fond`, `--surface`, `--texte`, `--texte-secondaire`, `--accent` et `--bordure`. Leurs valeurs pour le mode jour sont dans `css/theme.css`. Les variables `--orbite-…` adaptent aussi l’illustration au thème. Modifier les deux palettes en conservant un contraste suffisant pour les textes.

Les polices utilisent celles de l’appareil du visiteur. Il n’y a aucun téléchargement de polices depuis un service tiers. Le rendu typographique peut légèrement varier selon le système.

## Ajouter un projet

1. Dupliquer une fiche de projet et lui donner un nom simple, par exemple `projet-bibliotheque.html`.
2. Modifier le `<title>`, la description, le titre principal et le contenu. Expliquer l’objectif, le contexte, les fonctions réellement présentes et la contribution personnelle.
3. Ajouter une capture dans `assets/images/`, avec un nom sans espace ni accent.
4. Remplacer le chemin de l’image et son texte `alt`. Indiquer ses dimensions réelles avec `width` et `height`.
5. Dans `index.html`, dupliquer un `<article class="projet-apercu">` et corriger ses deux liens.
6. Ajouter seulement les liens de dépôt ou de démonstration qui existent. Ne pas remplacer un lien manquant par `href="#"`.

## Compléter la veille

Dans `veille.html`, dupliquer un `<article class="journal-article">`. Renseigner le titre, la technologie, le statut, la date de publication, la date de consultation, le résumé personnel, l’intérêt pour la formation et le lien direct vers la source.

Comparer la date de l’article et la version de la documentation. Une fonction présentée comme expérimentale dans un ancien article peut être devenue stable. Une proposition d’exercice reste « À essayer » jusqu’à sa réalisation effective.

Ne pas modifier la date de consultation d’une entrée sans retourner lire la source. Pour le suivi, ajouter éventuellement une phrase datée « Essai réalisé le… » avec le résultat réellement observé.

## Remplacer le CV

Placer le CV IPSSI actualisé dans `assets/documents/cv-ilyes-hamouchti.pdf`. Dans la section `id="cv"`, remplacer la note de travail par ces deux liens :

```html
<a class="bouton" href="assets/documents/cv-ilyes-hamouchti.pdf">Consulter mon CV</a>
<a class="bouton bouton-principal"
   href="assets/documents/cv-ilyes-hamouchti.pdf"
   download="CV-Ilyes-Hamouchti.pdf">Télécharger mon CV</a>
```

Ces liens ne sont à insérer que lorsque le fichier est présent et actualisé. Garder un nom stable permet de remplacer le PDF sans modifier les liens. Ne pas mettre l’ancien CV dans le dossier publié.

## Comment fonctionne le menu

Le HTML contient tous les liens dès le chargement. Le composant React `Navigation` les reprend, affiche le bouton du menu sur les petits écrans et permet d’afficher ou de masquer les liens.

`useState` conserve l’état ouvert/fermé, puis React met à jour la visibilité et `aria-expanded`, l’état annoncé aux lecteurs d’écran. La touche Échap ferme le menu et redonne le focus au bouton grâce à `useRef`. `useEffect` installe les écouteurs d’événements et les retire lors du démontage. `matchMedia()` adapte le menu à la largeur de l’écran. Un observateur souligne la section en cours de lecture sur l’accueil.

La fonction `h(...)` est un nom court pour `React.createElement(...)`. Par exemple, `h('button', { onClick: action }, 'Ouvrir')` crée un bouton. Cette écriture sans JSX permet de modifier directement les composants JavaScript et d’actualiser la page sans outil de compilation. Les composants sont raccordés à l’en-tête avec `createRoot`. Voir les documentations officielles de [createElement](https://react.dev/reference/react/createElement) et de [l’intégration progressive de React](https://react.dev/learn/add-react-to-an-existing-project).

## Comment fonctionnent les animations

L’accueil contient une illustration SVG directement dans le HTML. Le satellite effectue un tour en 24 secondes, l’anneau en pointillés tourne plus lentement et les étoiles varient doucement en opacité. Les durées et les mouvements se modifient dans `css/animations.css`, avec les règles `animation` et `@keyframes`.

Les titres de l’accueil arrivent successivement. Un `IntersectionObserver` ajoute la classe `revele` quand une section entre dans l’écran. Cette classe lance une courte apparition, puis disparaît à la fin du mouvement. Chaque bloc n’est animé qu’une fois par chargement. Le texte reste accessible sans JavaScript ; aucune section n’attend un script pour devenir lisible.

Le bouton « Animations Ⅱ » met les mouvements en pause, puis « Reprendre ▷ » les relance. Lorsque l’appareil demande de réduire les mouvements, le site commence sans animation. Le bouton « Animer ▷ » permet alors de les activer volontairement pour la page courante. Ce choix ne modifie aucun réglage de l’appareil et n’est pas enregistré. Les mouvements continus sont aussi suspendus quand l’onglet passe en arrière-plan.

Les boutons se soulèvent légèrement au survol, les captures des projets s’agrandissent doucement et les liens du menu se soulignent progressivement. Le mode réduit et la pause suppriment ces transitions. Le hook React `useMouvements` conserve l’état des commandes ; le CSS réalise les animations. Aucune bibliothèque d’animation, boucle JavaScript de rendu ou compilation du code du portfolio n’est nécessaire.

## Bibliothèque React locale

Le petit script `js/theme.js` est chargé avant les styles pour appliquer le thème mémorisé dès le premier affichage. Ensuite, les scripts différés sont chargés dans cet ordre : `js/vendor/react-portfolio.js`, `js/animations.js`, puis `js/navigation.js`. Conserver cet ordre dans les cinq pages. Le fichier du dossier `vendor` contient les bibliothèques minifiées ; les autres contiennent le code modifiable du portfolio. Aucun CDN, police distante ou service de suivi n’est appelé.

Pour changer uniquement les textes, les styles ou les composants, modifier leurs fichiers et actualiser le navigateur. Ne pas lancer de commande npm.

Pour reconstruire la bibliothèque locale, **seulement en cas de mise à jour de React**, installer Node.js et pnpm, puis exécuter `pnpm install --frozen-lockfile`, suivi de `pnpm run vendor`. Les versions et leurs dépendances sont fixées dans `package.json` et `pnpm-lock.yaml`. Cette opération facultative nécessite Internet pour télécharger les paquets. `pnpm run check` vérifie la syntaxe des trois fichiers applicatifs.

## Mode jour et mode nuit

Le bouton rond soleil/lune dans l’en-tête change le thème sur toutes les pages. Son libellé accessible et son infobulle annoncent le mode vers lequel il bascule. Il fonctionne au clic, au toucher et avec Entrée ou Espace au clavier.

Le fond, les textes, les bordures et l’illustration changent progressivement de couleur pendant 0,8 seconde. Le soleil laisse place à la lune avec une rotation et un fondu. Le changement reste immédiat lorsque les animations sont en pause ou que l’appareil demande de réduire les mouvements ; le bouton « Animer » permet une activation volontaire des animations.

Le mode nuit est le choix initial. La préférence est enregistrée dans `localStorage` sous la clé `portfolio-ilyes-theme` pour la retrouver après rechargement ou en changeant de page. Seules les valeurs `jour` et `nuit` sont stockées, sans envoi vers un serveur. Si le stockage est bloqué, le bouton fonctionne pour la page courante. Les mentions légales décrivent cette préférence locale.

Les chemins CSS et JavaScript portent un suffixe de version `?v=jour-nuit-1` pour éviter de réutiliser les anciens fichiers du cache. Si une future modification semble absente malgré une actualisation, changer ce suffixe dans les cinq pages.

## Préparer GitHub Pages

Après finalisation des informations, copier le contenu de ce dossier à la racine du dépôt `portfolio` en conservant l’arborescence. Le fichier `.nojekyll` indique que les fichiers doivent être servis directement. Aucune compilation ni commande npm n’est nécessaire.

Avant de remplacer le site en ligne, conserver une copie du dépôt actuel. Après publication, ouvrir le site depuis un téléphone, essayer les liens des projets, l’adresse e-mail, le profil LinkedIn et le téléchargement du CV. Les comportements du logiciel de messagerie et du lecteur PDF dépendent de l’appareil.

## Captures et sources

Les captures proviennent du projet Simmu-Impôt fourni et de la version publique d’EYE’s.Contact, consultée le 16 septembre 2026. La seconde montre l’en-tête et la présentation ; deux autres images manquent dans la version du projet en ligne. Le nouveau portfolio ne modifie pas les dépôts de ces projets.

Les sources de veille et les sources juridiques sont liées dans leurs pages respectives. Le guide informatique Gringer n’est pas encore intégré : son contexte et la contribution personnelle restent à confirmer.
