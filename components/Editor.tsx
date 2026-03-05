
import React, { useState } from 'react';
import { SlideData, SlideColors } from '../types';
import { THEMES, LOGO_PRESETS } from '../constants';
import { generateContentRefinement, generateFullCarousel } from '../services/geminiService';

interface EditorProps {
  slide: SlideData;
  updateSlide: (updated: SlideData) => void;
  onReplaceAllSlides?: (newSlides: SlideData[]) => void;
}

type EditorTab = 'magic' | 'content' | 'style' | 'code';

const Editor: React.FC<EditorProps> = ({ slide, updateSlide, onReplaceAllSlides }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>('style');
  const [magicTopic, setMagicTopic] = useState('');

  const handleChange = (field: keyof SlideData, value: any) => {
    updateSlide({ ...slide, [field]: value });
  };

  const handleColorChange = (key: keyof SlideColors, value: string) => {
    const newColors = { ...(slide.colors || THEMES[0]), [key]: value };
    handleChange('colors', newColors);
  };

  const applyTheme = (theme: typeof THEMES[0]) => {
    handleChange('colors', {
      primary: theme.primary,
      secondary: theme.secondary,
      bg: theme.bg,
      text: theme.text
    });
  };

  const applySnippet = (css: string) => {
    const currentCss = slide.customCss || '';
    handleChange('customCss', currentCss + '\n' + css);
  };

  const SNIPPETS = [
    { name: '+ ذهبي فاخر', css: '.poster-root { border: 8px solid #c2a378 !important; }\n.poster-title { color: #c2a378 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }' },
    { name: '+ عنوان مفرغ', css: '.poster-title { color: transparent !important; -webkit-text-stroke: 1px white; }' },
    { name: '+ حاوية زجاجية', css: '.poster-content { background: rgba(255,255,255,0.1) !important; backdrop-filter: blur(10px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.2); margin: 20px; }' },
    { name: '+ بدون نقش', css: '.poster-root svg { display: none !important; }' },
    { name: '+ صورة دائرية', css: '.poster-header { border-radius: 0 0 50% 50% !important; }' },
    { name: '+ تدرج ريترو', css: '.poster-root::after { content: ""; position: absolute; inset: 0; background: linear-gradient(45deg, rgba(255,0,0,0.05), rgba(0,0,255,0.05)); pointer-events: none; }' },
  ];

  return (
    <div className="editor-container">
      <div className="editor-tabs">
        {(['style', 'content', 'code', 'magic'] as EditorTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`editor-tab ${activeTab === tab ? 'editor-tab--active' : 'editor-tab--inactive'}`}
          >
            {tab === 'magic' ? '✨ ذكاء' : tab === 'content' ? '📝 محتوى' : tab === 'style' ? '🎨 تصميم' : '💻 CSS'}
          </button>
        ))}
      </div>

      <div className="editor-content">
        {activeTab === 'style' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h4 className="editor-section-title">الثيمات الجاهزة</h4>
              <div className="theme-grid">
                {THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => applyTheme(theme)}
                    className="theme-button"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <div className="theme-color-preview" style={{ backgroundColor: theme.primary }}></div>
                       <span className="theme-name">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="editor-section-title">تخصيص الألوان</h4>
              <div className="color-picker-grid">
                <div className="color-picker-group">
                  <label className="color-picker-label">الأساسي</label>
                  <input type="color" value={slide.colors?.primary || '#1e4d40'} onChange={(e) => handleColorChange('primary', e.target.value)} className="color-picker-input" />
                </div>
                <div className="color-picker-group">
                  <label className="color-picker-label">الخلفية</label>
                  <input type="color" value={slide.colors?.bg || '#ffffff'} onChange={(e) => handleColorChange('bg', e.target.value)} className="color-picker-input" />
                </div>
              </div>
            </div>

            <div className="logo-upload-section">
              <div className="logo-section-header">
                <label className="logo-upload-label">اختر شعاراً جاهزاً</label>
                {slide.logo && (
                  <button
                    onClick={() => handleChange('logo', '')}
                    className="btn-remove-logo"
                    title="إزالة الشعار"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="logo-options-grid">
                {LOGO_PRESETS.filter(p => p.url).map((preset) => (
                  <label
                    key={preset.id}
                    className={`logo-option ${slide.logo === preset.url ? 'logo-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="logo-preset"
                      checked={slide.logo === preset.url}
                      onChange={() => handleChange('logo', preset.url)}
                      className="logo-radio"
                    />
                    <div className="logo-option-preview">
                      <img src={preset.url} alt={preset.name} />
                    </div>
                    <span className="logo-option-name">{preset.name}</span>
                  </label>
                ))}
              </div>
              <label className={`logo-option logo-option--none ${slide.logo === '' ? 'logo-option--selected' : ''}`}>
                <input
                  type="radio"
                  name="logo-preset"
                  checked={slide.logo === ''}
                  onChange={() => handleChange('logo', '')}
                  className="logo-radio"
                />
                <div className="logo-option-preview">
                  <span className="text-slate-500 text-xs">×
</span>
                </div>
                <span className="logo-option-name">بدون شعار</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-5 animate-in fade-in duration-300 text-right">
            <div className="editor-input-group">
              <label className="editor-input-label">العنوان</label>
              <input type="text" value={slide.title} onChange={(e) => handleChange('title', e.target.value)} className="editor-input" dir="rtl" />
            </div>
            <div className="editor-input-group">
              <label className="editor-input-label">الوصف / المحتوى</label>
              <textarea value={slide.description || ''} onChange={(e) => handleChange('description', e.target.value)} className="editor-textarea" dir="rtl" />
            </div>
            <button
              onClick={async () => {
                setLoading(true);
                const better = await generateContentRefinement(slide.description || slide.title);
                if(slide.description) handleChange('description', better); else handleChange('title', better);
                setLoading(false);
              }}
              disabled={loading}
              className="btn-magic"
            >
              {loading ? 'جاري التحسين...' : '🪄 تحسين المحتوى ذكياً'}
            </button>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6 animate-in fade-in duration-300 text-right">
            <div>
              <h4 className="css-editor-title">قوالب جاهزة (SNIPPETS)</h4>
              <div className="snippet-grid">
                {SNIPPETS.map((snippet) => (
                  <button
                    key={snippet.name}
                    onClick={() => applySnippet(snippet.css)}
                    className="btn-snippet"
                  >
                    {snippet.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="css-editor-section">
              <h4 className="css-editor-title">محرر CSS المتقدم</h4>
              <p className="css-editor-hint">
                Classes: <span className="css-editor-hint-code">.poster-root, .poster-title, .poster-content, .poster-footer</span>
              </p>
              <textarea
                value={slide.customCss || ''}
                onChange={(e) => handleChange('customCss', e.target.value)}
                placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
                className="css-editor-textarea"
                dir="ltr"
              />
            </div>

            <button
              onClick={() => handleChange('customCss', '')}
              className="btn-reset-css"
            >
              إعادة تعيين CSS
            </button>
          </div>
        )}

        {activeTab === 'magic' && (
          <div className="magic-section">
            <h3 className="magic-title">المساعد الذكي</h3>
            <p className="magic-description">اكتب موضوعاً وسيقوم Gemini بإنشاء كاروسيل كامل بضغطة زر.</p>
            <textarea
              value={magicTopic}
              onChange={(e) => setMagicTopic(e.target.value)}
              placeholder="مثال: أهمية الذكاء الاصطناعي في التعليم"
              className="magic-textarea"
              dir="rtl"
            />
            <button
              onClick={async () => {
                if (!magicTopic || !onReplaceAllSlides) return;
                setLoading(true);
                try {
                  const result = await generateFullCarousel(magicTopic);
                  if (result && result.slides) {
                    const processed = result.slides.map((s: any, i: number) => ({
                      ...s,
                      id: Date.now().toString() + i,
                      footer: 'رؤية 2030',
                      colors: slide.colors || THEMES[0],
                      logo: slide.logo
                    }));
                    onReplaceAllSlides(processed);
                  }
                } catch (e) { console.error(e); } finally { setLoading(false); }
              }}
              disabled={loading}
              className="btn-generate-magic"
            >
              {loading ? 'جاري التوليد...' : 'إنشاء المحتوى كاملاً ✨'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
