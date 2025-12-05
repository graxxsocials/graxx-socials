import { 
  Video, 
  Palette, 
  Layers, 
  Image as ImageIcon, 
  Share2, 
  Lightbulb,
  Monitor,
  PenTool,
  FileText
} from 'lucide-react';
import { ServiceItem } from './types';

export const services: ServiceItem[] = [
  // Core Services
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Cinematic cuts, color grading, and motion graphics that tell your story compellingly.',
    longDescription: 'Our premium video editing service transforms raw footage into captivating masterpieces. We specialize in high-retention editing styles suitable for YouTube, documentaries, and commercial advertisements. By combining pacing, sound design, and visual effects, we ensure your message resonates with your audience.',
    features: [
      '4K Color Grading & Correction',
      'Advanced Motion Graphics',
      'Sound Design & Audio Mixing',
      'Storyboarding & Narrative Flow',
      'Multi-cam Editing',
      'Fast Turnaround Times'
    ],
    icon: Video,
    category: 'core',
    theme: 'blue'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Visual identity creation, marketing assets, and stunning social posts.',
    longDescription: 'Visuals speak louder than words. Our graphic design team crafts distinct visual assets that elevate your brand aesthetic. From marketing materials to digital assets, we ensure every pixel aligns with your brand identity and communication goals.',
    features: [
      'Marketing Collateral Design',
      'Infographics & Data Visualization',
      'Print & Packaging Design',
      'Custom Illustration',
      'UI/UX Elements',
      'Ad Creatives'
    ],
    icon: Palette,
    category: 'core',
    theme: 'purple'
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Complete brand kits including logos, typography, and voice guidelines.',
    longDescription: 'Building a brand is about more than just a logo. We create comprehensive brand identity systems that define who you are. Our strategic approach ensures your brand voice, visuals, and values are consistent across all touchpoints.',
    features: [
      'Logo Design & Variations',
      'Color Palette & Typography Systems',
      'Brand Style Guides',
      'Tone of Voice Guidelines',
      'Business Card & Stationery Design',
      'Brand Strategy Workshops'
    ],
    icon: Layers,
    category: 'core',
    theme: 'cyan'
  },
  {
    id: 'thumbnail-design',
    title: 'Thumbnail Design',
    description: 'High-CTR thumbnails designed to stop the scroll and capture attention.',
    longDescription: 'In the crowded digital space, your thumbnail is your first impression. We design high-contrast, psychology-driven thumbnails proven to increase Click-Through Rates (CTR). We analyze trends and competitor strategies to ensure your content gets the views it deserves.',
    features: [
      'A/B Testing Variations',
      'Psychology-Driven Composition',
      'Custom Photo Manipulation',
      'High-Contrast Typography',
      'Competitor Analysis',
      'Express Delivery'
    ],
    icon: ImageIcon,
    category: 'core',
    theme: 'blue'
  },
  {
    id: 'social-media-content',
    title: 'Social Media Content',
    description: 'Reels, TikToks, and posts tailored for maximum engagement.',
    longDescription: 'Dominate the feed with content designed for the algorithm. Whether it’s short-form video (Reels/TikTok) or carousel posts, we create engaging social media content that drives likes, shares, and follows while maintaining brand consistency.',
    features: [
      'Short-Form Video Editing (Reels/TikTok)',
      'Carousel Post Design',
      'Trend Research & Adaptation',
      'Caption Copywriting',
      'Story Assets',
      'Engagement Strategy'
    ],
    icon: Share2,
    category: 'core',
    theme: 'purple'
  },
  {
    id: 'creative-strategy',
    title: 'Creative Strategy',
    description: 'Data-driven content plans to grow your audience and ROI.',
    longDescription: 'Creativity without strategy is just art. We bridge the gap between aesthetics and business goals. Our creative strategists analyze market data to build content roadmaps that drive tangible growth, lead generation, and brand loyalty.',
    features: [
      'Content Roadmap Development',
      'Audience Persona Analysis',
      'Competitor Benchmarking',
      'Campaign Planning',
      'Performance Analytics Review',
      'Growth Consulting'
    ],
    icon: Lightbulb,
    category: 'core',
    theme: 'cyan'
  },
  // Other Services
  {
    id: 'websites',
    title: 'Websites',
    description: 'Sleek, responsive landing pages and portfolios.',
    longDescription: 'Your website is your digital HQ. We design and build fast, responsive, and visually stunning websites. Focusing on user experience (UX) and conversion rate optimization (CRO), we turn visitors into clients.',
    features: [
      'Responsive Web Design',
      'Landing Page Optimization',
      'CMS Integration',
      'SEO Fundamentals',
      'Interactive Elements',
      'Performance Tuning'
    ],
    icon: Monitor,
    category: 'other',
    theme: 'blue'
  },
  {
    id: 'writing-editing',
    title: 'Writing & Editing',
    description: 'Copywriting for ads, blogs, and scripts.',
    longDescription: 'Words have power. Our professional copywriters craft compelling narratives for your brand. From punchy ad copy to in-depth blog posts and video scripts, we ensure your message is clear, persuasive, and on-brand.',
    features: [
      'Ad Copywriting',
      'Blog & Article Writing',
      'Video Scriptwriting',
      'Website Copy',
      'Email Marketing Sequences',
      'Proofreading & Editing'
    ],
    icon: PenTool,
    category: 'other',
    theme: 'purple'
  },
  {
    id: 'documents-presentations',
    title: 'Docs & Presentations',
    description: 'Pitch decks and whitepapers that close deals.',
    longDescription: 'Make your next meeting a success with professional documents and presentations. We design pitch decks, whitepapers, and reports that communicate complex information clearly and beautifully, helping you secure funding or close sales.',
    features: [
      'Investor Pitch Decks',
      'Sales Presentations',
      'Whitepaper Design',
      'Annual Reports',
      'PDF Lead Magnets',
      'Template Creation'
    ],
    icon: FileText,
    category: 'other',
    theme: 'cyan'
  }
];