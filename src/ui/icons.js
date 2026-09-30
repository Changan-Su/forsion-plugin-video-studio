import { createElement, FileVideo, Play, Pause, SkipBack, SkipForward, Undo2, Redo2,
  PanelLeft, PanelRight, Maximize2, Minimize2, Music2, Sparkles, Download, ChevronDown,
  Plus, Minus, Search, Volume2, VolumeX, Scissors, Copy, Trash2, ArrowUp, ArrowDown,
  Check, SlidersHorizontal, Film, ChevronLeft, ChevronRight } from 'lucide';

const glyphs = { FileVideo, Play, Pause, SkipBack, SkipForward, Undo2, Redo2, PanelLeft,
  PanelRight, Maximize2, Minimize2, Music2, Sparkles, Download, ChevronDown, Plus, Minus,
  Search, Volume2, VolumeX, Scissors, Copy, Trash2, ArrowUp, ArrowDown, Check,
  SlidersHorizontal, Film, ChevronLeft, ChevronRight };

export const icon = name => createElement(glyphs[name], {
  width: 16, height: 16, 'stroke-width': 1.7, 'aria-hidden': 'true', focusable: 'false',
});
