import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Screen } from './Screens';
createRoot(document.getElementById('root')!).render(<Screen name={location.hash.slice(1)} />);
