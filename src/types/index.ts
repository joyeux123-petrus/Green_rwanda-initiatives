export type Language = 'en' | 'rw';

export interface ImpactStat {
  id?: string;
  value: number;
  display: string;
  label: string;
  icon: string;
  type: 'achieved' | 'ongoing' | 'target';
  note?: string;
  order?: number;
  active?: boolean;
}

export interface SDGGoal {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  status: string;
  statusType: 'completed' | 'ongoing' | 'campaign' | 'future';
  categories: string[];
  focus: string;
  description: string;
  image: string;
  keyFigures: string[];
  location?: string;
  startDate?: string;
  endDate?: string;
  results?: string[];
  targets?: string[];
  galleryIds?: string[];
  sdgGoals?: number[];
  featured?: boolean;
  published?: boolean;
}

export interface ArticleSource {
  title: string;
  sourceName: string;
  url?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string; // Article deck/intro
  excerpt: string;
  content: string; // Markdown / structured text
  coverImage: string;
  coverImageCaption?: string;
  coverImageCredit?: string;
  category: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  authorBio?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
  status?: 'draft' | 'published' | 'archived';
  featured: boolean;
  published: boolean;
  tags: string[];
  keyHighlights?: string[];
  sources?: ArticleSource[];
  articleGallery?: { url: string; caption: string; credit?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  altText: string;
  date?: string;
  programId?: string;
  featured: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  createdAt?: any;
  status: 'new' | 'read' | 'resolved';
}

export interface Partner {
  name: string;
  category: string;
  description: string;
  logoUrl?: string;
  verified: boolean;
}

export interface ResourceDocument {
  id: string;
  title: string;
  category: 'Annual Report' | 'Policy Brief' | 'Research Paper' | 'Field Manual' | 'Factsheet';
  year: string;
  fileSize: string;
  description: string;
  downloadUrl: string;
  publishedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
  twitter?: string;
  category?: 'leadership' | 'management' | 'field';
  department?: string;
  imagePosition?: string;
}
