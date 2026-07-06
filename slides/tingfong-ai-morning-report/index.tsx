import { useEffect, useRef } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

import aiChatOpen from './assets/ai-chat-open.png';
import aiContextMenu from './assets/ai-context-menu.png';
import pdfOpen from './assets/pdf-open.png';
import platformList from './assets/platform-list.png';
import podcastOpen from './assets/podcast-open.png';

const productDemo = new URL('./assets/product-demo.mp4', import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: '#fbfaf7', text: '#111827', accent: '#ddae58' },
  fonts: {
    display:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 132, body: 34 },
  radius: 8,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  muted: '#4b5563',
  faint: '#ebe3d5',
  panel: '#ffffff',
  ink: '#1f2937',
  cyan: '#0ea5e9',
  green: '#0f766e',
  amberSoft: '#f6ead4',
  cyanSoft: '#e0f2fe',
  inkSoft: '#f3f4f6',
};

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: 0,
} as const;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 70,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const styles = `
  @keyframes tf-rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tf-drift {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes tf-scan {
    from { transform: translateX(-100%); opacity: 0; }
    18%  { opacity: .75; }
    to   { transform: translateX(100%); opacity: 0; }
  }
  .tf-rise { opacity: 0; animation: tf-rise .72s cubic-bezier(.2,.7,.2,1) forwards; }
  .tf-float { animation: tf-drift 7s ease-in-out infinite; }
  .tf-scan::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(221,174,88,.22), transparent);
    animation: tf-scan 4.8s ease-in-out infinite;
  }
`;

const StyleTag = () => <style>{styles}</style>;

const Canvas = ({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'ink' }) => (
  <section
    style={{
      ...fill,
      background:
        tone === 'ink'
          ? `linear-gradient(135deg, #111827 0%, #172033 62%, ${palette.green} 145%)`
          : 'var(--osd-bg)',
      color: tone === 'ink' ? '#fffaf0' : 'var(--osd-text)',
    }}
  >
    <StyleTag />
    {tone === 'light' && <PaperGrid />}
    {children}
  </section>
);

const PaperGrid = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(17,24,39,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.028) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      opacity: 0.65,
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children, color = 'var(--osd-accent)' }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 850,
      color,
      letterSpacing: 0,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

