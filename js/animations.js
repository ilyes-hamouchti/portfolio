/*
 * Ce fichier gère l'état des animations du portfolio.
 * L'idée est de laisser le CSS faire la partie visuelle (transitions, révélations,
 * apparitions) tandis que JavaScript décide quand les animations doivent être
 * activées, mises en pause ou totalement désactivées selon le système et la volonté de l'utilisateur.
 *
 * Un hook React est une petite fonction qui encapsule un état et ses effets.
 * Ici, il centralise la logique des animations pour le bouton de commande du site.
 */
window.PortfolioMouvements = (() => {
  // On récupère les API React nécessaires : useState pour mémoriser l'état,
  // useEffect pour déclencher des effets après le rendu et useRef pour
  // conserver une valeur sans provoquer un nouveau rendu.
  const { useState, useEffect, useRef } = window.PortfolioReact;

  // On surveille la préférence du système concernant les animations réduites.
  // Si l'utilisateur a paramétré son navigateur pour éviter les mouvements excessifs,
  // cette valeur vaut true et on doit en tenir compte.
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Ce hook retourne des données et des actions pour le composant de navigation.
  function useMouvements() {
    // L'état 'reduits' correspond à la préférence du système.
    // On l'initialise avec la valeur actuelle de matchMedia.
    const [reduits, setReduits] = useState(preference.matches);

    // L'état 'autorises' permet à l'utilisateur d'ignorer temporairement
    // la préférence système si l'option a été activée explicitement.
    const [autorises, setAutorises] = useState(false);

    // L'état 'pause' permet d'arrêter manuellement les animations.
    const [pause, setPause] = useState(false);

    // 'arretes' détermine si les animations doivent être totalement arrêtées.
    // Cela se produit si l'utilisateur a mis les animations en pause,
    // ou si le système demande des animations réduites et que l'utilisateur
    // n'a pas expressément autorisé les mouvements.
    const arretes = pause || (reduits && !autorises);

    // useRef garde la valeur actuelle de 'arretes' sans provoquer un rerender.
    // Cela est utile dans les effets car on veut savoir l'état en cours au moment
    // où l'observateur est créé et nettoyé.
    const etatArrete = useRef(arretes);

    // Cette effect hook écoute les changements de préférence du système.
    // Par exemple, si l'utilisateur modifie son système au cours de l'utilisation,
    // on réévalue la configuration de mouvement.
    useEffect(() => {
      // Cette fonction reçoit l'événement de changement de la media query.
      function suivrePreference(evenement) {
        // 'evenement.matches' indique si la préférence système est active.
        setReduits(evenement.matches);

        // Dès qu'une préférence système change, on annule l'autorisation manuelle
        // précédente pour éviter un conflit entre la configuration du système et
        // l'option choisie par l'utilisateur.
        setAutorises(false);
      }

      // On ajoute l'écouteur sur la media query.
      preference.addEventListener('change', suivrePreference);

      // Nettoyage : on retire l'écouteur lors du démontage du composant.
      return () => preference.removeEventListener('change', suivrePreference);
    }, []);

    // Cet effet applique l'état des animations sur le document HTML.
    // Il ajoute ou enlève des classes CSS utilisées par les styles du site.
    useEffect(() => {
      // On met à jour la référence courante pour que les autres effets voient
      // l'état réel sans dépendre d'un render ancien.
      etatArrete.current = arretes;

      // On cible la racine du document pour ajouter des classes globales.
      const racine = document.documentElement;

      // 'animations-pretes' marque que les scripts ont bien initialisé les animations.
      racine.classList.add('animations-pretes');

      // 'animations-en-pause' est ajouté si on arrête totalement les animations.
      racine.classList.toggle('animations-en-pause', arretes);

      // 'mouvements-autorises' signale qu'un utilisateur a override la préférence système.
      racine.classList.toggle('mouvements-autorises', autorises);

      // Si les animations sont arrêtées, on enlève immédiatement les classes CSS
      // qui déclenchent les effets de révélation comme 'revele' ou 'arrivee'.
      if (arretes) {
        document.querySelectorAll('.revele, .arrivee').forEach((element) => {
          element.classList.remove('revele', 'arrivee');
        });
      }
    }, [arretes, autorises]);

    // Ici, on initialise les animations d'entrée et les observeurs de scroll.
    // On ne veut pas réactiver les animations à chaque changement de state sans besoin.
    useEffect(() => {
      // Ce tableau stocke les fonctions de nettoyage pour supprimer les événements
      // ajoutés aux éléments animés lors du démontage du composant.
      const nettoyage = [];

      // Cette fonction ajoute une classe CSS d'animation à un élément et supprime
      // automatiquement cette classe à la fin de l'animation.
      function apparaitre(element, classe) {
        // Ajout de la classe d'animation (par exemple 'arrivee' ou 'revele').
        element.classList.add(classe);

        // On crée un gestionnaire qui se déclenche lorsque l'animation se termine.
        function terminer(evenement) {
          // On vérifie que l'animation concernée est bien celle de l'élément.
          if (evenement.target !== element) return;

          // On enlève la classe pour pouvoir réanimer l'élément plus tard si nécessaire.
          element.classList.remove(classe);

          // On retire l'écouteur pour éviter les fuites mémoire.
          element.removeEventListener('animationend', terminer);
        }

        // On écoute la fin de l'animation pour nettoyer proprement.
        element.addEventListener('animationend', terminer);

        // On enregistre le nettoyage pour le retirer lors du démontage.
        nettoyage.push(() => {
          element.classList.remove(classe);
          element.removeEventListener('animationend', terminer);
        });
      }

      // Les éléments de l'accueil doivent apparaître dès le chargement, sauf si les
      // animations sont arrêtées. Cette condition évite les animations au montage si
      // le site est en mode réduit.
      if (!etatArrete.current) {
        document.querySelectorAll('.accueil h1 span, .accueil-description, .accueil-texte .boutons, .page-intro')
          .forEach((element) => apparaitre(element, 'arrivee'));
      }

      // On déclare un observateur qui surveille les éléments au scroll.
      let observateur;

      // IntersectionObserver est supporté par les navigateurs modernes.
      if ('IntersectionObserver' in window) {
        // Lorsque l'élément devient visible, on ajoute la classe 'revele'.
        observateur = new IntersectionObserver((entrees) => {
          entrees.forEach((entree) => {
            // Si l'élément n'est pas dans la zone visible, on ignore.
            if (!entree.isIntersecting) return;

            // On applique l'animation seulement si l'option d'arrêt n'est pas active.
            if (!etatArrete.current) apparaitre(entree.target, 'revele');

            // Après affichage, on n'observe plus cet élément pour éviter des répétitions.
            observateur.unobserve(entree.target);
          });
        }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });

        // On cible tous les éléments qui doivent être révélés lors du scroll.
        document.querySelectorAll(
          '.intro-section, .presentation, .parcours-colonnes > div, .competence-ligne, ' +
          '.projet-apercu, .veille-apercu, .contact, .journal-article, .fiche-grille > section'
        ).forEach((element) => observateur.observe(element));
      }

      // Cette fonction applique la classe 'page-inactive' quand l'onglet est caché.
      function suivreVisibilite() {
        document.documentElement.classList.toggle('page-inactive', document.hidden);
      }

      // On écoute les changements de visibilité de l'onglet pour gérer les animations.
      document.addEventListener('visibilitychange', suivreVisibilite);

      // On exécute immédiatement la logique pour l'état initial.
      suivreVisibilite();

      // Nettoyage quand le composant est retiré : on déconnecte l'observateur,
      // supprime les classes et enlève les événements.
      return () => {
        observateur?.disconnect();
        nettoyage.forEach((nettoyer) => nettoyer());
        document.removeEventListener('visibilitychange', suivreVisibilite);
        document.documentElement.classList.remove('animations-pretes', 'animations-en-pause', 'mouvements-autorises', 'page-inactive');
      };
    }, []);

    // Cette fonction sert au bouton "Animations" situé dans la navigation.
    // Elle décide si on passe en mode autorisé, on met en pause ou on reprend.
    function basculer() {
      // Si le système demande des animations réduites et que l'utilisateur n'a pas
      // encore explicitly accepté, on active l'option manuelle.
      if (reduits && !autorises) {
        setAutorises(true);
        setPause(false);
      } else {
        // Sinon, on inverse l'état de pause.
        setPause((valeur) => !valeur);
      }
    }

    // 'activation' est un libellé calculé pour les boutons :
    // s'il faut activer les animations car elles sont réduites, on affiche un message dédié.
    const activation = reduits && !autorises;

    // Le hook retourne des propriétés lisibles pour le composant React.
    return {
      basculer,
      arretes,
      texte: activation ? 'Animer ▷' : pause ? 'Reprendre ▷' : 'Animations Ⅱ',
      description: activation ? 'Activer les animations sur ce site'
        : pause ? 'Reprendre les animations' : 'Mettre les animations en pause'
    };
  }

  // On expose le hook pour que les autres fichiers JavaScript puissent l'utiliser.
  return { useMouvements };
})();
