/**
 * Species-based dynamic theming for Star Wars character cards.
 * Maps known SWAPI species names to unique visual themes.
 */

export interface SpeciesTheme {
  /** Card border color class */
  border: string;
  /** Card hover border color class */
  hoverBorder: string;
  /** Card background gradient classes */
  gradient: string;
  /** Hover glow shadow class */
  hoverGlow: string;
  /** Badge background + text color classes */
  badge: string;
  /** Badge border color class */
  badgeBorder: string;
  /** Card title hover color */
  titleHover: string;
}

const SPECIES_THEMES: Record<string, SpeciesTheme> = {
  Human: {
    border: 'border-blue-800/60',
    hoverBorder: 'hover:border-blue-400/70',
    gradient: 'bg-gradient-to-b from-blue-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(59,130,246,0.20)]',
    badge: 'bg-blue-500/20 text-blue-300',
    badgeBorder: 'border-blue-400/40',
    titleHover: 'group-hover:text-blue-400',
  },
  Droid: {
    border: 'border-slate-600/60',
    hoverBorder: 'hover:border-slate-400/70',
    gradient: 'bg-gradient-to-b from-slate-800/50 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(148,163,184,0.20)]',
    badge: 'bg-slate-500/20 text-slate-300',
    badgeBorder: 'border-slate-400/40',
    titleHover: 'group-hover:text-slate-300',
  },
  Wookiee: {
    border: 'border-amber-800/60',
    hoverBorder: 'hover:border-amber-600/70',
    gradient: 'bg-gradient-to-b from-amber-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(180,83,9,0.20)]',
    badge: 'bg-amber-800/30 text-amber-400',
    badgeBorder: 'border-amber-700/40',
    titleHover: 'group-hover:text-amber-500',
  },
  Rodian: {
    border: 'border-green-800/60',
    hoverBorder: 'hover:border-green-400/70',
    gradient: 'bg-gradient-to-b from-green-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(34,197,94,0.18)]',
    badge: 'bg-green-500/20 text-green-300',
    badgeBorder: 'border-green-400/40',
    titleHover: 'group-hover:text-green-400',
  },
  Hutt: {
    border: 'border-lime-800/60',
    hoverBorder: 'hover:border-lime-400/70',
    gradient: 'bg-gradient-to-b from-lime-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(132,204,22,0.18)]',
    badge: 'bg-lime-500/20 text-lime-300',
    badgeBorder: 'border-lime-400/40',
    titleHover: 'group-hover:text-lime-400',
  },
  "Yoda's Species": {
    border: 'border-emerald-700/60',
    hoverBorder: 'hover:border-emerald-400/70',
    gradient: 'bg-gradient-to-b from-emerald-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(52,211,153,0.20)]',
    badge: 'bg-emerald-500/20 text-emerald-300',
    badgeBorder: 'border-emerald-400/40',
    titleHover: 'group-hover:text-emerald-400',
  },
  "Twi'lek": {
    border: 'border-purple-700/60',
    hoverBorder: 'hover:border-purple-400/70',
    gradient: 'bg-gradient-to-b from-purple-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(168,85,247,0.20)]',
    badge: 'bg-purple-500/20 text-purple-300',
    badgeBorder: 'border-purple-400/40',
    titleHover: 'group-hover:text-purple-400',
  },
  Togruta: {
    border: 'border-red-700/60',
    hoverBorder: 'hover:border-red-400/70',
    gradient: 'bg-gradient-to-b from-red-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(239,68,68,0.18)]',
    badge: 'bg-red-500/20 text-red-300',
    badgeBorder: 'border-red-400/40',
    titleHover: 'group-hover:text-red-400',
  },
  Ewok: {
    border: 'border-orange-700/60',
    hoverBorder: 'hover:border-orange-400/70',
    gradient: 'bg-gradient-to-b from-orange-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(249,115,22,0.18)]',
    badge: 'bg-orange-500/20 text-orange-300',
    badgeBorder: 'border-orange-400/40',
    titleHover: 'group-hover:text-orange-400',
  },
  'Mon Calamari': {
    border: 'border-cyan-700/60',
    hoverBorder: 'hover:border-cyan-400/70',
    gradient: 'bg-gradient-to-b from-cyan-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(34,211,238,0.18)]',
    badge: 'bg-cyan-500/20 text-cyan-300',
    badgeBorder: 'border-cyan-400/40',
    titleHover: 'group-hover:text-cyan-400',
  },
  Trandoshan: {
    border: 'border-teal-700/60',
    hoverBorder: 'hover:border-teal-400/70',
    gradient: 'bg-gradient-to-b from-teal-950/40 via-slate-900/70 to-slate-900/70',
    hoverGlow: 'hover:shadow-[0_10px_30px_rgba(20,184,166,0.18)]',
    badge: 'bg-teal-500/20 text-teal-300',
    badgeBorder: 'border-teal-400/40',
    titleHover: 'group-hover:text-teal-400',
  },
};

/** Fallback theme for unknown / unmapped species */
const UNKNOWN_THEME: SpeciesTheme = {
  border: 'border-yellow-800/60',
  hoverBorder: 'hover:border-yellow-400/70',
  gradient: 'bg-gradient-to-b from-yellow-950/30 via-slate-900/70 to-slate-900/70',
  hoverGlow: 'hover:shadow-[0_10px_30px_rgba(234,179,8,0.18)]',
  badge: 'bg-yellow-500/20 text-yellow-300',
  badgeBorder: 'border-yellow-500/40',
  titleHover: 'group-hover:text-yellow-400',
};

/**
 * Returns the visual theme for a given species name.
 * Falls back to UNKNOWN_THEME if the species is not mapped.
 */
export const getSpeciesTheme = (speciesName: string): SpeciesTheme => {
  return SPECIES_THEMES[speciesName] ?? UNKNOWN_THEME;
};
