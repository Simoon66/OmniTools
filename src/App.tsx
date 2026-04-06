/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Type, 
  Calculator as CalcIcon, 
  FileText, 
  Search, 
  Download, 
  Upload, 
  Check, 
  Copy, 
  RefreshCw, 
  ArrowRight,
  Info,
  Layers,
  Zap,
  Shield,
  Menu,
  X,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type ToolId = 'img-to-png' | 'img-compress' | 'text-case' | 'word-counter' | 'calculator';

interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: any;
  category: 'Image' | 'Text' | 'Utility';
}

const TOOLS: Tool[] = [
  {
    id: 'img-to-png',
    name: 'Image to PNG',
    description: 'Convert any image format to high-quality PNG instantly.',
    icon: ImageIcon,
    category: 'Image'
  },
  {
    id: 'img-compress',
    name: 'Image Compressor',
    description: 'Reduce image file size without losing visible quality.',
    icon: Layers,
    category: 'Image'
  },
  {
    id: 'text-case',
    name: 'Text Case Converter',
    description: 'Switch between uppercase, lowercase, and title case.',
    icon: Type,
    category: 'Text'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Detailed statistics for your text: words, chars, and more.',
    icon: FileText,
    category: 'Text'
  },
  {
    id: 'calculator',
    name: 'Smart Calculator',
    description: 'A clean, modern calculator for quick daily math.',
    icon: CalcIcon,
    category: 'Utility'
  }
];

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">Omni<span className="text-indigo-400">Tools</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['home', 'tools', 'about'].map((page) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    currentPage === page ? 'text-indigo-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'tools', 'about'].map((page) => (
                <button
                  key={page}
                  onClick={() => { onNavigate(page); setIsOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 w-full text-left capitalize"
                >
                  {page}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="glass border-t border-white/5 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold">OmniTools</span>
          </div>
          <p className="text-zinc-500 max-w-xs">
            Premium, fast, and secure online tools designed for creators, developers, and everyone in between.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><button className="hover:text-indigo-400">All Tools</button></li>
            <li><button className="hover:text-indigo-400">New Tools</button></li>
            <li><button className="hover:text-indigo-400">API</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><button className="hover:text-indigo-400">About Us</button></li>
            <li><button className="hover:text-indigo-400">Privacy Policy</button></li>
            <li><button className="hover:text-indigo-400">Contact</button></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-600">© 2026 OmniTools. All rights reserved.</p>
        <div className="flex gap-6">
          <Github className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  </footer>
);

// --- Tool Implementations ---

const ImageToPng = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  };

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      setResult(dataUrl);
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-6">
      <div className="glass p-8 rounded-2xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-colors relative">
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
        <Upload className="w-12 h-12 text-zinc-600 mb-4" />
        <p className="text-zinc-300 font-medium">{file ? file.name : 'Click or drag image to upload'}</p>
        <p className="text-zinc-500 text-sm mt-1">Supports JPG, WEBP, BMP, etc.</p>
      </div>

      {preview && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
          <img src={preview} alt="Preview" className="max-h-64 rounded-xl shadow-2xl border border-white/10" />
          {!result ? (
            <button
              onClick={convert}
              disabled={isProcessing}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <Zap className="w-5 h-5" />}
              {isProcessing ? 'Converting...' : 'Convert to PNG'}
            </button>
          ) : (
            <a
              href={result}
              download="converted-omnitools.png"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </a>
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
    if (f) {
      setFile(f);
      setResult(null);
    }
  };

  const compress = () => {
    if (!file) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      // Estimate size from base64
      const size = Math.round((dataUrl.length * 3) / 4);
      
      setResult({ url: dataUrl, size });
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-2xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition-colors relative">
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
        <Layers className="w-12 h-12 text-zinc-600 mb-4" />
        <p className="text-zinc-300 font-medium">{file ? file.name : 'Upload image to compress'}</p>
      </div>

      {file && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Compression Quality</span>
              <span className="text-indigo-400 font-mono">{Math.round(quality * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.05" 
              value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={compress}
              disabled={isProcessing}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <Zap className="w-5 h-5" />}
              {isProcessing ? 'Processing...' : 'Compress Image'}
            </button>

            {result && (
              <div className="w-full glass p-6 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">New Size</p>
                  <p className="text-xl font-display font-bold">{(result.size / 1024).toFixed(2)} KB</p>
                  <p className="text-xs text-emerald-400 mt-1">
                    Saved {Math.round((1 - result.size / file.size) * 100)}%
                  </p>
                </div>
                <a
                  href={result.url}
                  download={`compressed-${file.name}`}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const TextCaseConverter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = (type: 'upper' | 'lower' | 'title') => {
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full h-64 glass p-6 rounded-2xl border border-white/10 focus:border-indigo-500/50 outline-none resize-none text-zinc-300 placeholder:text-zinc-600 transition-all"
      />
      
      <div className="flex flex-wrap gap-3">
        <button onClick={() => convert('upper')} className="px-4 py-2 glass glass-hover rounded-lg text-sm font-medium">UPPERCASE</button>
        <button onClick={() => convert('lower')} className="px-4 py-2 glass glass-hover rounded-lg text-sm font-medium">lowercase</button>
        <button onClick={() => convert('title')} className="px-4 py-2 glass glass-hover rounded-lg text-sm font-medium">Title Case</button>
        <div className="flex-grow" />
        <button onClick={copy} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
};

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    return { words, chars, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
        ].map((stat) => (
          <div key={stat.label} className="glass p-4 rounded-xl border border-white/10 text-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-indigo-400">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste text..."
        className="w-full h-80 glass p-6 rounded-2xl border border-white/10 focus:border-indigo-500/50 outline-none resize-none text-zinc-300 placeholder:text-zinc-600 transition-all"
      />
    </div>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    if (val === '=') {
      try {
        // Safe evaluation
        const result = eval(equation.replace(/×/g, '*').replace(/÷/g, '/'));
        setDisplay(String(result));
        setEquation(String(result));
      } catch {
        setDisplay('Error');
      }
      return;
    }
    
    const lastChar = equation.slice(-1);
    const ops = ['+', '-', '×', '÷'];
    
    if (ops.includes(val) && ops.includes(lastChar)) {
      setEquation(equation.slice(0, -1) + val);
      return;
    }

    setEquation(prev => prev === '0' ? val : prev + val);
    setDisplay(prev => (prev === '0' || ops.includes(lastChar)) ? val : prev + val);
  };

  const btns = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', 'DEL', '='
  ];

  return (
    <div className="max-w-xs mx-auto glass p-6 rounded-3xl border border-white/10 shadow-2xl">
      <div className="mb-6 text-right">
        <p className="text-zinc-500 text-sm h-6 font-mono overflow-hidden">{equation || ' '}</p>
        <p className="text-4xl font-display font-bold text-white truncate">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {btns.map((btn) => (
          <button
            key={btn}
            onClick={() => btn === 'DEL' ? setEquation(e => e.slice(0, -1)) : handleBtn(btn)}
            className={`h-14 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${
              btn === '=' ? 'bg-indigo-600 hover:bg-indigo-500 text-white col-span-1' :
              ['÷', '×', '-', '+', 'C', '(', ')', 'DEL'].includes(btn) ? 'bg-white/10 hover:bg-white/20 text-indigo-400' :
              'bg-white/5 hover:bg-white/10 text-zinc-300'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main Pages ---

const HomePage = ({ onSelectTool }: { onSelectTool: (id: ToolId) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-20 pt-20">
      {/* Hero */}
      <section className="text-center space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            All-in-One <span className="gradient-text">Free Online Tools</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Fast, secure, and premium utilities for your daily digital needs. No registration, no ads, just pure productivity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a tool (e.g. 'compress', 'word')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass py-4 pl-12 pr-6 rounded-2xl border border-white/10 focus:border-indigo-500/50 outline-none transition-all text-zinc-200 placeholder:text-zinc-600"
          />
        </motion.div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold">Popular Tools</h2>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectTool(tool.id)}
              className="glass p-8 rounded-3xl glass-hover group cursor-pointer flex flex-col items-start text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <tool.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 group-hover:text-indigo-400 transition-colors">{tool.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{tool.description}</p>
              <div className="mt-auto flex items-center text-indigo-400 text-sm font-semibold gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Open Tool <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Zap className="w-8 h-8 text-indigo-400" />
              <h4 className="text-xl font-bold">Instant Processing</h4>
              <p className="text-zinc-500 text-sm">Everything happens in your browser. No server uploads, no waiting in queues.</p>
            </div>
            <div className="space-y-4">
              <Shield className="w-8 h-8 text-indigo-400" />
              <h4 className="text-xl font-bold">Privacy First</h4>
              <p className="text-zinc-500 text-sm">Your files never leave your computer. We don't store or see any of your data.</p>
            </div>
            <div className="space-y-4">
              <Info className="w-8 h-8 text-indigo-400" />
              <h4 className="text-xl font-bold">100% Free</h4>
              <p className="text-zinc-500 text-sm">No hidden costs, no subscriptions, and no annoying watermarks on your files.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="max-w-3xl mx-auto pt-32 px-4 space-y-12">
    <section className="space-y-6">
      <h1 className="text-4xl font-display font-bold">About <span className="text-indigo-400">OmniTools</span></h1>
      <p className="text-zinc-400 leading-relaxed text-lg">
        OmniTools was born from a simple idea: the internet needs better, faster, and more beautiful utilities that respect user privacy. 
        Most online tools are cluttered with ads, require account creation, or upload your sensitive data to mysterious servers.
      </p>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass p-8 rounded-3xl space-y-4">
        <h3 className="text-xl font-bold">Our Mission</h3>
        <p className="text-zinc-500 text-sm">To provide the highest quality digital tools for free, accessible to everyone, everywhere, without compromising on design or security.</p>
      </div>
      <div className="glass p-8 rounded-3xl space-y-4">
        <h3 className="text-xl font-bold">Privacy Policy</h3>
        <p className="text-zinc-500 text-sm">We use client-side processing. This means your files are processed locally in your browser. We never see your content.</p>
      </div>
    </div>

    <section className="glass p-12 rounded-[2rem] text-center space-y-6">
      <h2 className="text-2xl font-bold">Want to contribute?</h2>
      <p className="text-zinc-500">OmniTools is an open-source project. We're always looking for new tool ideas and improvements.</p>
      <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors">
        View on GitHub
      </button>
    </section>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);

  const activeTool = useMemo(() => TOOLS.find(t => t.id === activeToolId), [activeToolId]);

  const renderContent = () => {
    if (activeToolId && activeTool) {
      return (
        <div className="pt-24 max-w-4xl mx-auto px-4">
          <button 
            onClick={() => setActiveToolId(null)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to All Tools
          </button>
          
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <activeTool.icon className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">{activeTool.name}</h1>
              <p className="text-zinc-500">{activeTool.description}</p>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-3xl">
            {activeToolId === 'img-to-png' && <ImageToPng />}
            {activeToolId === 'img-compress' && <ImageCompressor />}
            {activeToolId === 'text-case' && <TextCaseConverter />}
            {activeToolId === 'word-counter' && <WordCounter />}
            {activeToolId === 'calculator' && <Calculator />}
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home': return <HomePage onSelectTool={setActiveToolId} />;
      case 'tools': return <HomePage onSelectTool={setActiveToolId} />; // Tools page is essentially the grid
      case 'about': return <AboutPage />;
      default: return <HomePage onSelectTool={setActiveToolId} />;
    }
  };

  // Scroll to top on page/tool change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, activeToolId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={(page) => { setCurrentPage(page); setActiveToolId(null); }} currentPage={currentPage} />
      
      <main className="flex-grow pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeToolId || currentPage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
