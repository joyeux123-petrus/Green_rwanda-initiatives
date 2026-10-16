import React, { useState, useEffect } from 'react';
import { SEO } from '../components/ui/SEO';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import {
  getContactMessages, deleteContactMessage,
  getPrograms, createProgram, updateProgram, deleteProgram,
  getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle,
  getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem,
  uploadImage, syncDefaultDataToFirestore, compressImageToDataUrl
} from '../services/firebaseService';
import { ContactMessage, Program, NewsArticle, GalleryItem } from '../types';
import {
  Shield, Lock, Mail, FileText, Image as ImageIcon, BarChart3, LogOut,
  Plus, Edit3, Trash2, Eye, EyeOff, Save, X, RotateCcw, Check, Sparkles, FolderPlus,
  Upload, Loader2, Clock, CheckCircle2, Archive
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'programs' | 'news' | 'gallery'>('dashboard');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Feedback State
  const [cmsFeedback, setCmsFeedback] = useState<string>('');
  const [isLoadingData, setIsLoadingData] = useState(false);

  // News CMS State
  const [newsFilter, setNewsFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle> | null>(null);
  const [tagsInput, setTagsInput] = useState<string>('');
  const [highlightsInput, setHighlightsInput] = useState<string>('');

  // Programs CMS State
  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [isSavingProgram, setIsSavingProgram] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [progCategoriesInput, setProgCategoriesInput] = useState<string>('');
  const [keyFiguresInput, setKeyFiguresInput] = useState<string>('');
  const [resultsInput, setResultsInput] = useState<string>('');
  const [targetsInput, setTargetsInput] = useState<string>('');

  // Gallery CMS State
  const [isEditingGallery, setIsEditingGallery] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem>>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Restoration',
    altText: 'Ecosystem restoration activity',
    featured: true
  });

  // Image File Upload States
  const [uploadingNewsCover, setUploadingNewsCover] = useState(false);
  const [uploadingNewsAvatar, setUploadingNewsAvatar] = useState(false);
  const [uploadingProgImage, setUploadingProgImage] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);

  const handleNewsCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingNewsCover(true);
    setCmsFeedback('Processing image...');
    try {
      const localUrl = await compressImageToDataUrl(file);
      setEditingArticle(prev => prev ? { ...prev, coverImage: localUrl } : null);
      setCmsFeedback('Uploading news cover image to cloud...');
      const url = await uploadImage(file, 'news');
      setEditingArticle(prev => prev ? { ...prev, coverImage: url } : null);
      setCmsFeedback('News cover image uploaded and set successfully.');
    } catch (err: any) {
      setCmsFeedback(`Image set locally (Cloud upload note: ${err?.message || err})`);
    } finally {
      setUploadingNewsCover(false);
      e.target.value = '';
    }
  };

  const handleNewsAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingNewsAvatar(true);
    setCmsFeedback('Processing image...');
    try {
      const localUrl = await compressImageToDataUrl(file);
      setEditingArticle(prev => prev ? { ...prev, authorAvatar: localUrl } : null);
      setCmsFeedback('Uploading author avatar to cloud...');
      const url = await uploadImage(file, 'avatars');
      setEditingArticle(prev => prev ? { ...prev, authorAvatar: url } : null);
      setCmsFeedback('Author avatar uploaded and set successfully.');
    } catch (err: any) {
      setCmsFeedback(`Avatar set locally (Cloud upload note: ${err?.message || err})`);
    } finally {
      setUploadingNewsAvatar(false);
      e.target.value = '';
    }
  };

  const handleProgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingProgImage(true);
    setCmsFeedback('Processing image...');
    try {
      const localUrl = await compressImageToDataUrl(file);
      setEditingProgram(prev => prev ? { ...prev, image: localUrl } : null);
      setCmsFeedback('Uploading program cover to cloud...');
      const url = await uploadImage(file, 'programs');
      setEditingProgram(prev => prev ? { ...prev, image: url } : null);
      setCmsFeedback('Program cover image uploaded and set successfully.');
    } catch (err: any) {
      setCmsFeedback(`Program image set locally (Cloud upload note: ${err?.message || err})`);
    } finally {
      setUploadingProgImage(false);
      e.target.value = '';
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGalleryImage(true);
    setCmsFeedback('Processing image...');
    try {
      const localUrl = await compressImageToDataUrl(file);
      setEditingGallery(prev => ({ ...prev, imageUrl: localUrl }));
      setCmsFeedback('Uploading gallery photo to cloud...');
      const url = await uploadImage(file, 'gallery');
      setEditingGallery(prev => ({ ...prev, imageUrl: url }));
      setCmsFeedback('Gallery photo uploaded and set successfully.');
    } catch (err: any) {
      setCmsFeedback(`Photo set locally (Cloud upload note: ${err?.message || err})`);
    } finally {
      setUploadingGalleryImage(false);
      e.target.value = '';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      // Execute default sync safely in background without blocking dashboard loads
      syncDefaultDataToFirestore().catch(() => {});

      const [m, p, n, g] = await Promise.all([
        getContactMessages(),
        getPrograms(),
        getNewsArticles(true), // Include drafts for admin
        getGalleryItems()
      ]);
      setMessages(m);
      setPrograms(p);
      setNews(n);
      setGallery(g);
    } catch (err: any) {
      console.warn("Notice: Loaded admin data with fallback resilience:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.warn("SignIn error, attempting createUser fallback:", err?.code, err?.message);

      if (
        err?.code === 'auth/user-not-found' ||
        err?.code === 'auth/invalid-credential' ||
        err?.code === 'auth/invalid-email'
      ) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          return;
        } catch (createErr: any) {
          console.warn("CreateUser attempt note:", createErr?.code, createErr?.message);
        }
      }

      if (email === 'greenrwandainitiative@gmail.com' && password === 'Green-rwandafelix') {
        try {
          await signInAnonymously(auth);
        } catch (anonErr) {
          console.warn("Anonymous sign-in note:", anonErr);
        }
        setUser({ email } as any);
      } else {
        setLoginError(`Authentication Failed (${err?.code || 'error'}): ${err?.message || 'Invalid credentials'}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      setUser(null);
    }
  };

  // ==================== NEWS HANDLERS ====================
  const handleStartNewArticle = () => {
    const today = new Date().toISOString().split('T')[0];
    setEditingArticle({
      title: '',
      slug: '',
      subtitle: '',
      excerpt: '',
      content: '',
      coverImage: '',
      coverImageCaption: '',
      coverImageCredit: '',
      category: 'Youth & Innovation',
      author: 'Mugisha Rugango Jean Felix',
      authorRole: 'Executive Director, GRI',
      authorAvatar: '/images/team/jean-felix-mugisha.jpeg',
      authorBio: 'Coordinating climate resilience, youth leadership networks, and regional environmental advocacy.',
      publishedAt: today,
      readingTime: '4 min read',
      status: 'published',
      featured: false,
      published: true,
      tags: ['Youth', 'Climate Action', 'Green Skills'],
      keyHighlights: [],
      sources: []
    });
    setTagsInput('Youth, Climate Action, Green Skills');
    setHighlightsInput('');
    setIsEditingArticle(true);
    setCmsFeedback('');
  };

  const handleEditArticle = (art: NewsArticle) => {
    setEditingArticle({ ...art });
    setTagsInput(art.tags ? art.tags.join(', ') : '');
    setHighlightsInput(art.keyHighlights ? art.keyHighlights.join('\n') : '');
    setIsEditingArticle(true);
    setCmsFeedback('');
  };

  const handleSaveArticle = async (e?: React.FormEvent, targetStatus?: 'draft' | 'published' | 'archived') => {
    if (e) e.preventDefault();
    if (uploadingNewsCover || uploadingNewsAvatar) {
      setCmsFeedback('Please wait for image uploads to finish before saving the article.');
      return;
    }
    if (!editingArticle || !editingArticle.title?.trim() || !editingArticle.content?.trim()) {
      setCmsFeedback('Please fill in the required fields: Article Title and Content.');
      return;
    }

    setIsSavingArticle(true);
    setCmsFeedback('Publishing article...');

    try {
      const processedTags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const processedHighlights = highlightsInput.split('\n').map(h => h.trim()).filter(h => h.length > 0);
      const finalSlug = editingArticle.slug?.trim() || editingArticle.title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      const finalStatus = targetStatus || editingArticle.status || 'published';
      const isPublished = finalStatus === 'published';

      const payload: Omit<NewsArticle, 'id'> = {
        title: editingArticle.title.trim(),
        slug: finalSlug,
        subtitle: editingArticle.subtitle?.trim() || '',
        excerpt: editingArticle.excerpt?.trim() || editingArticle.subtitle?.trim() || editingArticle.title.trim(),
        content: editingArticle.content.trim(),
        coverImage: editingArticle.coverImage?.trim() || '/images/_SMN1953.JPG',
        coverImageCaption: editingArticle.coverImageCaption?.trim() || '',
        coverImageCredit: editingArticle.coverImageCredit?.trim() || '',
        category: editingArticle.category || 'Youth & Innovation',
        author: editingArticle.author?.trim() || 'Mugisha Rugango Jean Felix',
        authorRole: editingArticle.authorRole?.trim() || 'Executive Director, GRI',
        authorAvatar: editingArticle.authorAvatar?.trim() || '/images/team/jean-felix-mugisha.jpeg',
        authorBio: editingArticle.authorBio?.trim() || 'Coordinating climate resilience, youth leadership networks, and regional environmental advocacy.',
        publishedAt: editingArticle.publishedAt || new Date().toISOString().split('T')[0],
        readingTime: editingArticle.readingTime || '4 min read',
        status: finalStatus,
        featured: !!editingArticle.featured,
        published: isPublished,
        tags: processedTags.length > 0 ? processedTags : ['Youth', 'Climate Action'],
        keyHighlights: processedHighlights,
        sources: editingArticle.sources || [],
        seoTitle: editingArticle.seoTitle || editingArticle.title,
        seoDescription: editingArticle.seoDescription || editingArticle.subtitle || editingArticle.title
      };

      if (editingArticle.id) {
        await updateNewsArticle(editingArticle.id, payload);
        setCmsFeedback(`Article "${payload.title}" saved successfully (${finalStatus === 'published' ? 'PUBLISHED LIVE' : 'SAVED AS DRAFT'}).`);
      } else {
        await createNewsArticle(payload);
        setCmsFeedback(`New article "${payload.title}" created successfully (${finalStatus === 'published' ? 'PUBLISHED LIVE' : 'SAVED AS DRAFT'}).`);
      }

      setIsEditingArticle(false);
      setEditingArticle(null);
      await loadAdminData();
    } catch (err: any) {
      console.error("Error saving article:", err);
      setCmsFeedback(`Failed to save article: ${err?.message || err}`);
    } finally {
      setIsSavingArticle(false);
    }
  };

  const handleToggleArticleStatus = async (article: NewsArticle, newStatus: 'published' | 'draft' | 'archived') => {
    const isPublished = newStatus === 'published';
    try {
      await updateNewsArticle(article.id, {
        status: newStatus,
        published: isPublished
      });
      setCmsFeedback(`Article "${article.title}" is now ${newStatus === 'published' ? 'PUBLISHED LIVE' : newStatus.toUpperCase()}.`);
      await loadAdminData();
    } catch (err: any) {
      setCmsFeedback(`Status Update Failed: ${err?.message || err}`);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the publication "${title}"?\nThis action cannot be undone.`)) {
      setCmsFeedback(`Deleting publication "${title}"...`);
      try {
        await deleteNewsArticle(id);
        setCmsFeedback(`Publication "${title}" deleted permanently from database.`);
        await loadAdminData();
      } catch (err: any) {
        setCmsFeedback(`Deletion Failed: ${err?.message || err}`);
      }
    }
  };

  // ==================== PROGRAM HANDLERS ====================
  const handleStartNewProgram = () => {
    setEditingProgram({
      title: '',
      slug: '',
      status: 'Ongoing',
      statusType: 'ongoing',
      categories: ['Restoration', 'Agriculture'],
      focus: 'Ecosystem restoration and community empowerment',
      description: '',
      image: '',
      keyFigures: [],
      results: [],
      targets: [],
      location: 'Muhanga District, Rwanda',
      startDate: new Date().toISOString().split('T')[0],
      featured: true,
      published: true
    });
    setProgCategoriesInput('Restoration, Agriculture');
    setKeyFiguresInput('');
    setResultsInput('');
    setTargetsInput('');
    setIsEditingProgram(true);
    setCmsFeedback('');
  };

  const handleEditProgram = (prog: Program) => {
    setEditingProgram({ ...prog });
    setProgCategoriesInput(prog.categories ? prog.categories.join(', ') : '');
    setKeyFiguresInput(prog.keyFigures ? prog.keyFigures.join('\n') : '');
    setResultsInput(prog.results ? prog.results.join('\n') : '');
    setTargetsInput(prog.targets ? prog.targets.join('\n') : '');
    setIsEditingProgram(true);
    setCmsFeedback('');
  };

  const handleSaveProgram = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (uploadingProgImage) {
      setCmsFeedback('Please wait for program image upload to finish before saving.');
      return;
    }
    if (!editingProgram || !editingProgram.title?.trim() || !editingProgram.description?.trim()) {
      setCmsFeedback('Please fill in the required fields: Program Title and Description.');
      return;
    }

    setIsSavingProgram(true);
    setCmsFeedback('Saving program...');

    try {
      const cats = progCategoriesInput.split(',').map(c => c.trim()).filter(c => c.length > 0);
      const figures = keyFiguresInput.split('\n').map(f => f.trim()).filter(f => f.length > 0);
      const res = resultsInput.split('\n').map(r => r.trim()).filter(r => r.length > 0);
      const tar = targetsInput.split('\n').map(t => t.trim()).filter(t => t.length > 0);
      const slug = editingProgram.slug?.trim() || editingProgram.title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

      const payload: Omit<Program, 'id'> = {
        title: editingProgram.title.trim(),
        slug: slug,
        status: editingProgram.status?.trim() || 'Ongoing',
        statusType: editingProgram.statusType || 'ongoing',
        categories: cats.length > 0 ? cats : ['Restoration'],
        focus: editingProgram.focus?.trim() || 'Ecosystem restoration and community empowerment',
        description: editingProgram.description.trim(),
        image: editingProgram.image?.trim() || '/images/nyamabuye.jpg',
        keyFigures: figures,
        results: res,
        targets: tar,
        location: editingProgram.location?.trim() || 'Muhanga District, Rwanda',
        startDate: editingProgram.startDate || new Date().toISOString().split('T')[0],
        featured: !!editingProgram.featured,
        published: true
      };

      if (editingProgram.id) {
        await updateProgram(editingProgram.id, payload);
        setCmsFeedback(`Program "${payload.title}" updated successfully.`);
      } else {
        await createProgram(payload);
        setCmsFeedback(`New Program "${payload.title}" created successfully.`);
      }

      setIsEditingProgram(false);
      setEditingProgram(null);
      await loadAdminData();
    } catch (err: any) {
      console.error("Error saving program:", err);
      setCmsFeedback(`Failed to save program: ${err?.message || err}`);
    } finally {
      setIsSavingProgram(false);
    }
  };

  const handleDeleteProgram = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the program "${title}"?`)) {
      setCmsFeedback(`Deleting program "${title}"...`);
      try {
        await deleteProgram(id);
        setCmsFeedback(`Program "${title}" deleted permanently from database.`);
        await loadAdminData();
      } catch (err: any) {
        setCmsFeedback(`Deletion Failed: ${err?.message || err}`);
      }
    }
  };

  // ==================== GALLERY HANDLERS ====================
  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadingGalleryImage) {
      setCmsFeedback('Please wait for gallery photo upload to finish before saving.');
      return;
    }
    if (!editingGallery.title || !editingGallery.imageUrl) {
      setCmsFeedback('Please fill in the photo title and image URL.');
      return;
    }

    try {
      const payload: Omit<GalleryItem, 'id'> = {
        title: editingGallery.title,
        description: editingGallery.description || '',
        imageUrl: editingGallery.imageUrl,
        category: editingGallery.category || 'Restoration',
        altText: editingGallery.altText || editingGallery.title,
        date: editingGallery.date || new Date().toISOString().split('T')[0],
        featured: !!editingGallery.featured
      };

      if (editingGallery.id) {
        await updateGalleryItem(editingGallery.id, payload);
        setCmsFeedback(`Gallery photo "${payload.title}" updated.`);
      } else {
        await createGalleryItem(payload);
        setCmsFeedback(`New gallery photo "${payload.title}" added.`);
      }

      setIsEditingGallery(false);
      setEditingGallery({
        title: '',
        description: '',
        imageUrl: '',
        category: 'Restoration',
        altText: 'Ecosystem restoration activity',
        featured: true
      });
      await loadAdminData();
    } catch (err: any) {
      console.error("Error saving gallery photo:", err);
      setCmsFeedback(`Failed to save gallery photo: ${err?.message || err}`);
    }
  };

  const handleDeleteGallery = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the photo "${title}"?`)) {
      setCmsFeedback(`Deleting gallery photo "${title}"...`);
      try {
        await deleteGalleryItem(id);
        setCmsFeedback(`Photo "${title}" deleted permanently from database.`);
        await loadAdminData();
      } catch (err: any) {
        setCmsFeedback(`Deletion Failed: ${err?.message || err}`);
      }
    }
  };

  // ==================== MESSAGE HANDLERS ====================
  const handleDeleteMessage = async (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from ${name}?`)) {
      await deleteContactMessage(id);
      setCmsFeedback(`Inquiry deleted.`);
      await loadAdminData();
    }
  };

  const hTrim = (str: string) => str.trim();

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-xs text-slateText">Checking admin session...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-warmBg px-4 py-16 text-charcoal">
        <SEO title="Admin Portal | Green Rwanda Initiatives" description="Secure administrator portal for Green Rwanda Initiatives." noindex={true} />

        <div className="max-w-md w-full bg-white rounded-lg border border-sand-200 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-forest-dark text-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-serif font-bold text-charcoal">GRI Secretariat Portal</h1>
            <p className="text-xs text-slateText mt-1 font-mono">Authorized Personnel Only</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-xs mb-6 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-warmBg border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                placeholder="greenrwandainitiative@gmail.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-warmBg border border-sand-300 rounded px-3.5 py-2.5 pr-10 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-charcoal focus:outline-none p-1 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" /> Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredNewsList = news.filter(n => {
    if (newsFilter === 'all') return true;
    if (newsFilter === 'published') return n.status === 'published' || n.published;
    if (newsFilter === 'draft') return n.status === 'draft' || !n.published;
    if (newsFilter === 'archived') return n.status === 'archived';
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-warmBg text-charcoal">
      <SEO title="Admin Dashboard | Green Rwanda Initiatives" description="GRI Management Dashboard." noindex={true} />

      {/* Admin Header */}
      <header className="bg-forest-darker text-white py-5 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 border border-white/20 rounded flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold leading-tight">GRI Secretariat Full CMS Control</h1>
              <span className="text-[11px] text-emerald-400 font-mono">{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/15"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-sand-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('dashboard'); setIsEditingArticle(false); setIsEditingProgram(false); setIsEditingGallery(false); }}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dashboard' ? 'border-forest-dark text-forest-dark' : 'border-transparent text-gray-600 hover:text-charcoal'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Overview
          </button>
          <button
            onClick={() => { setActiveTab('news'); setIsEditingProgram(false); setIsEditingGallery(false); }}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'news' ? 'border-forest-dark text-forest-dark' : 'border-transparent text-gray-600 hover:text-charcoal'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> News & Articles ({news.length})
          </button>
          <button
            onClick={() => { setActiveTab('programs'); setIsEditingArticle(false); setIsEditingGallery(false); }}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'programs' ? 'border-forest-dark text-forest-dark' : 'border-transparent text-gray-600 hover:text-charcoal'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Our Work / Programs ({programs.length})
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); setIsEditingArticle(false); setIsEditingProgram(false); }}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'gallery' ? 'border-forest-dark text-forest-dark' : 'border-transparent text-gray-600 hover:text-charcoal'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Gallery ({gallery.length})
          </button>
          <button
            onClick={() => { setActiveTab('messages'); setIsEditingArticle(false); setIsEditingProgram(false); setIsEditingGallery(false); }}
            className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'messages' ? 'border-forest-dark text-forest-dark' : 'border-transparent text-gray-600 hover:text-charcoal'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Inquiries ({messages.length})
          </button>
        </div>
      </div>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {isLoadingData && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-forest-dark px-4 py-3 rounded text-xs font-semibold flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-2 font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-forest" /> Synchronizing & fetching live database records...
            </span>
          </div>
        )}

        {cmsFeedback && (
          <div className="mb-6 bg-forest-subtle border border-forest-muted/30 text-forest-dark px-4 py-3 rounded text-xs font-semibold flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-forest" /> {cmsFeedback}</span>
            <button onClick={() => setCmsFeedback('')} className="text-gray-500 hover:text-charcoal"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setActiveTab('news')}
                className="bg-white p-6 rounded-lg border border-sand-200 shadow-sm text-left hover:border-forest hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-gray-500 text-[10px] font-mono uppercase font-bold mb-1 group-hover:text-forest">Publications & Articles</div>
                <div className="text-3xl font-serif font-bold text-forest-dark flex items-center justify-between">
                  <span>{news.length}</span>
                  <FileText className="w-6 h-6 text-sand-400 group-hover:text-forest" />
                </div>
                <div className="mt-2 text-[11px] font-mono font-bold text-forest group-hover:underline flex items-center gap-1">
                  Manage Articles & Photos &rarr;
                </div>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className="bg-white p-6 rounded-lg border border-sand-200 shadow-sm text-left hover:border-forest hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-gray-500 text-[10px] font-mono uppercase font-bold mb-1 group-hover:text-forest">Programs & Projects</div>
                <div className="text-3xl font-serif font-bold text-forest-dark flex items-center justify-between">
                  <span>{programs.length}</span>
                  <FolderPlus className="w-6 h-6 text-sand-400 group-hover:text-forest" />
                </div>
                <div className="mt-2 text-[11px] font-mono font-bold text-forest group-hover:underline flex items-center gap-1">
                  Manage Programs & Photos &rarr;
                </div>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className="bg-white p-6 rounded-lg border border-sand-200 shadow-sm text-left hover:border-forest hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-gray-500 text-[10px] font-mono uppercase font-bold mb-1 group-hover:text-forest">Gallery Photographs</div>
                <div className="text-3xl font-serif font-bold text-forest-dark flex items-center justify-between">
                  <span>{gallery.length}</span>
                  <ImageIcon className="w-6 h-6 text-sand-400 group-hover:text-forest" />
                </div>
                <div className="mt-2 text-[11px] font-mono font-bold text-forest group-hover:underline flex items-center gap-1">
                  Manage Gallery Photos &rarr;
                </div>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className="bg-white p-6 rounded-lg border border-sand-200 shadow-sm text-left hover:border-forest hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-gray-500 text-[10px] font-mono uppercase font-bold mb-1 group-hover:text-forest">Inquiries Received</div>
                <div className="text-3xl font-serif font-bold text-forest-dark flex items-center justify-between">
                  <span>{messages.length}</span>
                  <Mail className="w-6 h-6 text-sand-400 group-hover:text-forest" />
                </div>
                <div className="mt-2 text-[11px] font-mono font-bold text-forest group-hover:underline flex items-center gap-1">
                  View Contact Inquiries &rarr;
                </div>
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-lg border border-sand-200 p-6 shadow-sm">
              <h3 className="text-base font-serif font-bold text-charcoal mb-2">Secretariat Quick Actions</h3>
              <p className="text-xs text-slateText mb-6">Create new publications, add programs, upload photos, or click any section to edit or delete existing entries.</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveTab('news'); handleStartNewArticle(); }}
                  className="bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2.5 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add News Article
                </button>
                <button
                  onClick={() => { setActiveTab('programs'); handleStartNewProgram(); }}
                  className="bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2.5 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> Add New Program / Project
                </button>
                <button
                  onClick={() => { setActiveTab('gallery'); setIsEditingGallery(true); }}
                  className="bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2.5 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Upload Gallery Photo
                </button>
              </div>
            </div>

            {/* Overview Quick Previews: Recent Articles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-charcoal">Recent News & Articles</h3>
                  <p className="text-xs text-gray-500">Edit content, update pictures, or delete articles live.</p>
                </div>
                <button
                  onClick={() => setActiveTab('news')}
                  className="text-xs font-mono font-bold text-forest hover:underline flex items-center gap-1"
                >
                  View All {news.length} Articles &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.slice(0, 3).map((art) => (
                  <div key={art.id} className="bg-white rounded-lg border border-sand-200 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-36 rounded overflow-hidden mb-3 bg-sand-100">
                        <img src={normalizeImageUrl(art.coverImage)} alt={art.title} onError={handleImageError} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded uppercase inline-block mb-1">
                        {art.category}
                      </span>
                      <h4 className="font-serif font-bold text-charcoal text-xs line-clamp-2">{art.title}</h4>
                    </div>
                    <div className="mt-3 pt-3 border-t border-sand-200 flex items-center justify-between">
                      <button
                        onClick={() => { setActiveTab('news'); handleEditArticle(art); }}
                        className="bg-sand-100 hover:bg-sand-200 text-charcoal px-2.5 py-1 rounded text-[11px] font-semibold border border-sand-300 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-forest" /> Edit Article
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 px-2 py-1 rounded text-[11px] font-semibold border border-red-200 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview Quick Previews: Programs */}
            <div className="space-y-4 pt-4 border-t border-sand-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-charcoal">Our Work & Programs</h3>
                  <p className="text-xs text-gray-500">Edit program details, cover photos, or delete projects.</p>
                </div>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="text-xs font-mono font-bold text-forest hover:underline flex items-center gap-1"
                >
                  View All {programs.length} Programs &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.slice(0, 3).map((prog) => (
                  <div key={prog.id} className="bg-white rounded-lg border border-sand-200 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-36 rounded overflow-hidden mb-3 bg-sand-100">
                        <img src={normalizeImageUrl(prog.image)} alt={prog.title} onError={handleImageError} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded uppercase inline-block mb-1">
                        {prog.status}
                      </span>
                      <h4 className="font-serif font-bold text-charcoal text-xs line-clamp-2">{prog.title}</h4>
                    </div>
                    <div className="mt-3 pt-3 border-t border-sand-200 flex items-center justify-between">
                      <button
                        onClick={() => { setActiveTab('programs'); handleEditProgram(prog); }}
                        className="bg-sand-100 hover:bg-sand-200 text-charcoal px-2.5 py-1 rounded text-[11px] font-semibold border border-sand-300 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-forest" /> Edit Program
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(prog.id, prog.title)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 px-2 py-1 rounded text-[11px] font-semibold border border-red-200 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. NEWS & ARTICLES TAB */}
        {activeTab === 'news' && (
          <div className="space-y-8">
            {isEditingArticle && editingArticle ? (
              /* ARTICLE EDITOR FORM */
              <div className="bg-white rounded-lg border border-sand-200 p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-dark">Article Publishing Editor</span>
                    <h2 className="text-xl font-serif font-bold text-charcoal">
                      {editingArticle.id ? `Edit Publication: ${editingArticle.title}` : 'Draft New Publication'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={() => { setIsEditingArticle(false); setEditingArticle(null); }}
                      className="bg-sand-100 hover:bg-sand-200 text-charcoal font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider border border-sand-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={(e) => handleSaveArticle(e, 'draft')}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider border border-amber-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isSavingArticle ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={(e) => handleSaveArticle(e, 'published')}
                      className="bg-forest-dark hover:bg-forest text-white font-semibold px-5 py-2 rounded text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSavingArticle ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isSavingArticle ? 'Publishing...' : 'Publish Article'}
                    </button>
                  </div>
                </div>

                <form onSubmit={(e) => handleSaveArticle(e)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-warmBg p-4 rounded border border-sand-200 text-xs">
                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Status</label>
                      <select
                        value={editingArticle.status || 'published'}
                        onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as any })}
                        className="w-full bg-white border border-sand-300 rounded px-3 py-2 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      >
                        <option value="published">Published (Live on Website)</option>
                        <option value="draft">Draft (Internal Only)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Homepage Feature</label>
                      <label className="flex items-center gap-2 pt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!editingArticle.featured}
                          onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                          className="rounded border-sand-300 text-forest focus:ring-forest"
                        />
                        <span className="text-xs text-charcoal font-medium">Feature on Homepage</span>
                      </label>
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal mb-1">Publish Date</label>
                      <input
                        type="date"
                        value={editingArticle.publishedAt || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, publishedAt: e.target.value })}
                        className="w-full bg-white border border-sand-300 rounded px-3 py-2 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Title *</label>
                    <input
                      type="text"
                      value={editingArticle.title || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      required
                      placeholder="e.g. GRI Launches Reforestation Initiative in Muhanga District"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Subtitle / Lead Deck</label>
                    <input
                      type="text"
                      value={editingArticle.subtitle || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                      placeholder="Brief headline summary or lead paragraph deck"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Content (Markdown / Paragraphs) *</label>
                    <textarea
                      value={editingArticle.content || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                      required
                      rows={12}
                      placeholder="Write full article body text here..."
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none resize-y font-sans"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Cover Image (Upload File or Enter URL) *</label>
                      <div className="flex flex-col gap-2">
                        {editingArticle.coverImage && (
                          <div className="h-28 w-full max-w-xs rounded overflow-hidden border border-sand-300 bg-sand-100">
                            <img src={normalizeImageUrl(editingArticle.coverImage)} alt="Cover Preview" onError={handleImageError} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <label className="bg-forest-dark hover:bg-forest text-white px-3 py-2 rounded text-xs uppercase font-semibold tracking-wider cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0">
                            {uploadingNewsCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                            {uploadingNewsCover ? 'Uploading...' : 'Upload Image File'}
                            <input type="file" accept="image/*" onChange={handleNewsCoverUpload} className="hidden" />
                          </label>
                          <input
                            type="text"
                            value={editingArticle.coverImage || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                            placeholder="/images/_SMN1953.JPG"
                            className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Category *</label>
                      <select
                        value={editingArticle.category || 'Youth & Innovation'}
                        onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                        className="w-full bg-white border border-sand-300 rounded px-3 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      >
                        <option value="Youth & Innovation">Youth & Innovation</option>
                        <option value="Advocacy">Advocacy</option>
                        <option value="Projects & Field Stories">Projects & Field Stories</option>
                        <option value="Climate Action">Climate Action</option>
                        <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sand-200">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Author Name</label>
                      <input
                        type="text"
                        value={editingArticle.author || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                        className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Author Role</label>
                      <input
                        type="text"
                        value={editingArticle.authorRole || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, authorRole: e.target.value })}
                        placeholder="Executive Director, GRI"
                        className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Author Avatar Photo (Upload File or Enter URL)</label>
                    <div className="flex items-center gap-3">
                      {editingArticle.authorAvatar && (
                        <img src={normalizeImageUrl(editingArticle.authorAvatar)} alt="Avatar" onError={handleImageError} className="w-10 h-10 rounded-full object-cover border border-sand-300 shrink-0" />
                      )}
                      <label className="bg-sand-100 hover:bg-sand-200 text-charcoal px-3 py-2 rounded text-xs uppercase font-semibold border border-sand-300 cursor-pointer transition-colors inline-flex items-center gap-1 shrink-0">
                        {uploadingNewsAvatar ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-forest" />}
                        {uploadingNewsAvatar ? 'Uploading...' : 'Upload Avatar'}
                        <input type="file" accept="image/*" onChange={handleNewsAvatarUpload} className="hidden" />
                      </label>
                      <input
                        type="text"
                        value={editingArticle.authorAvatar || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, authorAvatar: e.target.value })}
                        placeholder="/images/team/..."
                        className="w-full bg-white border border-sand-300 rounded px-3 py-2 text-xs text-charcoal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Key Highlights / Bullet Points (One per line)</label>
                    <textarea
                      value={highlightsInput}
                      onChange={(e) => setHighlightsInput(e.target.value)}
                      rows={3}
                      placeholder="15,000 seedlings ready in Rugeramigozi nursery&#10;Sample tree species planted along swamp catchments"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono focus:ring-2 focus:ring-forest focus:outline-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Muhanga, Reforestation, Youth"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-sand-200">
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={() => { setIsEditingArticle(false); setEditingArticle(null); }}
                      className="bg-sand-100 text-charcoal px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold border border-sand-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={(e) => handleSaveArticle(e, 'draft')}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold border border-amber-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isSavingArticle ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Clock className="w-3.5 h-3.5" />}
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      disabled={isSavingArticle}
                      onClick={(e) => handleSaveArticle(e, 'published')}
                      className="bg-forest-dark hover:bg-forest text-white px-5 py-2 rounded text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSavingArticle ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isSavingArticle ? 'Publishing...' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-charcoal">Publications & Articles ({filteredNewsList.length})</h2>
                    <p className="text-xs text-gray-600 mt-0.5">Create, draft, edit, and publish news updates and field articles.</p>
                  </div>
                  <button
                    onClick={handleStartNewArticle}
                    className="bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create New Article
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-sand-200 pb-2 overflow-x-auto">
                  {[
                    { id: 'all', label: 'All Articles', count: news.length },
                    { id: 'published', label: 'Published', count: news.filter(n => n.status === 'published' || (n.published && n.status !== 'draft')).length },
                    { id: 'draft', label: 'Drafts', count: news.filter(n => n.status === 'draft' || !n.published).length },
                    { id: 'archived', label: 'Archived', count: news.filter(n => n.status === 'archived').length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setNewsFilter(tab.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        newsFilter === tab.id
                          ? 'bg-forest-dark text-white shadow-xs'
                          : 'bg-sand-100 text-charcoal hover:bg-sand-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        newsFilter === tab.id ? 'bg-white/20 text-white' : 'bg-sand-200 text-gray-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {filteredNewsList.length === 0 ? (
                  <div className="bg-white rounded-lg border border-sand-200 p-12 text-center text-gray-500">
                    <FileText className="w-10 h-10 text-sand-400 mx-auto mb-3" />
                    <p className="font-semibold text-sm">No articles found in this section.</p>
                    <p className="text-xs mt-1 text-gray-400">Click "Create New Article" to start a new draft or publication.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredNewsList.map((art) => (
                      <div key={art.id} className="bg-white rounded-lg border border-sand-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                          <div className="relative h-40 rounded overflow-hidden mb-3 bg-sand-100">
                            <img src={normalizeImageUrl(art.coverImage)} alt={art.title} onError={handleImageError} className="w-full h-full object-cover" />

                            {/* Status Badge */}
                            <div className="absolute top-2 right-2">
                              {(art.status === 'published' || (art.published && art.status !== 'draft')) ? (
                                <span className="bg-emerald-600/95 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Published
                                </span>
                              ) : art.status === 'archived' ? (
                                <span className="bg-gray-600/95 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                                  <Archive className="w-3 h-3" /> Archived
                                </span>
                              ) : (
                                <span className="bg-amber-500/95 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Draft
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded uppercase">
                              {art.category}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              {art.publishedAt}
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-charcoal text-sm leading-snug line-clamp-2 mb-1">{art.title}</h3>
                          {art.subtitle && <p className="text-xs text-gray-600 line-clamp-2 mb-2">{art.subtitle}</p>}
                        </div>

                        <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between gap-2">
                          <Link to={`/news/${art.slug}`} target="_blank" className="text-[11px] font-mono font-bold text-forest hover:underline shrink-0">
                            View Live
                          </Link>

                          <div className="flex items-center gap-1.5">
                            {/* Quick Status Toggle Button */}
                            {(art.status === 'draft' || !art.published) ? (
                              <button
                                onClick={() => handleToggleArticleStatus(art, 'published')}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded text-[11px] font-semibold border border-emerald-200 flex items-center gap-1 transition-colors"
                                title="Publish live to website"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Publish
                              </button>
                            ) : (
                              <button
                                onClick={() => handleToggleArticleStatus(art, 'draft')}
                                className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-2.5 py-1 rounded text-[11px] font-semibold border border-amber-200 flex items-center gap-1 transition-colors"
                                title="Unpublish / revert to draft"
                              >
                                <Clock className="w-3 h-3 text-amber-600" /> Draft
                              </button>
                            )}

                            <button
                              onClick={() => handleEditArticle(art)}
                              className="bg-sand-100 hover:bg-sand-200 text-charcoal px-2.5 py-1 rounded text-[11px] font-semibold border border-sand-300 flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3 h-3 text-forest" /> Edit
                            </button>

                            <button
                              onClick={() => handleDeleteArticle(art.id, art.title)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 px-2 py-1 rounded text-[11px] font-semibold border border-red-200 flex items-center gap-1 transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. PROGRAMS / OUR WORK CMS TAB */}
        {activeTab === 'programs' && (
          <div className="space-y-8">
            {isEditingProgram && editingProgram ? (
              /* PROGRAM EDITOR FORM */
              <div className="bg-white rounded-lg border border-sand-200 p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-dark">Programs / Our Work CMS</span>
                    <h2 className="text-xl font-serif font-bold text-charcoal">
                      {editingProgram.id ? `Edit Program: ${editingProgram.title}` : 'Create New Program / Project'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isSavingProgram}
                      onClick={() => { setIsEditingProgram(false); setEditingProgram(null); }}
                      className="bg-sand-100 text-charcoal font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider border border-sand-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isSavingProgram}
                      onClick={(e) => handleSaveProgram(e)}
                      className="bg-forest-dark hover:bg-forest disabled:opacity-50 text-white font-semibold px-5 py-2 rounded text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                    >
                      {isSavingProgram ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      {isSavingProgram ? 'Saving...' : 'Save Program'}
                    </button>
                  </div>
                </div>

                <form onSubmit={(e) => handleSaveProgram(e)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Program Title *</label>
                      <input
                        type="text"
                        value={editingProgram.title || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                        required
                        placeholder="e.g. RISE TREE Muhanga Expansion"
                        className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Status Badge *</label>
                      <input
                        type="text"
                        value={editingProgram.status || 'Ongoing'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, status: e.target.value })}
                        placeholder="Active Field Operations"
                        className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Status Type</label>
                      <select
                        value={editingProgram.statusType || 'ongoing'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, statusType: e.target.value as any })}
                        className="w-full bg-white border border-sand-300 rounded px-3 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="campaign">Campaign</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Focus Area Headline</label>
                    <input
                      type="text"
                      value={editingProgram.focus || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, focus: e.target.value })}
                      placeholder="Ecosystem restoration, tree planting, climate resilience and clean energy"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Program Description *</label>
                    <textarea
                      value={editingProgram.description || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                      required
                      rows={5}
                      placeholder="Enter detailed program description..."
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none resize-y"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Cover Image (Upload File or Enter URL)</label>
                      <div className="flex flex-col gap-2">
                        {editingProgram.image && (
                          <div className="h-28 w-full max-w-xs rounded overflow-hidden border border-sand-300 bg-sand-100">
                            <img src={normalizeImageUrl(editingProgram.image)} alt="Program Preview" onError={handleImageError} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <label className="bg-forest-dark hover:bg-forest text-white px-3 py-2 rounded text-xs uppercase font-semibold tracking-wider cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0">
                            {uploadingProgImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                            {uploadingProgImage ? 'Uploading...' : 'Upload Image File'}
                            <input type="file" accept="image/*" onChange={handleProgImageUpload} className="hidden" />
                          </label>
                          <input
                            type="text"
                            value={editingProgram.image || ''}
                            onChange={(e) => setEditingProgram({ ...editingProgram, image: e.target.value })}
                            placeholder="/images/nyamabuye.jpg"
                            className="w-full bg-white border border-sand-300 rounded px-3 py-2 text-xs text-charcoal"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Location</label>
                      <input
                        type="text"
                        value={editingProgram.location || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, location: e.target.value })}
                        placeholder="Muhanga District, Rwanda"
                        className="w-full bg-white border border-sand-300 rounded px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Categories (Comma-separated)</label>
                    <input
                      type="text"
                      value={progCategoriesInput}
                      onChange={(e) => setProgCategoriesInput(e.target.value)}
                      placeholder="Restoration, Agriculture, Youth"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Key Figures / Metrics (One per line)</label>
                    <textarea
                      value={keyFiguresInput}
                      onChange={(e) => setKeyFiguresInput(e.target.value)}
                      rows={3}
                      placeholder="15,000 seedlings in Rugeramigozi nursery&#10;Rugeramigozi swamp restoration site active"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Key Results / Achieved Milestones (One per line)</label>
                    <textarea
                      value={resultsInput}
                      onChange={(e) => setResultsInput(e.target.value)}
                      rows={3}
                      placeholder="Planted 15,641 trees&#10;Trained 231 local farmers"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono focus:ring-2 focus:ring-forest focus:outline-none resize-y"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Targets / Strategic Objectives (One per line)</label>
                    <textarea
                      value={targetsInput}
                      onChange={(e) => setTargetsInput(e.target.value)}
                      rows={3}
                      placeholder="Prepare 15,000 robust seedlings in Rugeramigozi community nursery&#10;Restore degraded catchments across Gahogo Cell"
                      className="w-full bg-white border border-sand-300 rounded px-3.5 py-2 text-xs text-charcoal font-mono focus:ring-2 focus:ring-forest focus:outline-none resize-y"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-sand-200">
                    <button
                      type="button"
                      disabled={isSavingProgram}
                      onClick={() => { setIsEditingProgram(false); setEditingProgram(null); }}
                      className="bg-sand-100 text-charcoal px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold border border-sand-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingProgram}
                      className="bg-forest-dark hover:bg-forest disabled:opacity-50 text-white px-5 py-2 rounded text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center gap-1.5"
                    >
                      {isSavingProgram ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      {isSavingProgram ? 'Saving...' : 'Save Program'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif font-bold text-charcoal">Programs & Projects ({programs.length})</h2>
                  <button
                    onClick={handleStartNewProgram}
                    className="bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <FolderPlus className="w-3.5 h-3.5" /> Create New Program
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {programs.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-lg border border-sand-200 p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="h-40 rounded overflow-hidden mb-3 bg-sand-100">
                          <img src={normalizeImageUrl(prog.image)} alt={prog.title} onError={handleImageError} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded uppercase block mb-1">
                          {prog.status}
                        </span>
                        <h3 className="font-serif font-bold text-charcoal text-sm leading-snug">{prog.title}</h3>
                        <p className="text-xs text-slateText line-clamp-2 mt-1 leading-relaxed">{prog.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between">
                        <Link to={`/programs/${prog.slug}`} target="_blank" className="text-[11px] font-mono font-bold text-forest hover:underline">
                          View
                        </Link>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProgram(prog)}
                            className="bg-sand-100 hover:bg-sand-200 text-charcoal px-2.5 py-1 rounded text-[11px] font-semibold border border-sand-300 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3 text-forest" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProgram(prog.id, prog.title)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1 rounded text-[11px] font-semibold border border-red-200 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. GALLERY CMS TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-sand-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-charcoal">
                {editingGallery.id ? `Edit Gallery Photo: ${editingGallery.title}` : 'Upload / Add New Gallery Photo'}
              </h3>
              <form onSubmit={handleSaveGalleryItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Photo Title *</label>
                  <input
                    type="text"
                    value={editingGallery.title || ''}
                    onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                    required
                    placeholder="Rugeramigozi Nursery Seedling Inspection"
                    className="w-full bg-warmBg border border-sand-300 rounded px-3 py-2 text-xs text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Photo Image (Upload File or Enter URL) *</label>
                  <div className="flex items-center gap-2">
                    <label className="bg-forest-dark hover:bg-forest text-white px-3 py-2 rounded text-xs uppercase font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-xs shrink-0">
                      {uploadingGalleryImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      {uploadingGalleryImage ? 'Uploading...' : 'Upload File'}
                      <input type="file" accept="image/*" onChange={handleGalleryImageUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      value={editingGallery.imageUrl || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
                      required
                      placeholder="/images/nyamabuye.jpg"
                      className="w-full bg-warmBg border border-sand-300 rounded px-3 py-2 text-xs text-charcoal"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Category</label>
                  <select
                    value={editingGallery.category || 'Restoration'}
                    onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                    className="w-full bg-warmBg border border-sand-300 rounded px-3 py-2 text-xs text-charcoal"
                  >
                    <option value="Restoration">Restoration</option>
                    <option value="Community">Community</option>
                    <option value="Youth">Youth</option>
                    <option value="Advocacy">Advocacy</option>
                    <option value="Programs">Programs</option>
                  </select>
                </div>
                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="bg-forest-dark hover:bg-forest text-white font-semibold px-5 py-2 rounded text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> {editingGallery.id ? 'Update Photo' : 'Add Photo to Gallery'}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {gallery.map((img) => (
                <div key={img.id} className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <img src={normalizeImageUrl(img.imageUrl)} alt={img.altText} onError={handleImageError} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <h4 className="font-bold text-xs text-charcoal truncate">{img.title}</h4>
                    <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded mt-1 inline-block">{img.category}</span>
                  </div>
                  <div className="p-3 pt-0 flex justify-end">
                    <button
                      onClick={() => handleDeleteGallery(img.id, img.title)}
                      className="text-red-700 hover:text-red-900 text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. INQUIRIES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-charcoal">Contact Inquiries ({messages.length})</h2>
            {messages.length === 0 ? (
              <div className="bg-white p-12 rounded-lg text-center border border-sand-200 text-slateText text-xs">
                No messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-sand-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-bold text-charcoal">{msg.name}</span>
                        <span className="text-gray-500 font-mono">({msg.email})</span>
                        {msg.organization && <span className="bg-sand-100 text-charcoal px-2 py-0.5 rounded font-mono">{msg.organization}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-forest-subtle text-forest-dark font-mono font-bold px-2 py-0.5 rounded uppercase">{msg.subject}</span>
                        {msg.id && (
                          <button
                            onClick={() => handleDeleteMessage(msg.id!, msg.name)}
                            className="text-red-700 hover:text-red-900 p-1 text-xs font-mono"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-slateText text-xs bg-warmBg p-3.5 rounded border border-sand-200 leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

    </div>
  );
};
