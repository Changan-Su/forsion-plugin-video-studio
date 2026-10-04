import { createElement, FileVideo, Play, Pause, SkipBack, SkipForward, Undo2, Redo2,
  PanelLeft, PanelRight, Maximize2, Minimize2, Music2, Sparkles, Download, ChevronDown,
  Plus, Minus, Search, Volume2, VolumeX, Scissors, Copy, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Check, SlidersHorizontal, Film, ChevronLeft, ChevronRight, X, MoreHorizontal, Upload, Keyboard,
  Globe, Terminal, Clapperboard, PictureInPicture2, AppWindow, Eye, ShieldAlert, MousePointerClick, Captions,
  ZoomIn, ZoomOut, PanelBottom, LayoutGrid, RefreshCw, Image, ListFilter, FolderOpen, Pencil, Layers, MessageSquareQuote } from 'lucide';

const glyphs = { FileVideo, Play, Pause, SkipBack, SkipForward, Undo2, Redo2, PanelLeft,
  PanelRight, Maximize2, Minimize2, Music2, Sparkles, Download, ChevronDown, Plus, Minus,
  Search, Volume2, VolumeX, Scissors, Copy, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Check,
  SlidersHorizontal, Film, ChevronLeft, ChevronRight, X, MoreHorizontal, Upload, Keyboard,
  Globe, Terminal, Clapperboard, PictureInPicture2, AppWindow, Eye, ShieldAlert, MousePointerClick, Captions,
  ZoomIn, ZoomOut, PanelBottom, LayoutGrid, RefreshCw, Image, ListFilter, FolderOpen, Pencil, Layers, MessageSquareQuote };

export const icon = name => createElement(glyphs[name], {
  width: 16, height: 16, 'stroke-width': 1.7, 'aria-hidden': 'true', focusable: 'false',
});
