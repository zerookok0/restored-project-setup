export interface SectionData {
  id: string;
  type: 'hero' | 'about' | 'services' | 'stats' | 'cases' | 'team' | 'partners' | 'contact' | 'faq' | 'footer';
  enabled: boolean;
  content: Record<string, any>;
}

export interface SiteData {
  brand: {
    name: string;
    logo: string;
    tagline: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    background: string;
    badge: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    number: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    image: string;
    features: Array<{ icon: string; title: string; description: string }>;
  };
  services: {
    number: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
      image: string;
      features: string[];
    }>;
  };
  faq: {
    number: string;
    title: string;
    subtitle: string;
    items: Array<{ id: string; question: string; answer: string }>;
  };
  productShowcase: {
    number: string;
    title: string;
    subtitle: string;
    product: {
      name: string;
      tagline: string;
      description: string;
      image: string;
      price: string;
      originalPrice: string;
      features: string[];
      cta: string;
    };
  };
  productList: {
    number: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      price: string;
      originalPrice: string;
      description: string;
      image: string;
      features: string[];
      badge?: string;
    }>;
  };
  footer: {
    description: string;
    links: Array<{ label: string; href: string }>;
    social: Array<{ platform: string; href: string }>;
    copyright: string;
  };
}

export const defaultSiteData: SiteData = {
  brand: {
    name: 'LUMINA',
    logo: '',
    tagline: '超越期待 定义不凡',
  },
  hero: {
    title: '光影之间',
    subtitle: '触感即奢华',
    description: '不喧哗，自有声。每一道弧线、每一次触感，都是对极致的不妥协。',
    cta: {
      primary: '探索旗舰款',
      secondary: '了解更多',
    },
    background: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    badge: '2025 全新系列',
    stats: [
      { value: '100K+', label: '全球用户' },
      { value: '4.9', label: '用户评分' },
      { value: '24/7', label: '专属服务' },
    ],
  },
  about: {
    number: '01',
    title: '偏执于每一个细节',
    subtitle: '这不是产品，这是我们的信仰',
    paragraphs: [
      '每一种材质都经过严苛甄选，每一道工序都倾注极致专注。我们相信，只有当你触摸到它的那一刻，才能真正理解什么是不可妥协的品质。',
      '从最初的一张草图到在你手中的最终形态，我们用了三年。不为别的，只因为你值得。',
    ],
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&dpr=2',
    features: [
      { icon: 'Gem', title: '臻选材质', description: '航空级钛合金与精工陶瓷，经受千次打磨' },
      { icon: 'Zap', title: '自研核心', description: 'L1智能芯片，重新定义流畅的边界' },
      { icon: 'Shield', title: '终身守护', description: '超越行业标准的品质承诺，给你岁月之外的安心' },
    ],
  },
  services: {
    number: '02',
    title: '为你而生的每一款',
    subtitle: '从旗舰到日常，各有各的极致',
    items: [
      {
        id: 's1',
        icon: 'Sparkles',
        title: '旗舰系列',
        description: '凝聚我们所有偏执与想象，为不将就的你',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2',
        features: ['航空级材质', '自研芯片', '私人定制'],
      },
      {
        id: 's2',
        icon: 'Zap',
        title: '性能系列',
        description: '毫不妥协的内在，助你从容面对每一个挑战',
        image: 'https://images.pexels.com/photos/2988635/pexels-photo-2988635.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2',
        features: ['极速响应', '超长续航', '专业配置'],
      },
      {
        id: 's3',
        icon: 'Heart',
        title: '生活系列',
        description: '让科技之美自然融入你的每一天',
        image: 'https://images.pexels.com/photos/3225518/pexels-photo-3225518.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2',
        features: ['轻盈设计', '直觉交互', '多彩选择'],
      },
    ],
  },
  faq: {
    number: '05',
    title: '你或许想知道',
    subtitle: '简单的问题，认真的回答',
    items: [
      { id: 'f1', question: '如何找到最适合我的那一款？', answer: '你可以浏览各系列的特点，根据你的使用场景和偏好来选择。当然，也欢迎联系我们的专属顾问，获得一对一的选购建议。' },
      { id: 'f2', question: '不满意可以退换吗？', answer: '当然。我们提供365天无忧退换。从你收到产品起的一年内，如果你觉得它不适合你，随时可以退换，往返运费由我们承担。' },
      { id: 'f3', question: '可以到线下体验吗？', answer: '我们在全国主要城市都设有体验空间。你可以在线预约，也可以直接前往最近的门店，亲手感受每一款产品。' },
      { id: 'f4', question: '保修政策是怎样的？', answer: '所有产品均享受终身技术支持。旗舰系列3年免费保修，其他系列2年。即使在保修期外，我们依然提供优惠的维修与保养服务。' },
      { id: 'f5', question: '支持个性化定制吗？', answer: '旗舰系列支持深度定制——材质、颜色、刻字，皆可随心选择。联系设计顾问，打造只属于你的那一件。' },
    ],
  },
  productShowcase: {
    number: '03',
    title: '此刻焦点',
    subtitle: '倾注一切，只为这一刻你的目光',
    product: {
      name: 'LUMINA Pro X',
      tagline: '以光影之名，重塑想象',
      description: '128道工序，每一个细节都经得起你的审视。钛合金机身与自研L1芯片的融合，是科技与诗意的交汇。',
      image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
      price: '¥4,999',
      originalPrice: '¥5,999',
      features: ['航空级钛合金', '自研L1芯片', '24h超长续航', '2K超视网膜屏', 'IP68防水', '镭雕刻字'],
      cta: '探索更多细节',
    },
  },
  productList: {
    number: '04',
    title: '更多选择',
    subtitle: '每一款，都有它的独特之处',
    items: [
      {
        id: 'p1',
        name: 'LUMINA Air',
        category: '轻奢系列',
        price: '¥2,999',
        originalPrice: '¥3,499',
        description: '轻盈随身，优雅无处不在。',
        image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        features: ['超轻180g', '快充30分钟', '10色可选'],
        badge: '',
      },
      {
        id: 'p2',
        name: 'LUMINA Max',
        category: '性能系列',
        price: '¥3,999',
        originalPrice: '¥4,599',
        description: '为专业创作者而生。',
        image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        features: ['16核处理器', '32GB内存', '4K HDR'],
        badge: '',
      },
      {
        id: 'p3',
        name: 'LUMINA Mini',
        category: '入门系列',
        price: '¥999',
        originalPrice: '¥1,299',
        description: '小而强大，触手可及。',
        image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        features: ['口袋尺寸', '一键互联', '12h续航'],
        badge: '',
      },
      {
        id: 'p4',
        name: 'LUMINA Fold',
        category: '探索系列',
        price: '¥5,999',
        originalPrice: '¥6,999',
        description: '折叠之间，展开想象。',
        image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        features: ['8"折叠大屏', '多角度悬停', '20万次铰链'],
        badge: '',
      },
    ],
  },
  footer: {
    description: 'LUMINA — 以极致，致敬每一个不妥协的你。',
    links: [
      { label: '品牌故事', href: '#about' },
      { label: '产品系列', href: '#services' },
      { label: '旗舰单品', href: '#product-showcase' },
      { label: '全部产品', href: '#product-list' },
      { label: '常见问题', href: '#faq' },
      { label: '隐私政策', href: '#' },
      { label: '服务条款', href: '#' },
    ],
    social: [
      { platform: '微信', href: '#' },
      { platform: '微博', href: '#' },
      { platform: '小红书', href: '#' },
      { platform: '抖音', href: '#' },
    ],
    copyright: '© 2025 LUMINA. All rights reserved.',
  },
};
