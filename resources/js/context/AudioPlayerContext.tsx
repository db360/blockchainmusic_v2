import { createContext } from 'react';
import { AudioPlayerContextType, defaultContextValue } from '@/types/context/audioPlayerContext';



// Crea el contexto
export const AudioPlayerContext = createContext<AudioPlayerContextType>(defaultContextValue);
