import React, { useState } from 'react';
import { SiteData } from '../../data/default-content';

interface EditPanelProps {
  section: keyof SiteData;
  data: SiteData;
  onUpdate: <K extends keyof SiteData>(section: K, content: Partial<SiteData[K]>) => void;
}

export default function EditPanel({ section, data, onUpdate }: EditPanelProps) {
  const content = data[section] as any;

  const handleChange = (field: string, value: any) => {
    onUpdate(section, { [field]: value });
  };

  const renderField = (label: string, field: string, value: any, type: 'text' | 'textarea' | 'image' | 'array' = 'text', arrayFields?: string[]) => {
    const currentValue = value ?? '';

    if (type === 'textarea') {
      return (
        <div className="mb-5">
          <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">{label}</label>
          <textarea
            value={currentValue}
            onChange={(e) => handleChange(field, e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
          />
        </div>
      );
    }

    if (type === 'image') {
      return (
        <div className="mb-5">
          <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">{label}</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleChange(field, e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
            {currentValue && (
              <img src={currentValue} alt="" className="w-16 h-12 rounded-lg object-cover border border-white/10" />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">{label}</label>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
        />
      </div>
    );
  };

  const renderHeroEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">Hero 区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑第一屏展示内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      {renderField('描述', 'description', content.description, 'textarea')}
      {renderField('背景图片URL', 'background', content.background, 'image')}
      {renderField('徽章文字', 'badge', content.badge)}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">主按钮文字</label>
        <input
          type="text"
          value={content.cta?.primary ?? ''}
          onChange={(e) => {
            const newCta = { ...content.cta, primary: e.target.value };
            handleChange('cta', newCta);
          }}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">次要按钮文字</label>
        <input
          type="text"
          value={content.cta?.secondary ?? ''}
          onChange={(e) => {
            const newCta = { ...content.cta, secondary: e.target.value };
            handleChange('cta', newCta);
          }}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">数据统计</label>
        {(content.stats || []).map((stat: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={stat.value}
              onChange={(e) => {
                const newStats = [...content.stats];
                newStats[i] = { ...newStats[i], value: e.target.value };
                handleChange('stats', newStats);
              }}
              placeholder="数值"
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <input
              type="text"
              value={stat.label}
              onChange={(e) => {
                const newStats = [...content.stats];
                newStats[i] = { ...newStats[i], label: e.target.value };
                handleChange('stats', newStats);
              }}
              placeholder="标签"
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <button
              onClick={() => {
                const newStats = content.stats.filter((_: any, j: number) => j !== i);
                handleChange('stats', newStats);
              }}
              className="text-xs text-red-400 hover:text-red-300 self-start mt-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">关于我们区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑公司介绍内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      {renderField('图片URL', 'image', content.image, 'image')}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">段落内容</label>
        {(content.paragraphs || []).map((p: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <textarea
              value={p}
              onChange={(e) => {
                const newParagraphs = [...content.paragraphs];
                newParagraphs[i] = e.target.value;
                handleChange('paragraphs', newParagraphs);
              }}
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none resize-none"
            />
            <button
              onClick={() => {
                const newParagraphs = content.paragraphs.filter((_: string, j: number) => j !== i);
                handleChange('paragraphs', newParagraphs);
              }}
              className="text-xs text-red-400 hover:text-red-300 self-start mt-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newParagraphs = [...(content.paragraphs || []), '新段落...'];
            handleChange('paragraphs', newParagraphs);
          }}
          className="text-xs text-brand-primary hover:underline mt-1"
        >
          + 添加段落
        </button>
      </div>
    </div>
  );

  const renderServicesEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">产品展示区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑产品/服务展示内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-3 uppercase tracking-wider">产品列表</label>
        {(content.items || []).map((item: any, i: number) => (
          <div key={i} className="mb-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/60">#{i + 1}</span>
              <button
                onClick={() => {
                  const newItems = content.items.filter((_: any, j: number) => j !== i);
                  handleChange('items', newItems);
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                移除
              </button>
            </div>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], title: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="产品名称"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <textarea
              value={item.description}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], description: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="产品描述"
              rows={2}
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none resize-none"
            />
            <input
              type="text"
              value={item.image}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], image: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="图片URL"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newItems = [...(content.items || []), {
              id: `s${Date.now()}`,
              icon: 'Sparkles',
              title: '新产品',
              description: '产品描述',
              image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
              features: ['特性1', '特性2', '特性3'],
            }];
            handleChange('items', newItems);
          }}
          className="text-xs text-brand-primary hover:underline"
        >
          + 添加产品
        </button>
      </div>
    </div>
  );

  const renderBrandEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">品牌信息编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑站点品牌配置</p>
      {renderField('品牌名称', 'name', content.name)}
      {renderField('品牌标语', 'tagline', content.tagline)}
    </div>
  );

  const renderSimpleEditor = (title: string, desc: string) => (
    <div>
      <h3 className="text-lg font-bold mb-1">{title}区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">{desc}</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
    </div>
  );

  const renderFAQEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">常见问题区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑FAQ内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-3 uppercase tracking-wider">问题列表</label>
        {(content.items || []).map((item: any, i: number) => (
          <div key={i} className="mb-3 p-3 rounded-xl border border-white/5 bg-white/[0.01]">
            <input
              type="text"
              value={item.question}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], question: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="问题"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <textarea
              value={item.answer}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], answer: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="答案"
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductShowcaseEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">明星单品区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑旗舰单品展示内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      <h4 className="text-sm font-bold text-white/60 mb-3 mt-6 border-t border-white/5 pt-4">产品信息</h4>
      {renderField('产品名称', 'product.name', content.product?.name)}
      {renderField('产品标语', 'product.tagline', content.product?.tagline)}
      {renderField('产品描述', 'product.description', content.product?.description, 'textarea')}
      {renderField('产品图片URL', 'product.image', content.product?.image, 'image')}
      {renderField('价格', 'product.price', content.product?.price)}
      {renderField('原价', 'product.originalPrice', content.product?.originalPrice)}
      {renderField('按钮文字', 'product.cta', content.product?.cta)}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">产品特性</label>
        {(content.product?.features || []).map((feat: string, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feat}
              onChange={(e) => {
                const newFeatures = [...content.product.features];
                newFeatures[i] = e.target.value;
                handleChange('product', { ...content.product, features: newFeatures });
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <button
              onClick={() => {
                const newFeatures = content.product.features.filter((_: string, j: number) => j !== i);
                handleChange('product', { ...content.product, features: newFeatures });
              }}
              className="text-xs text-red-400 hover:text-red-300 self-start mt-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newFeatures = [...(content.product?.features || []), '新特性'];
            handleChange('product', { ...content.product, features: newFeatures });
          }}
          className="text-xs text-brand-primary hover:underline mt-1"
        >
          + 添加特性
        </button>
      </div>
    </div>
  );

  const renderProductListEditor = () => (
    <div>
      <h3 className="text-lg font-bold mb-1">热销产品区块编辑</h3>
      <p className="text-xs text-white/30 mb-8">编辑产品列表展示内容</p>
      {renderField('标题', 'title', content.title)}
      {renderField('副标题', 'subtitle', content.subtitle)}
      <div className="mb-5">
        <label className="block text-xs text-white/40 mb-3 uppercase tracking-wider">产品列表</label>
        {(content.items || []).map((item: any, i: number) => (
          <div key={i} className="mb-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/60">#{i + 1}</span>
              <button
                onClick={() => {
                  const newItems = content.items.filter((_: any, j: number) => j !== i);
                  handleChange('items', newItems);
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                移除
              </button>
            </div>
            <input
              type="text"
              value={item.name}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], name: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="产品名称"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <input
              type="text"
              value={item.category}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], category: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="分类"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <input
              type="text"
              value={item.price}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], price: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="价格"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <input
              type="text"
              value={item.originalPrice}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], originalPrice: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="原价"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <textarea
              value={item.description}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], description: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="产品描述"
              rows={2}
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none resize-none"
            />
            <input
              type="text"
              value={item.image}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], image: e.target.value };
                handleChange('items', newItems);
              }}
              placeholder="图片URL"
              className="w-full px-3 py-2 mb-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
            <input
              type="text"
              value={item.badge ?? ''}
              onChange={(e) => {
                const newItems = [...content.items];
                newItems[i] = { ...newItems[i], badge: e.target.value || undefined };
                handleChange('items', newItems);
              }}
              placeholder="徽章（可选）"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-brand-primary/50 focus:outline-none"
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newItems = [...(content.items || []), {
              id: `p${Date.now()}`,
              name: '新产品',
              category: '系列',
              price: '¥0',
              originalPrice: '¥0',
              description: '产品描述',
              image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
              features: ['特性1', '特性2'],
            }];
            handleChange('items', newItems);
          }}
          className="text-xs text-brand-primary hover:underline"
        >
          + 添加产品
        </button>
      </div>
    </div>
  );

  const editors: Record<string, React.ReactNode> = {
    hero: renderHeroEditor(),
    about: renderAboutEditor(),
    services: renderServicesEditor(),
    productShowcase: renderProductShowcaseEditor(),
    productList: renderProductListEditor(),
    faq: renderFAQEditor(),
    brand: renderBrandEditor(),
  };

  return (
    <div className="max-w-2xl">
      {editors[section] || (
        <div className="text-white/40">此区块暂不支持在线编辑</div>
      )}
    </div>
  );
}
