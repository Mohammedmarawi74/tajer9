import React, { useState } from 'react';
import { SlideData, CarouselProject } from './types';
import { DEFAULT_SLIDES, DEFAULT_PROJECT_NAME } from './constants';
import SlideRenderer from './components/SlideRenderer';
import Editor from './components/Editor';
import { toPng } from 'https://esm.sh/html-to-image@1.11.11';
import './styles.css';

const App: React.FC = () => {
  const [project, setProject] = useState<CarouselProject>({
    name: DEFAULT_PROJECT_NAME,
    slides: DEFAULT_SLIDES,
  });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const updateSlide = (updated: SlideData) => {
    const newSlides = [...project.slides];
    newSlides[activeSlideIndex] = updated;
    setProject({ ...project, slides: newSlides });
  };

  const addSlide = (type: SlideData['type']) => {
    const newSlide: SlideData = {
      id: Date.now().toString(),
      type,
      title: 'عنوان جديد',
      footer: project.slides[0]?.footer || 'مركز الاتصال الحكومي',
      ...(type === 'stats' ? { stats: [{ id: 's1', label: 'إحصائية', value: '00' }] } : {}),
      ...(type === 'points' ? { points: [{ id: 'p1', text: 'نقطة جديدة' }] } : {}),
      ...(type === 'intro' ? { description: 'اكتب وصفاً هنا...', subtitle: 'المملكة العربية السعودية' } : {}),
      ...(type === 'closing' ? { description: 'شكراً لمتابعتكم' } : {}),
    };
    setProject({ ...project, slides: [...project.slides, newSlide] });
    setActiveSlideIndex(project.slides.length);
  };

  const deleteSlide = (index: number) => {
    if (project.slides.length <= 1) return;
    const newSlides = project.slides.filter((_, i) => i !== index);
    setProject({ ...project, slides: newSlides });
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const exportAsImage = async () => {
    const node = document.getElementById('active-slide-container');
    if (!node) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        fontEmbedCSS: '',
        style: {
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
        },
        filter: (node: HTMLElement) => {
          if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
            return false;
          }
          return true;
        }
      });

      const link = document.createElement('a');
      link.download = `saudi-poster-${activeSlideIndex + 1}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      try {
        const dataUrl = await toPng(node, { pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `saudi-poster-fallback.png`;
        link.href = dataUrl;
        link.click();
      } catch (fallbackErr) {
        alert('حدث خطأ أثناء تصدير الصورة.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-navbar">
        <div className="navbar-brand">
          <div className="brand-icon">💼</div>
          <div className="brand-title-container">
            <h1 className="brand-title">التاجر الرقمي <span className="brand-title-accent">Al-Tajer</span></h1>
            <p className="brand-subtitle">منصة التاجر الرقمية</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            onClick={exportAsImage}
            disabled={isExporting}
            className={`btn-export ${isExporting ? 'btn-export--disabled' : ''}`}
          >
            {isExporting ? 'جاري التحضير...' : 'حفظ كصورة (PNG)'}
            {!isExporting && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button onClick={() => window.print()} className="btn-pdf">
            تصدير PDF
          </button>
        </div>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">مخطط الشرائح</h2>
            <button onClick={() => addSlide('intro')} className="btn-add-slide">+</button>
          </div>

          <div className="slide-thumbnails">
            {project.slides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={`slide-thumbnail ${
                  activeSlideIndex === idx ? 'slide-thumbnail--active' : 'slide-thumbnail--inactive'
                }`}
              >
                <div className="slide-thumbnail-preview">
                  <SlideRenderer slide={slide} />
                </div>
                <div className="thumbnail-number">{idx + 1}</div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteSlide(idx); }}
                  className="btn-delete-slide"
                >
                  ×
                </button>
              </div>
            ))}

            <div className="slide-type-buttons">
              <button onClick={() => addSlide('stats')} className="btn-slide-type">إحصائيات</button>
              <button onClick={() => addSlide('points')} className="btn-slide-type">نقاط</button>
              <button onClick={() => addSlide('closing')} className="btn-slide-type">خاتمة</button>
            </div>
          </div>
        </aside>

        <section className="app-canvas">
           <div className="canvas-container">
              <div id="active-slide-container">
                <SlideRenderer slide={project.slides[activeSlideIndex]} />
              </div>
              <div className="slide-indicators">
                <div className="indicators-wrapper">
                  {project.slides.map((_, i) => (
                    <div key={i} className={`slide-indicator ${i === activeSlideIndex ? 'slide-indicator--active' : 'slide-indicator--inactive'}`}></div>
                  ))}
                </div>
              </div>
           </div>
        </section>

        <aside className="app-editor">
          <Editor
            slide={project.slides[activeSlideIndex]}
            updateSlide={updateSlide}
            onReplaceAllSlides={(newSlides) => setProject({ ...project, slides: newSlides })}
          />
        </aside>
      </main>
    </div>
  );
};

export default App;
