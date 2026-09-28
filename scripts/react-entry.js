// Ce fichier sert de point d'entrée pour la construction locale de la bibliothèque React.
// Il réexporte seulement les APIs de React utilisées dans le portfolio :
// - createElement pour créer des nœuds sans JSX,
// - useState et useEffect pour gérer l'état et les effets,
// - useRef pour conserver des références,
// - version pour identifier la version de React embarquée,
// - createRoot pour monter l'arbre React dans le DOM.
export { createElement, useState, useEffect, useRef, version } from 'react';
export { createRoot } from 'react-dom/client';
