/*
 * Ce fichier initialise la navigation principale du portfolio en React.
 * Le code utilise createElement au lieu de JSX pour éviter toute étape de compilation.
 * L'objectif est de gérer le menu, les boutons, le thème, les animations et la
 * mise en évidence de la section active sans avoir à remplacer le HTML statique.
 */
(() => {
  // On récupère les fonctions React dont le composant a besoin.
  const { createElement: h, createRoot, useState, useEffect, useRef } = window.PortfolioReact;

  // On récupère les hooks spécifiques au projet : les animations et le thème.
  const { useMouvements } = window.PortfolioMouvements;
  const { useTheme } = window.PortfolioTheme;

  // Cette media query indique si l'écran est assez large pour afficher le menu horizontal.
  const ecranLarge = window.matchMedia('(min-width: 960px)');

  // On cible l'élément .entete où le menu React sera affiché.
  const entete = document.querySelector('.entete');

  // Si l'en-tête n'existe pas dans la page, on stoppe immédiatement le script.
  if (!entete) return;

  // Les liens de navigation sont lus depuis le HTML existant.
  // Cela permet de garder le contenu accessible même si JavaScript est désactivé.
  const liens = [...entete.querySelectorAll('.liens-navigation a')].map((lien) => ({
    href: lien.getAttribute('href'),
    texte: lien.childNodes[0].textContent.trim(),
    fleche: lien.querySelector('[aria-hidden]')?.textContent,
    pageActuelle: lien.getAttribute('aria-current')
  }));

  // Composant bouton pour contrôler les animations.
  function BoutonAnimations({ mouvements }) {
    return h('button', {
      className: 'bouton-mouvement', type: 'button',
      onClick: mouvements.basculer,
      'aria-label': mouvements.description, title: mouvements.description
    },
      h('span', { className: 'libelle-mouvement' }, mouvements.texte),
      h('span', { className: 'symbole-mouvement', 'aria-hidden': true }, mouvements.arretes ? '▷' : 'Ⅱ')
    );
  }

  // Composant bouton pour basculer le thème clair/sombre.
  function BoutonTheme({ theme }) {
    return h('button', {
      className: 'bouton-theme', type: 'button', onClick: theme.basculer,
      'aria-label': theme.description, title: theme.description
    },
      h('svg', {
        className: 'icone-theme', viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
        'aria-hidden': true, focusable: false
      },
        h('g', { className: 'icone-soleil' },
          h('circle', { cx: 12, cy: 12, r: 4 }),
          h('path', { d: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4L19 5' })
        ),
        h('path', { className: 'icone-lune', d: 'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z' })
      )
    );
  }

  // Ce composant représente toute la navigation du site.
  function Navigation() {
    // 'large' indique si l'écran est suffisamment large pour afficher le menu de manière horizontale.
    const [large, setLarge] = useState(ecranLarge.matches);

    // 'ouvert' indique si le menu mobile est déplié.
    const [ouvert, setOuvert] = useState(false);

    // 'sectionActive' mémorise l'id de la section actuellement visible pour souligner le bon lien.
    const [sectionActive, setSectionActive] = useState('');

    // Référence du bouton de menu mobile pour pouvoir lui redonner le focus après fermeture.
    const boutonMenu = useRef(null);

    // On construit les états liés aux mouvements et au thème avec les hooks du projet.
    const mouvements = useMouvements();
    const theme = useTheme();

    // Cet effet surveille les changements de largeur d'écran (mobile/desktop).
    useEffect(() => {
      function adapterMenu(evenement) {
        // Si la taille passe en mode grand écran, on referme le menu mobile.
        setLarge(evenement.matches);
        setOuvert(false);
      }

      // On ajoute l'écouteur sur la media query.
      ecranLarge.addEventListener('change', adapterMenu);

      // Nettoyage : on retire l'écouteur lors du démontage du composant.
      return () => ecranLarge.removeEventListener('change', adapterMenu);
    }, []);

    // Cet effet gérer le clavier pour fermer le menu mobile avec la touche Échap.
    useEffect(() => {
      // Si le menu est déjà fermé ou si l'écran est large, on ne fait rien.
      if (large || !ouvert) return;

      function fermerAvecEchap(evenement) {
        // Si la touche utilisée est Escape, on ferme le menu et on remet le focus sur le bouton.
        if (evenement.key === 'Escape') {
          setOuvert(false);
          boutonMenu.current?.focus();
        }
      }

      // On attache l'écouteur au document.
      document.addEventListener('keydown', fermerAvecEchap);

      // Nettoyage quand le menu change de statut.
      return () => document.removeEventListener('keydown', fermerAvecEchap);
    }, [large, ouvert]);

    // Le menu souligne la section actuellement visible pendant la lecture de la page.
    useEffect(() => {
      const accueil = document.querySelector('.accueil');

      // Si aucune section accueil ou si IntersectionObserver n'est pas pris en charge,
      // on ne fait rien.
      if (!accueil || !('IntersectionObserver' in window)) return;

      // On crée un observateur qui alerte dès qu'une section devient visible.
      const observateur = new IntersectionObserver((entrees) => {
        entrees.forEach((entree) => {
          // On met à jour seulement la section qui est visible.
          if (entree.isIntersecting) setSectionActive(entree.target.id);
        });
      }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });

      // On observe d'abord l'accueil, puis toutes les sections ancrées.
      observateur.observe(accueil);
      liens.filter((lien) => lien.href.startsWith('#')).forEach((lien) => {
        const section = document.querySelector(lien.href);
        if (section) observateur.observe(section);
      });

      // Quand le composant est retiré, on désactive l'observateur.
      return () => observateur.disconnect();
    }, []);

    // Le rendu du composant structure le menu et les boutons.
    return h('nav', { className: 'navigation conteneur', 'aria-label': 'Navigation principale' },
      h('a', { className: 'logo', href: 'index.html', 'aria-label': 'Ilyes Hamouchti, accueil' },
        'IH', h('span', null, '.')
      ),
      h('div', { className: 'commandes-navigation' },
        h(BoutonTheme, { theme }),
        h(BoutonAnimations, { mouvements }),
        h('button', {
          className: 'menu-bouton', type: 'button', hidden: large, ref: boutonMenu,
          'aria-controls': 'menu-principal', 'aria-expanded': large || ouvert,
          onClick: () => setOuvert((valeur) => !valeur)
        }, ouvert ? 'Fermer' : 'Menu')
      ),
      h('ul', { className: 'liens-navigation', id: 'menu-principal', hidden: !large && !ouvert },
        liens.map((lien) => h('li', { key: lien.href },
          h('a', {
            href: lien.href,
            'aria-current': lien.pageActuelle || (sectionActive && lien.href === '#' + sectionActive ? 'location' : undefined),
            onClick: () => setOuvert(false)
          },
            lien.texte,
            lien.fleche ? h('span', { 'aria-hidden': true }, ' ', lien.fleche) : null
          )
        ))
      )
    );
  }

  // Seul l'en-tête du site est rendu par React.
  // Le contenu éditorial reste en HTML statique pour conserver une base accessible.
  createRoot(entete).render(h(Navigation));
})();
