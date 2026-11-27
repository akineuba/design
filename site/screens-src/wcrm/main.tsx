import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Screen } from './Screens';
// #<screen> renders light; #<screen>-dark renders the same screen in the library's dark theme.
let name = location.hash.slice(1);
if (name.endsWith('-dark')) { document.documentElement.dataset.theme = 'dark'; name = name.slice(0, -5); }
createRoot(document.getElementById('root')!).render(<Screen name={name} />);
