/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Image as ImageIcon, Type, Calculator as CalcIcon, FileText, Search, Download, 
  Upload, Check, Copy, RefreshCw, ArrowRight, Info, Layers, Zap, Shield, Menu, X, Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Constants ---
type ToolId = 'img-to-png' | 'img-compress' | 'text-case' | 'word-counter' | 'calculator';
interface Tool { id: ToolId; name: string; description: string; icon: any; category: string; }

const TOOLS: Tool[] = [
  { id: 'img-to-png', name: 'Image to PNG', description: 'Convert any image format to high-quality PNG instantly.', icon: ImageIcon, category: 'Image' },
  { id: 'img-compress', name: 'Image Compressor', description: 'Reduce image file size without losing visible quality.', icon: Layers, category: 'Image' },
  { id: 'text-case', name: 'Text Case Converter', description: 'Switch between uppercase, lowercase, and title case.', icon: Type, category: 'Text' },
  { id: 'word-counter', name: 'Word Counter', description: 'Detailed statistics for your text: words, chars, and more.', icon: FileText, category: 'Text' },
  { id: 'calculator', name: 'Smart Calculator', description: 'A clean, modern calculator for quick daily math.', icon: CalcIcon, category: 'Utility' }
];

// --- Shared Components ---
const MeshBackground = () => (
  <>
    <div className="bg-mesh" />
    <div className="bg-noise" />
  </>
);

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ['home', 'tools', 'about'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 md:py-6' : 'py-6 md:py-10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl md:rounded-[2rem] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/50 border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center gap-2 md:gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl accent-gradient flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Zap className="w-5 h-5 md:w-7 md:h-7 text-white fill-current" />
            </div>
            <span className="text-xl md:text-3xl font-display font-black tracking-tighter">Omni<span className="text-indigo-400">Tools</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map(page => (
              <button 
                key={page} 
                onClick={() => onNavigate(page)} 
                className={`relative px-2 py-1 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${currentPage === page ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
              >
                {page}
                {currentPage === page && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex glass px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/10 transition-all active:scale-95 border-white/10">
              Sign In
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }} 
            className="md:hidden fixed inset-x-4 top-24 z-50 glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black"
          >
            <div className="p-8 space-y-4">
              {navItems.map(page => (
                <button 
                  key={page} 
                  onClick={() => { onNavigate(page); setIsOpen(false); }} 
                  className={`block px-6 py-4 rounded-2xl text-xl font-bold transition-all ${currentPage === page ? 'accent-gradient text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'} w-full text-left capitalize`}
                >
                  {page}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button className="w-full accent-gradient py-4 rounded-2xl font-bold text-white shadow-lg shadow-indigo-500/20">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <footer className="glass border-t border-white/[0.05] py-20 md:py-32 mt-32 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
      <div className="col-span-1 sm:col-span-2 md:col-span-2 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl accent-gradient flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Zap className="w-7 h-7 text-white fill-current" />
          </div>
          <span className="text-3xl font-display font-black tracking-tighter">OmniTools</span>
        </div>
        <p className="text-zinc-500 text-lg md:text-xl max-w-sm leading-relaxed font-light">
          Crafting premium, fast, and secure online utilities for the modern web. 
          Local-first processing, privacy-focused, and always free.
        </p>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300"><Github className="w-6 h-6" /></button>
          <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300"><Zap className="w-6 h-6" /></button>
        </div>
      </div>
      
      <div className="space-y-8">
        <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Product</h4>
        <ul className="space-y-5 text-zinc-500 text-lg">
          <li><button onClick={() => onNavigate('tools')} className="hover:text-indigo-400 transition-all hover:translate-x-2 flex items-center gap-2 group">All Tools <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /></button></li>
          <li><button onClick={() => onNavigate('home')} className="hover:text-indigo-400 transition-all hover:translate-x-2 flex items-center gap-2 group">Featured <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /></button></li>
          <li><button className="hover:text-indigo-400 transition-all hover:translate-x-2">Changelog</button></li>
        </ul>
      </div>

      <div className="space-y-8">
        <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Company</h4>
        <ul className="space-y-5 text-zinc-500 text-lg">
          <li><button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-all hover:translate-x-2 flex items-center gap-2 group">About Us <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" /></button></li>
          <li><button className="hover:text-indigo-400 transition-all hover:translate-x-2">Privacy Policy</button></li>
          <li><button className="hover:text-indigo-400 transition-all hover:translate-x-2">Terms of Service</button></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-24 md:mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-zinc-600 text-sm font-medium">© 2026 OmniTools. All rights reserved.</p>
      <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
        Made with <Zap className="w-4 h-4 text-indigo-500 fill-current" /> for the community
      </div>
    </div>
  </footer>
);

// --- Tool Components ---
const ImageToPng = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); }
  };

  const convert = () => {
    if (!file) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d')?.drawImage(img, 0, 0);
      setResult(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="glass-card p-8 md:p-12 rounded-2xl md:rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-all duration-500 relative group overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
        <div className="relative z-0 flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
            <Upload className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-zinc-200 mb-1 md:mb-2">{file ? file.name : 'Drop your image here'}</p>
          <p className="text-xs md:text-sm text-zinc-500">Supports JPG, WEBP, GIF, and more</p>
        </div>
      </div>
      {preview && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 md:gap-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img src={preview} alt="Preview" className="relative max-h-60 md:max-h-80 rounded-2xl border border-white/10 shadow-2xl" />
          </div>
          {!result ? (
            <button onClick={convert} disabled={isProcessing} className="w-full md:w-auto px-8 md:px-10 py-3 md:py-4 accent-gradient text-white rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100">
              {isProcessing ? <RefreshCw className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />} 
              {isProcessing ? 'Converting...' : 'Convert to PNG'}
            </button>
          ) : (
            <motion.a 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              href={result} 
              download="omnitools-converted.png" 
              className="w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-5 h-5" /> Download PNG
            </motion.a>
          )}
        </motion.div>
      )}
    </div>
  );
};

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string, size: number } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setResult(null); }
  };

  const compress = () => {
    if (!file) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d')?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setResult({ url: URL.createObjectURL(blob), size: blob.size });
          setIsProcessing(false);
        }
      }, 'image/jpeg', quality);
    };
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="glass-card p-8 md:p-12 rounded-2xl md:rounded-3xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-all duration-500 relative group overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
        <div className="relative z-0 flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
            <Layers className="w-8 h-8 md:w-10 md:h-10 text-indigo-400" />
          </div>
          <p className="text-lg md:text-xl font-semibold text-zinc-200 mb-1 md:mb-2">{file ? file.name : 'Select image to compress'}</p>
          <p className="text-xs md:text-sm text-zinc-500">Original size: {file ? (file.size / 1024).toFixed(2) + ' KB' : 'Supports JPG, PNG, WEBP'}</p>
        </div>
      </div>
      {file && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-1">Compression Quality</h4>
                <p className="text-zinc-500 text-xs md:text-sm">Balanced quality vs file size</p>
              </div>
              <span className="text-2xl md:text-3xl font-display font-bold text-indigo-400 text-glow">{Math.round(quality * 100)}%</span>
            </div>
            <div className="relative h-3 md:h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <motion.div 
                className="absolute inset-y-0 left-0 accent-gradient" 
                initial={false}
                animate={{ width: `${quality * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] md:text-xs font-bold text-zinc-600 uppercase tracking-widest">
              <span>Small Size</span>
              <span>High Quality</span>
            </div>
          </div>
          
          <button 
            onClick={compress} 
            disabled={isProcessing} 
            className="w-full py-4 md:py-5 accent-gradient text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isProcessing ? <RefreshCw className="animate-spin w-5 h-5 md:w-6 md:h-6" /> : <Zap className="w-5 h-5 md:w-6 md:h-6" />} 
            {isProcessing ? 'Optimizing...' : 'Compress Image Now'}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border-indigo-500/20"
            >
              <div className="flex gap-6 md:gap-10">
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 md:mb-2">Original</p>
                  <p className="text-xl md:text-2xl font-display font-bold text-zinc-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <div className="w-px h-10 md:h-12 bg-white/10" />
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 md:mb-2">Compressed</p>
                  <p className="text-xl md:text-2xl font-display font-bold text-white">{(result.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-xs md:text-sm font-bold text-emerald-400 mb-3 md:mb-4">Saved {Math.round((1 - result.size / file.size) * 100)}%</p>
                <a 
                  href={result.url} 
                  download={`compressed-${file.name}`} 
                  className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-black hover:bg-zinc-200 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5" /> Download
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const TextCaseConverter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const convert = (type: string) => {
    if (type === 'upper') setText(text.toUpperCase());
    else if (type === 'lower') setText(text.toLowerCase());
    else setText(text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
  };
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type or paste your text here..." 
          className="relative w-full h-64 md:h-80 glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 outline-none text-zinc-200 text-base md:text-lg leading-relaxed transition-all focus:border-indigo-500/50 resize-none" 
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex p-1 glass rounded-xl md:rounded-2xl border border-white/5 overflow-x-auto">
          {['upper', 'lower', 'title'].map(t => (
            <button 
              key={t} 
              onClick={() => convert(t)} 
              className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold capitalize transition-all hover:bg-white/5 text-zinc-400 hover:text-white whitespace-nowrap"
            >
              {t} case
            </button>
          ))}
        </div>
        <div className="hidden sm:block flex-grow" />
        <button 
          onClick={copy} 
          className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${
            copied ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'accent-gradient text-white shadow-indigo-500/20 hover:scale-105 active:scale-95'
          }`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />} 
          {copied ? 'Copied!' : 'Copy Result'}
        </button>
      </div>
    </div>
  );
};

const WordCounter = () => {
  const [text, setText] = useState('');
  const stats = useMemo(() => ({
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    paragraphs: text.split(/\n+/).filter(p => p.trim().length > 0).length
  }), [text]);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 text-center group hover:border-indigo-500/30 transition-colors">
            <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2 md:mb-3 group-hover:text-indigo-400 transition-colors">{label}</p>
            <p className="text-2xl md:text-4xl font-display font-extrabold text-white text-glow">{value}</p>
          </div>
        ))}
      </div>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl md:rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Start typing or paste your content here..." 
          className="relative w-full h-64 md:h-96 glass-card p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-white/10 outline-none text-zinc-200 text-lg md:text-xl leading-relaxed transition-all focus:border-indigo-500/50 resize-none" 
        />
      </div>
    </div>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const handleBtn = (val: string) => {
    if (val === 'C') { setDisplay('0'); setEquation(''); return; }
    if (val === '=') {
      try { const res = eval(equation.replace(/×/g, '*').replace(/÷/g, '/')); setDisplay(String(res)); setEquation(String(res)); }
      catch { setDisplay('Error'); }
      return;
    }
    if (val === 'DEL') { setEquation(e => e.slice(0, -1)); return; }
    setEquation(prev => prev === '0' ? val : prev + val);
    setDisplay(prev => (prev === '0' || ['+', '-', '×', '÷'].includes(equation.slice(-1))) ? val : prev + val);
  };

  return (
    <div className="max-w-sm mx-auto glass-card p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
      <div className="mb-6 md:mb-10 text-right px-2 md:px-4">
        <p className="text-zinc-500 text-base md:text-lg h-6 md:h-8 font-mono tracking-wider overflow-hidden">{equation || ' '}</p>
        <p className="text-4xl md:text-6xl font-display font-bold text-white truncate text-glow">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'DEL', '='].map(btn => (
          <button 
            key={btn} 
            onClick={() => handleBtn(btn)} 
            className={`h-12 md:h-16 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all active:scale-90 flex items-center justify-center ${
              btn === '=' ? 'accent-gradient text-white shadow-lg shadow-indigo-500/20' : 
              ['÷', '×', '-', '+'].includes(btn) ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' :
              ['C', 'DEL', '(', ')'].includes(btn) ? 'bg-white/5 text-zinc-400 hover:bg-white/10' :
              'bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08]'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Pages ---
const HomePage = ({ onSelectTool }: { onSelectTool: (id: ToolId) => void }) => {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => TOOLS.filter(t => t.name.toLowerCase().includes(search.toLowerCase())), [search]);

  // Mouse tracking for card glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.card-glow');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div className="space-y-32 pt-32" onMouseMove={handleMouseMove}>
      <section className="text-center space-y-8 md:space-y-12 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-indigo-400 text-xs md:text-sm font-bold mb-6 md:mb-8"
          >
            <Zap className="w-3 h-3 md:w-4 md:h-4 fill-current" /> v1.2.0 is now live
          </motion.div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-extrabold tracking-tight mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]">
            All-in-One <br />
            <span className="gradient-text text-glow">Free Tools</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            Fast, secure, and premium utilities designed for modern creators. 
            No registration, no tracking, just pure performance.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl md:rounded-[2rem] blur-xl opacity-10 group-hover:opacity-30 transition duration-1000" />
          <div className="relative">
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 md:w-6 md:h-6 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for a tool..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full glass py-4 md:py-7 pl-12 md:pl-16 pr-6 md:pr-8 rounded-2xl md:rounded-[2rem] border border-white/10 outline-none transition-all text-zinc-200 text-base md:text-lg focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5" 
            />
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">Popular Tools</h2>
            <p className="text-zinc-500 text-lg">Hand-picked utilities for your daily workflow</p>
          </motion.div>
          <div className="hidden md:flex gap-3">
            <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer transition-all active:scale-90"><ArrowRight className="w-5 h-5 rotate-180" /></button>
            <button className="w-12 h-12 rounded-full glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer transition-all active:scale-90"><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool, idx) => (
              <motion.div 
                key={tool.id} 
                layout
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }} 
                onClick={() => onSelectTool(tool.id)} 
                className="glass-card p-8 md:p-12 rounded-3xl md:rounded-[3rem] glass-hover group cursor-pointer flex flex-col items-start card-glow"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-indigo-500/5 flex items-center justify-center mb-8 md:mb-12 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-700 shadow-inner overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <tool.icon className="w-7 h-7 md:w-10 md:h-10 text-indigo-400 relative z-10" />
                </div>
                <div className="mb-8 md:mb-12">
                  <span className="text-[10px] md:text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3 md:mb-4 block opacity-70">{tool.category}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-5 group-hover:text-white transition-colors">{tool.name}</h3>
                  <p className="text-zinc-500 text-sm md:text-lg leading-relaxed font-light">{tool.description}</p>
                </div>
                <div className="mt-auto flex items-center text-indigo-400 text-sm font-bold gap-2 group-hover:gap-4 transition-all duration-300">
                  Try it now <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [activeId, setActiveId] = useState<ToolId | null>(null);
  const tool = useMemo(() => TOOLS.find(t => t.id === activeId), [activeId]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30 overflow-x-hidden">
      <MeshBackground />
      <Navbar onNavigate={(p) => { setPage(p); setActiveId(null); }} currentPage={page} />
      
      <main className="flex-grow pb-20 md:pb-32 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeId || page} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
            {activeId && tool ? (
              <div className="max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-12">
                <button 
                  onClick={() => setActiveId(null)} 
                  className="group flex items-center gap-3 text-zinc-500 hover:text-white mb-12 md:mb-16 transition-all"
                >
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
                </button>
                
                <div className="space-y-12 md:space-y-20">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] accent-gradient flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                      <tool.icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-2 md:mb-4 block opacity-70">{tool.category}</span>
                      <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-2 md:mb-4 leading-none">{tool.name}</h1>
                      <p className="text-zinc-500 text-lg md:text-xl font-light max-w-2xl">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 md:p-16 rounded-3xl md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -mr-48 -mt-48" />
                    <div className="relative z-10">
                      {activeId === 'img-to-png' && <ImageToPng />}
                      {activeId === 'img-compress' && <ImageCompressor />}
                      {activeId === 'text-case' && <TextCaseConverter />}
                      {activeId === 'word-counter' && <WordCounter />}
                      {activeId === 'calculator' && <Calculator />}
                    </div>
                  </div>
                </div>
              </div>
            ) : page === 'about' ? (
              <div className="max-w-4xl mx-auto pt-20 md:pt-32 px-4 md:px-6 space-y-16 md:space-y-20">
                <div className="text-center space-y-4 md:space-y-6">
                  <h1 className="text-4xl md:text-7xl font-display font-extrabold tracking-tight">About <span className="gradient-text">OmniTools</span></h1>
                  <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
                    We believe premium tools should be accessible to everyone, without compromising on privacy or performance.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="glass-card p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] space-y-4 md:space-y-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 md:w-7 md:h-7 text-indigo-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">Our Mission</h3>
                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
                      To provide a suite of high-quality digital tools that are fast, free, and beautiful. 
                      We focus on the essentials, perfected for your daily workflow.
                    </p>
                  </div>
                  <div className="glass-card p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] space-y-4 md:space-y-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">Privacy First</h3>
                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
                      Your data is yours. All processing happens locally in your browser. 
                      We never see your files, and we never store your data on any server.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] text-center space-y-6 md:space-y-8">
                  <h3 className="text-2xl md:text-3xl font-bold">Open Source & Community Driven</h3>
                  <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
                    OmniTools is built with modern technologies and is constantly evolving based on user feedback. 
                    Join us in building the best tool suite on the web.
                  </p>
                  <button className="w-full sm:w-auto px-8 py-4 glass glass-hover rounded-2xl font-bold flex items-center justify-center gap-3 mx-auto transition-all">
                    <Github className="w-6 h-6" /> View on GitHub
                  </button>
                </div>
              </div>
            ) : <HomePage onSelectTool={setActiveId} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
    
    <Footer onNavigate={(p) => { setPage(p); setActiveId(null); }} />
  </div>
);
}
