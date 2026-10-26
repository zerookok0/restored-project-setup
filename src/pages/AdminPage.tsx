import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Undo2, Sun, Moon, Settings, Image, Type } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { useTheme } from '../context/ThemeContext';
import { SiteData } from '../data/default-content';
import EditPanel from '../components/admin/EditPanel';

export default function AdminPage() {
  const { data, updateData, resetData } = useSiteData();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [editingSection, setEditingSection] = useState<keyof SiteData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleUpdateSection = <K extends keyof SiteData>(
    section: K,
    newContent: Partial<SiteData[K]>
  ) => {
    const newData = { ...data };
    (newData as any)[section] = { ...newData[section], ...newContent };
    updateData(newData);
    setHasChanges(true);
  };

  const handleSave = () => {
    updateData(data);
    setHasChanges(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleReset = () => {
    if (confirm('确定要恢复默认内容吗？所有修改将丢失。')) {
      resetData();
      setHasChanges(false);
    }
  };

  const sections: Array<{ key: keyof SiteData; label: string; icon: React.ReactNode }> = [
    { key: 'hero', label: '英雄区 Hero', icon: <Image size={16} /> },
    { key: 'about', label: '关于我们', icon: <Type size={16} /> },
    { key: 'services', label: '核心产品', icon: <Type size={16} /> },
    { key: 'productShowcase', label: '明星单品', icon: <Image size={16} /> },
    { key: 'productList', label: '热销产品', icon: <Type size={16} /> },
    { key: 'faq', label: '常见问题', icon: <Type size={16} /> },
    { key: 'brand', label: '品牌信息', icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#16162b]/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-white/30 font-mono ml-2">编辑模式</span>
          </div>

          <div className="flex items-center gap-2">
            {savedMsg && (
              <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full animate-fade-in">
                已保存 ✓
              </span>
            )}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
              title="切换主题"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="恢复默认"
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                hasChanges
                  ? 'bg-brand-primary text-white hover:shadow-lg hover:shadow-brand-primary/30'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
              disabled={!hasChanges}
            >
              <Save size={14} />
              保存
            </button>
            <button
              onClick={() => navigate('/')}
              className="ml-2 text-xs text-white/40 hover:text-white transition-colors"
            >
              ← 预览站点
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="pt-14 flex h-screen">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-[#16162b] border-r border-white/5 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3 px-3">内容区块</p>
          {sections.map((sec) => (
            <button
              key={sec.key}
              onClick={() => setEditingSection(sec.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                editingSection === sec.key
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {sec.icon}
              {sec.label}
            </button>
          ))}
        </aside>

        {/* Editor Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {editingSection ? (
            <EditPanel
              section={editingSection}
              data={data}
              onUpdate={handleUpdateSection}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <Settings size={32} className="text-white/20" />
                </div>
                <h2 className="text-xl font-bold mb-2">LUMINA 编辑器</h2>
                <p className="text-white/40 text-sm max-w-sm">
                  从左侧选择一个区块开始编辑。编辑完成后点击右上角"保存"按钮。
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
