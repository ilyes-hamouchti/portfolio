/*
 * Ce script gère le thème du portfolio (mode nuit / mode jour).
 * Il est chargé tôt dans le chargement pour appliquer immédiatement le thème
 * mémorisé avant le rendu final de la page, ce qui évite un flash visuel.
 */
window.PortfolioTheme = (() => {
  // On cible l'élément racine du document pour modifier les variables CSS.
  const racine = document.documentElement;

  // Clé de stockage local pour conserver la préférence utilisateur.
  const cle = 'portfolio-ilyes-theme';

  // Par défaut, le site démarre en mode nuit.
  let themeInitial = 'nuit';

  // On tente de récupérer le thème enregistré dans le navigateur.
  try {
    const memorise = localStorage.getItem(cle);

    // On valide que la valeur mémorisée correspond bien à l'un des deux thèmes supportés.
    if (memorise === 'jour' || memorise === 'nuit') themeInitial = memorise;
  } catch {
    // Si le navigateur bloque le stockage local, le site garde le thème par défaut.
    // Le bouton continuera néanmoins de fonctionner localement dans la session.
  }

  // On applique le thème dès le chargement du script pour éviter le flash de mauvais thème.
  racine.dataset.theme = themeInitial;

  // Hook React dédié au thème.
  function useTheme() {
    // On importe uniquement les morceaux de React nécessaires.
    const { useState, useRef, useEffect } = window.PortfolioReact;

    // On mémorise le thème actuel dans l'état local du composant.
    const [theme, setTheme] = useState(themeInitial);

    // Une minuterie sert à supprimer la classe de transition après un délai.
    const minuterie = useRef(null);

    // Cleanup : on nettoie la minuterie et la classe de transition lors du démontage.
    useEffect(() => () => {
      clearTimeout(minuterie.current);
      racine.classList.remove('theme-transition');
    }, []);

    // Cette fonction bascule entre le thème nuit et le thème jour.
    function basculer() {
      // On détermine le thème qu'on veut appliquer ensuite.
      const suivant = theme === 'nuit' ? 'jour' : 'nuit';

      // On annul e toute ancienne minuterie pour éviter les chevauchements.
      clearTimeout(minuterie.current);

      // La classe 'theme-transition' permet d'animer le changement visuel.
      // On n'ajoute cette transition que si les animations ne sont pas globalement en pause.
      racine.classList.toggle('theme-transition', !racine.classList.contains('animations-en-pause'));

      // On applique le nouveau thème sur l'élément racine.
      racine.dataset.theme = suivant;

      // On met à jour l'état React pour refléter le changement dans l'interface.
      setTheme(suivant);

      // On mémorise le choix dans le stockage local si possible.
      try {
        localStorage.setItem(cle, suivant);
      } catch {
        // Le changement reste visible même si le navigateur refuse la persistance.
      }

      // Après 900 ms, on enlève la classe de transition pour ne pas garder un effet permanent.
      minuterie.current = setTimeout(() => racine.classList.remove('theme-transition'), 900);
    }

    // Le hook retourne des infos utiles pour l'interface : le actionneur et le libellé accessibility.
    return {
      basculer,
      description: theme === 'nuit' ? 'Passer en mode jour' : 'Passer en mode nuit'
    };
  }

  // On exporte le hook pour le rendre disponible au code du portfolio.
  return { useTheme };
})();
