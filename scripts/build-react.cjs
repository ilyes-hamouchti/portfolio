/*
 * Ce script est une commande utilitaire facultative.
 * Il ne compile pas la page portfolio elle-même, mais prépare une copie locale
 * de React et de ReactDOM dans le dossier js/vendor afin que le site puisse
 * fonctionner sans dépendre de CDN externes.
 */

// On charge les modules Node nécessaires pour manipuler les chemins et les fichiers.
const path = require('node:path');
const fs = require('node:fs');

// Racine du dossier du projet : on remonte d'un niveau par rapport à ce script.
const racine = path.resolve(__dirname, '..');

// Emplacement des dépendances ; par défaut, on utilise la racine du projet.
const dependances = path.resolve(process.argv[2] || racine);

// On charge esbuild depuis le dossier des dépendances du projet, afin de pouvoir le compiler.
const esbuild = require(require.resolve('esbuild', { paths: [dependances] }));

// Cette fonction construit le bundle React en isolant l'API utilisée par le portfolio.
async function preparerReact() {
  // esbuild crée un fichier JavaScript unique, prêt à être chargé dans le navigateur.
  await esbuild.build({
    // Répertoire de travail global pour les résolutions de chemins.
    absWorkingDir: racine,

    // On laisse tsconfig vide puisqu'on n'utilise pas TypeScript.
    tsconfigRaw: {},

    // Point d'entrée du bundle : le fichier qui exporte les APIs React.
    entryPoints: [path.join(__dirname, 'react-entry.js')],

    // Sortie du bundle final dans le dossier du site.
    outfile: path.join(racine, 'js/vendor/react-portfolio.js'),

    // On pointe esbuild vers le dossier node_modules du projet pour résoudre les dépendances.
    nodePaths: [path.join(dependances, 'node_modules')],

    // Bundle complet, minifié, en mode navigateur, avec un namespace global dédié.
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'PortfolioReact',
    platform: 'browser',
    target: ['es2020'],

    // On force le mode production pour éviter les messages de debug.
    define: { 'process.env.NODE_ENV': '"production"' },

    // On garde les commentaires de licence en fin de fichier pour respecter les droits.
    legalComments: 'eof',

    // Résolution explicite via Node : on évite de parcourir des dossiers parents manuellement.
    plugins: [{
      name: 'modules-locaux',
      setup(build) {
        // Pour chaque import, on résout le chemin à partir du dossier courant ou de la racine du projet.
        build.onResolve({ filter: /.*/ }, (args) => ({
          path: require.resolve(args.path, { paths: [args.resolveDir || dependances, dependances] })
        }));

        // Pour chaque fichier JavaScript chargé, on lit son contenu directement sans autre étape.
        build.onLoad({ filter: /\.js$/ }, (args) => ({
          contents: fs.readFileSync(args.path, 'utf8'),
          loader: 'js',
          resolveDir: path.dirname(args.path)
        }));
      }
    }]
  });

  // On récupère le dossier de react-dom pour copier les licences nécessaires.
  const dossierReactDOM = path.dirname(require.resolve('react-dom/package.json', { paths: [dependances] }));

  // On copie les fichiers de licence pour React, ReactDOM et Scheduler.
  for (const nom of ['react', 'react-dom', 'scheduler']) {
    const dossier = path.dirname(require.resolve(nom + '/package.json', { paths: [dependances, dossierReactDOM] }));
    fs.copyFileSync(path.join(dossier, 'LICENSE'), path.join(racine, 'js/vendor/LICENSE-' + nom + '.txt'));
  }

  // On affiche un message de confirmation lors de la préparation du bundle.
  console.log('Bibliothèque React locale préparée. Aucun fichier du portfolio à compiler.');
}

// On lance la construction, puis on traite les éventuelles erreurs.
preparerReact().catch((erreur) => {
  console.error(erreur);
  process.exitCode = 1;
});
