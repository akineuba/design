// Client entry for the static Foundations page: hydrates the server-rendered markup so menus,
// tabs, accordions and other interactive specimens work outside Storybook.
import { hydrateRoot } from 'react-dom/client';
import { Foundations } from './Foundations';

const root = document.getElementById('foundations-root');
if (root) hydrateRoot(root, <Foundations logoSrc={root.dataset.logo ?? ''} />);