const Footer = ({ label = '廷豐金融科技晨報' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${palette.faint}`,
        paddingTop: 20,
        color: palette.muted,
        fontSize: 22,
        fontWeight: 650,
      }}
    >
      <span>{label}</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const PageTitle = ({ children, width = 1120 }: { children: React.ReactNode; width?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 72,
      lineHeight: 1.12,
      fontWeight: 900,
      maxWidth: width,
      margin: 0,
      letterSpacing: 0,
    }}
  >
    {children}
  </h2>
);

const Body = ({ children, width = 980 }: { children: React.ReactNode; width?: number }) => (
  <p
    style={{
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.52,
      maxWidth: width,
      color: palette.muted,
      margin: '34px 0 0',
      letterSpacing: 0,
    }}
  >
    {children}
  </p>
);

const Screen = ({
  src,
  alt,
  style,
  className,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      borderRadius: 8,
      border: `1px solid ${palette.faint}`,
      background: palette.panel,
      boxShadow: '0 28px 90px rgba(17,24,39,0.16)',
      overflow: 'hidden',
      ...style,
    }}
  >
    <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

const Metric = ({ value, label, color = palette.accent }: { value: string; label: string; color?: string }) => (
  <div
    style={{
      borderLeft: `5px solid ${color}`,
      paddingLeft: 24,
      minWidth: 260,
    }}
  >
    <div style={{ fontSize: 70, lineHeight: 1, fontWeight: 900, color }}>{value}</div>
    <div style={{ fontSize: 26, lineHeight: 1.35, color: palette.muted, marginTop: 12, fontWeight: 650 }}>{label}</div>
  </div>
);

const PromptCard = ({
  title,
  text,
  color,
}: {
  title: string;
  text: string;
  color: string;
}) => (
  <div
    style={{
      background: palette.panel,
      border: `1px solid ${color}55`,
      borderRadius: 8,
      padding: '34px 36px',
      minHeight: 202,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 900, color }}>{title}</div>
    <div style={{ fontSize: 27, lineHeight: 1.45, color: palette.muted }}>{text}</div>
  </div>
);

const Cover: Page = () => (
  <Canvas>
    <Screen
      src={platformList}
      alt="每日晨報列表畫面"
      className="tf-float"
      style={{
        position: 'absolute',
        right: -50,
        top: 130,
        width: 970,
        height: 610,
        opacity: 0.88,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, #fbfaf7 0%, #fbfaf7 48%, rgba(251,250,247,.72) 72%, rgba(251,250,247,.2) 100%)',
      }}
    />
    <div style={{ position: 'relative', padding: '150px 120px 0' }}>
      <Eyebrow>產品影片輔助簡報</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 1.04,
          fontWeight: 950,
          maxWidth: 900,
          margin: 0,
          letterSpacing: 0,
        }}
      >
        廷豐每日 AI 晨報
      </h1>
      <Body width={760}>在播放 Demo 前，先建立觀看框架：這不是 PDF viewer，而是把晨報變成可閱讀、可收聽、可追問的研究入口。</Body>
      <div style={{ display: 'flex', gap: 48, marginTop: 76 }}>
        <Metric value="09:00" label="每日晨報節奏" />
        <Metric value="8" label="市場主題整合" color={palette.green} />
        <Metric value="AI" label="Podcast 與洞察" color={palette.cyan} />
      </div>
    </div>
    <Footer />
  </Canvas>
);

const Context: Page = () => (
  <Canvas>
    <div style={{ padding: '118px 120px 0', position: 'relative' }}>
      <Eyebrow>播放前先回答：為什麼需要它？</Eyebrow>
      <PageTitle width={1180}>研究內容的問題，不是資料太少，而是入口太分散。</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, marginTop: 78 }}>
        <PromptCard title="讀" text="PDF 有深度，但每天 100+ 頁不容易快速定位重點。" color={palette.accent} />
        <PromptCard title="聽" text="通勤、開盤前與盤中追蹤，需要把內容轉成可吸收的音訊摘要。" color={palette.green} />
        <PromptCard title="問" text="真正的工作流是針對段落追問，讓研究材料立刻變成判斷。" color={palette.cyan} />
      </div>
      <div
        style={{
          marginTop: 70,
          padding: '34px 42px',
          background: palette.amberSoft,
          borderRadius: 8,
          fontSize: 34,
          lineHeight: 1.45,
          fontWeight: 760,
          color: palette.ink,
        }}
      >
        影片會展示功能；這份簡報只負責讓觀眾知道該看什麼、為什麼重要。
      </div>
    </div>
    <Footer />
  </Canvas>
);

const Shift: Page = () => (
  <Canvas>
    <div style={{ position: 'absolute', left: 120, top: 118, width: 700 }}>
      <Eyebrow>產品定位</Eyebrow>
      <PageTitle width={680}>從「一份 PDF」變成「一個研究起手式」。</PageTitle>
      <Body width={650}>Demo 裡的 UI 動作可以拆成三個角色：內容入口、音訊摘要、上下文問答。它們共同降低每日研究的啟動成本。</Body>
    </div>
    <div style={{ position: 'absolute', right: 120, top: 140, width: 850 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 22,
        }}
      >
        {[
          ['PDF viewer', '保留完整晨報結構與頁碼脈絡', palette.accent],
          ['AI Podcast', '把長文轉為可同步吸收的摘要', palette.green],
          ['AI 洞察', '把選取段落變成可追問的研究對話', palette.cyan],
        ].map(([title, text, color], index) => (
          <div
            key={title}
            className="tf-rise"
            style={{
              animationDelay: `${index * 140}ms`,
              background: palette.panel,
              border: `1px solid ${color}55`,
              borderRadius: 8,
              padding: '34px 38px',
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              alignItems: 'center',
              gap: 30,
              minHeight: 142,
            }}
          >
            <div style={{ color, fontSize: 28, fontWeight: 900 }}>{title}</div>
            <div style={{ color: palette.muted, fontSize: 30, lineHeight: 1.35 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </Canvas>
);

const WatchGuide: Page = () => (
  <Canvas tone="ink">
    <div style={{ padding: '118px 120px 0', position: 'relative' }}>
      <Eyebrow color={palette.accent}>觀看影片時，請看三件事</Eyebrow>
      <PageTitle width={1220}>不要只看功能點，要看工作流如何被縮短。</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30, marginTop: 76 }}>
        {[
          ['01', '入口', '每日晨報列表把固定研究節奏變成固定入口。'],
          ['02', '承接', 'PDF、音訊與 AI 面板在同一個閱讀脈絡中出現。'],
          ['03', '提問', '從段落選取直接進入 AI 洞察，少掉複製與切換。'],
        ].map(([num, title, text]) => (
          <div
            key={num}
            style={{
              minHeight: 330,
              border: '1px solid rgba(255,255,255,.16)',
              borderRadius: 8,
              padding: 38,
              background: 'rgba(255,255,255,.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 70, fontWeight: 950, color: palette.accent, lineHeight: 1 }}>{num}</div>
            <div>
              <div style={{ fontSize: 38, fontWeight: 900, marginBottom: 18 }}>{title}</div>
              <div style={{ fontSize: 28, lineHeight: 1.45, color: '#d1d5db' }}>{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer label="播放前觀看框架" />
  </Canvas>
);

const ProductVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Browser autoplay policy may require the presenter to press play.
      }
    };
    void play();
  }, []);

  return (
    <video
      ref={videoRef}
      src={productDemo}
      poster={pdfOpen}
      controls
      muted
      playsInline
      preload="metadata"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        background: '#000',
      }}
    />
  );
};

const VideoPage: Page = () => (
  <Canvas tone="ink">
    <div style={{ position: 'absolute', left: 90, right: 90, top: 70, bottom: 92 }}>
      <div
        className="tf-scan"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.18)',
          boxShadow: '0 32px 120px rgba(0,0,0,.36)',
          background: '#000',
        }}
      >
        <ProductVideo />
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 104,
        padding: '18px 24px',
        borderRadius: 8,
        background: 'rgba(17,24,39,.82)',
        border: '1px solid rgba(255,255,255,.16)',
        color: '#fffaf0',
        fontSize: 26,
        fontWeight: 850,
      }}
    >
      產品影片播放
    </div>
    <Footer label="Demo：讀、聽、問" />
  </Canvas>
);

const Evidence: Page = () => (
  <Canvas>
    <div style={{ padding: '112px 120px 0', position: 'relative' }}>
      <Eyebrow>影片之後，把記憶點落在價值</Eyebrow>
      <PageTitle width={1150}>三個畫面，對應三個可被銷售與交付的承諾。</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 58 }}>
        <Screen src={pdfOpen} alt="PDF 晨報開啟畫面" style={{ height: 260 }} />
        <Screen src={podcastOpen} alt="Podcast 面板畫面" style={{ height: 260 }} />
        <Screen src={aiContextMenu} alt="AI 洞察右鍵選單畫面" style={{ height: 260 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 28 }}>
        {[
          ['內容深度', '105 頁晨報與 8 大市場，保留專業研究的完整性。', palette.accent],
          ['吸收效率', 'Podcast 把閱讀延伸到開盤前、通勤與盤中空檔。', palette.green],
          ['判斷速度', 'AI 洞察讓問題留在原文脈絡裡，不需要切換工具。', palette.cyan],
        ].map(([title, text, color]) => (
          <div key={title} style={{ borderTop: `4px solid ${color}`, paddingTop: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color }}>{title}</div>
            <div style={{ fontSize: 26, lineHeight: 1.45, color: palette.muted, marginTop: 12 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </Canvas>
);

const Close: Page = () => (
  <Canvas>
    <Screen
      src={aiChatOpen}
      alt="AI 助理回覆畫面"
      style={{
        position: 'absolute',
        right: 120,
        top: 150,
        width: 780,
        height: 490,
      }}
    />
    <div style={{ position: 'absolute', left: 120, top: 145, width: 760 }}>
      <Eyebrow>收束句</Eyebrow>
      <PageTitle width={720}>讀、聽、問，一份晨報完成專業研究起手式。</PageTitle>
      <Body width={670}>影片讓觀眾看到操作；簡報最後要帶走的是定位：廷豐不是新增一個 AI 按鈕，而是把研究工作的第一步產品化。</Body>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginTop: 64,
          height: 64,
          padding: '0 28px',
          borderRadius: 8,
          background: palette.text,
          color: '#fffaf0',
          fontSize: 26,
          fontWeight: 850,
        }}
      >
        Product story + live demo support
      </div>
    </div>
    <Footer />
  </Canvas>
);

Cover.transition = {
  duration: 280,
  exit: transition.exit,
  enter: {
    duration: 280,
    delay: 90,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

VideoPage.transition = {
  duration: 260,
  exit: transition.exit,
  enter: {
    duration: 260,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'scale(.985)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
  },
};

export const meta: SlideMeta = {
  title: '廷豐每日 AI 晨報',
  createdAt: '2026-07-06T13:16:23.461Z',
};

export default [Cover, Context, Shift, WatchGuide, VideoPage, Evidence, Close] satisfies Page[];
