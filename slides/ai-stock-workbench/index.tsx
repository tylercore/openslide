import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

import dashboard from './assets/dashboard.png';

const productFlowVideo = new URL('./assets/product-flow.mp4', import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: '#f4f4f5', text: '#09090b', accent: '#2563eb' },
  fonts: {
    display:
      '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body:
      '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 132, body: 34 },
  radius: 6,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  muted: '#71717a',
  surface: '#ffffff',
  surfaceStrong: '#fafafa',
  border: '#e4e4e7',
  lineStrong: '#a1a1aa',
  black: '#111827',
  blueSoft: '#dbeafe',
  indigoSoft: '#e0e7ff',
  emerald: '#10b981',
  emeraldSoft: '#d1fae5',
  amber: '#f59e0b',
  amberSoft: '#fef3c7',
  red: '#ef4444',
  redSoft: '#fee2e2',
  slateSoft: '#f1f5f9',
};

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
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
  @keyframes as-rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes as-drift {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }
  .as-rise { opacity: 0; animation: as-rise .72s cubic-bezier(.2,.7,.2,1) forwards; }
  .as-drift { animation: as-drift 7s ease-in-out infinite; }
`;

const StyleTag = () => <style>{styles}</style>;

const Canvas = ({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'ink' }) => (
  <section
    style={{
      ...fill,
      background:
        tone === 'ink'
          ? 'linear-gradient(135deg, #09090b 0%, #111827 58%, #1d4ed8 140%)'
          : 'var(--osd-bg)',
      color: tone === 'ink' ? '#f8fafc' : 'var(--osd-text)',
    }}
  >
    <StyleTag />
    {tone === 'light' && <GridBackground />}
    {children}
  </section>
);

const GridBackground = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(9,9,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,11,0.035) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
      opacity: 0.72,
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children, color = 'var(--osd-accent)' }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontSize: 23,
      fontWeight: 900,
      color,
      textTransform: 'uppercase',
      letterSpacing: 0,
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

const PageTitle = ({ children, width = 1180 }: { children: ReactNode; width?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 74,
      lineHeight: 1.1,
      fontWeight: 900,
      maxWidth: width,
      margin: 0,
      letterSpacing: 0,
    }}
  >
    {children}
  </h2>
);

const BodyText = ({ children, width = 1040 }: { children: ReactNode; width?: number }) => (
  <p
    style={{
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.48,
      color: palette.muted,
      maxWidth: width,
      margin: '30px 0 0',
      letterSpacing: 0,
    }}
  >
    {children}
  </p>
);

const Footer = ({ label = '廷豐 AI 股票交易工作台' }: { label?: string }) => {
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
        fontSize: 22,
        color: palette.muted,
        borderTop: `1px solid ${palette.border}`,
        paddingTop: 20,
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

const Screen = ({
  src,
  alt,
  style,
  className,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${palette.border}`,
      background: palette.surface,
      boxShadow: '0 30px 80px rgba(15, 23, 42, 0.14)',
      overflow: 'hidden',
      ...style,
    }}
  >
    <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

const Pill = ({ children, color = palette.accent }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 48,
      padding: '0 20px',
      borderRadius: 6,
      border: `1px solid ${color}55`,
      background: `${color}14`,
      color,
      fontSize: 23,
      fontWeight: 900,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const PositionCard = ({ label, value, hint }: { label: string; value: string; hint: string }) => (
  <div
    style={{
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: 30,
      minHeight: 172,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 22, color: palette.muted, fontWeight: 800 }}>{label}</div>
    <div style={{ fontSize: 44, lineHeight: 1, fontWeight: 950, color: palette.text }}>{value}</div>
    <div style={{ fontSize: 22, color: palette.muted }}>{hint}</div>
  </div>
);

const FeatureCard = ({
  title,
  text,
  color,
  background,
}: {
  title: string;
  text: string;
  color: string;
  background: string;
}) => (
  <div
    style={{
      background,
      border: `1px solid ${color}45`,
      borderRadius: 'var(--osd-radius)',
      padding: 34,
      minHeight: 240,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 950, color }}>{title}</div>
    <div style={{ fontSize: 27, lineHeight: 1.42, color: palette.muted }}>{text}</div>
  </div>
);

const FlowNode = ({ title, text, color }: { title: string; text: string; color: string }) => (
  <div
    style={{
      background: palette.surface,
      border: `1px solid ${color}55`,
      borderTop: `5px solid ${color}`,
      borderRadius: 'var(--osd-radius)',
      padding: '30px 32px',
      minHeight: 208,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 33, fontWeight: 950, color }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.42, color: palette.muted }}>{text}</div>
  </div>
);

const AiStockCard = ({
  symbol,
  name,
  type,
  zone,
  active = false,
}: {
  symbol: string;
  name: string;
  type: string;
  zone: string;
  active?: boolean;
}) => (
  <div
    style={{
      border: active ? `2px solid ${palette.accent}` : `1px solid ${palette.border}`,
      borderLeft: active ? `8px solid ${palette.accent}` : `1px solid ${palette.border}`,
      background: active ? '#ffffff' : palette.surfaceStrong,
      borderRadius: 'var(--osd-radius)',
      padding: '22px 24px',
      minHeight: 116,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
    }}
  >
    <div>
      <div style={{ fontSize: 32, lineHeight: 1, fontWeight: 950, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{symbol}</div>
      <div style={{ fontSize: 23, fontWeight: 800, color: palette.text, marginTop: 10 }}>{name}</div>
      <div style={{ fontSize: 18, color: palette.muted, marginTop: 10, fontWeight: 850 }}>{type}</div>
    </div>
    <div
      style={{
        alignSelf: 'flex-start',
        border: `1px solid ${active ? palette.accent : palette.lineStrong}`,
        color: active ? palette.accent : palette.muted,
        borderRadius: 6,
        padding: '8px 10px',
        fontSize: 18,
        fontWeight: 900,
        whiteSpace: 'nowrap',
      }}
    >
      {zone}
    </div>
  </div>
);

const ResearchMetric = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      border: `1px solid ${palette.border}`,
      background: palette.surfaceStrong,
      borderRadius: 'var(--osd-radius)',
      padding: '18px 20px',
    }}
  >
    <div style={{ fontSize: 18, color: palette.muted, fontWeight: 800 }}>{label}</div>
    <div style={{ fontSize: 28, marginTop: 8, color: palette.text, fontWeight: 950 }}>{value}</div>
  </div>
);

const ResearchLayer = ({
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
      display: 'grid',
      gridTemplateColumns: '86px 1fr',
      gap: 26,
      alignItems: 'start',
    }}
  >
    <div
      style={{
        width: 62,
        height: 62,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        background: `${color}22`,
      }}
    />
    <div>
      <div style={{ fontSize: 34, fontWeight: 950, color }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.42, color: palette.muted, marginTop: 10 }}>{text}</div>
    </div>
  </div>
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
        // Browser autoplay policy may require manual playback.
      }
    };

    void play();
  }, []);

  return (
    <video
      ref={videoRef}
      src={productFlowVideo}
      controls
      muted
      playsInline
      preload="metadata"
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', background: '#09090b' }}
    />
  );
};

const Cover: Page = () => (
  <Canvas>
    <Screen
      src={dashboard}
      alt="持倉與監控儀表板"
      className="as-drift"
      style={{
        position: 'absolute',
        right: -76,
        top: 132,
        width: 1040,
        height: 585,
        opacity: 0.92,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, #f4f4f5 0%, #f4f4f5 50%, rgba(244,244,245,.74) 76%, rgba(244,244,245,.18) 100%)',
      }}
    />
    <main style={{ position: 'relative', padding: '142px 120px 0' }}>
      <Eyebrow>AI stock trading workbench</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 1.03,
          fontWeight: 950,
          maxWidth: 900,
          margin: 0,
          letterSpacing: 0,
        }}
      >
        廷豐 AI 股票交易機器人
      </h1>
      <BodyText width={760}>桌面版交易意圖、到價通知與 AI 智能推薦工作台，把研究判斷、提醒建立與監控通知放在同一個流程。</BodyText>
      <div style={{ display: 'flex', gap: 16, marginTop: 54, flexWrap: 'wrap' }}>
        <Pill>Notify-only</Pill>
        <Pill color={palette.black}>批次提醒</Pill>
        <Pill color={palette.emerald}>AI 推薦</Pill>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const ProductScope: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '116px 120px 0' }}>
      <Eyebrow>產品邊界</Eyebrow>
      <PageTitle width={1260}>交易意圖標準化，即時監控與通知</PageTitle>
      <BodyText width={1120}>AI智能監控與即時通知</BodyText>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, marginTop: 70 }}>
        <FeatureCard
          title="交易意圖"
          text="標的、方向、張數、策略與觸發條件先被整理成一致資料模型。"
          color={palette.accent}
          background={palette.blueSoft}
        />
        <FeatureCard
          title="監控狀態"
          text="scheduled、active、triggered、expired 等狀態讓每筆提醒能被追蹤。"
          color={palette.black}
          background={palette.slateSoft}
        />
        <FeatureCard
          title="通知閉環"
          text="條件成立後建立通知，讓決策與執行節奏不靠人工記憶。"
          color={palette.emerald}
          background={palette.emeraldSoft}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const HomeDashboardFull: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '56px 88px 0' }}>
      <div
        style={{
          position: 'relative',
          width: 1610,
          height: 906,
          margin: '0 auto',
          borderRadius: 'var(--osd-radius)',
          overflow: 'hidden',
          border: `1px solid ${palette.border}`,
          boxShadow: '0 32px 90px rgba(15,23,42,.16)',
          background: palette.surface,
        }}
      >
        <img src={dashboard} alt="首頁持倉與監控儀表板" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const HomeDashboardDetail: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '92px 120px 0', display: 'grid', gridTemplateColumns: '1010px 1fr', gap: 48 }}>
      <div>
        <Eyebrow>首頁拆解</Eyebrow>
        <PageTitle width={980}>首頁排版以「總覽卡片 → 活躍監控 → 下一步提示」由上到下收束。</PageTitle>
        <BodyText width={920}>這頁延續首頁截圖的比例與元件位置，只把閱讀焦點標出：上方三張指標卡、中段監控清單、底部操作提示。</BodyText>
        <Screen src={dashboard} alt="首頁排版細節" style={{ height: 568, marginTop: 36, boxShadow: '0 24px 70px rgba(15,23,42,.12)' }} />
      </div>

      <div style={{ display: 'grid', gap: 18, paddingTop: 94 }}>
        <PositionCard label="01 / 資產總覽" value="18 張" hint="左側持倉總量、中央市值、右側監控數並列呈現。" />
        <PositionCard label="02 / 監控清單" value="7 筆" hint="藍色頂線強調 Active Monitors，列內保留標的、策略、時段與狀態。" />
        <PositionCard label="03 / 行動提示" value="下一步" hint="底部一句話導向先看資產水位與監控狀態，不打斷首頁節奏。" />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const VideoPage: Page = () => (
  <Canvas tone="ink">
    <div style={{ position: 'absolute', left: 88, right: 88, top: 72, bottom: 98 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'var(--osd-radius)',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.14)',
          boxShadow: '0 32px 120px rgba(0,0,0,.38)',
          background: '#09090b',
        }}
      >
        <ProductVideo />
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 122,
        top: 108,
        padding: '16px 22px',
        borderRadius: 6,
        background: 'rgba(9,9,11,.82)',
        border: '1px solid rgba(255,255,255,.14)',
        color: '#f8fafc',
        fontSize: 25,
        fontWeight: 900,
      }}
    >
      21 秒產品流程
    </div>
    <Footer label="標準批次、TWAP、監控與通知" />
  </Canvas>
);

const AiRecommendation: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '104px 120px 0', display: 'grid', gridTemplateColumns: '520px 1fr', gap: 44 }}>
      <div>
        <Eyebrow>AI 智能推薦</Eyebrow>
        <PageTitle width={520}>推薦不是一句話，而是一張可執行的標的分析卡。</PageTitle>
        <BodyText width={500}>介面把候選標的、量能分布、BLV / CAR、建議用途、風險等級與監控時段放在同一頁，方便轉成提醒策略。</BodyText>
        <div style={{ display: 'grid', gap: 14, marginTop: 44 }}>
          <AiStockCard symbol="2383" name="台光電" type="ETF 驅動型 / PCB 股王" zone="後重型" active />
          <AiStockCard symbol="3324" name="雙鴻" type="融資當沖型 / AI 散熱" zone="極端後重" />
          <AiStockCard symbol="6669" name="緯穎" type="大單階梯型 / AI 伺服器" zone="極端後重" />
        </div>
      </div>

      <div
        style={{
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderTop: `5px solid ${palette.black}`,
          borderRadius: 'var(--osd-radius)',
          padding: 36,
          minHeight: 700,
          boxShadow: '0 24px 70px rgba(15,23,42,.10)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 24 }}>
          <div>
            <div style={{ fontSize: 42, fontWeight: 950 }}>2383 台光電</div>
            <div style={{ marginTop: 12, color: palette.muted, fontSize: 24, fontWeight: 850 }}>ETF 驅動型 / PCB 股王</div>
          </div>
          <Pill color={palette.accent}>後重型</Pill>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginTop: 36 }}>
          <ResearchMetric label="BLV 後重比" value="約 45%" />
          <ResearchMetric label="CAR 尾盤比" value="約 8-12%" />
          <ResearchMetric label="驅動機制" value="ETF 被動再平衡" />
          <ResearchMetric label="建議用途" value="VWAP 基準" />
        </div>

        <div
          style={{
            marginTop: 34,
            borderLeft: `4px solid ${palette.accent}`,
            background: palette.blueSoft,
            padding: '28px 32px',
            borderRadius: 'var(--osd-radius)',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 950, color: palette.text }}>建議策略：VWAP 成交量加權</div>
          <p style={{ fontSize: 27, lineHeight: 1.5, color: palette.text, margin: '18px 0 0' }}>
            尾盤量能具規律性，若股價長時間站上 VWAP 且尾盤 A 段放量，適合用 VWAP 作為執行基準；集合競價若異常放大則降低追價權重。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 28 }}>
          <ResearchMetric label="監控時段" value="12:30-13:25" />
          <ResearchMetric label="風險等級" value="中" />
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const ResearchPlatform: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '116px 120px 0', display: 'grid', gridTemplateColumns: '690px 1fr', gap: 88 }}>
      <div>
        <Eyebrow>internal-research</Eyebrow>
        <PageTitle width={690}>AI 智能推薦背後，是一個研究規格與結果分級平台。</PageTitle>
        <BodyText width={660}>internal-research 透過 S3 Parquet 資料、研究技能模板、Research Spec JSON 與執行紀錄，把「推薦」拆成可驗證的研究流程。</BodyText>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36, paddingTop: 12 }}>
        <ResearchLayer
          title="資料來源"
          text="共享 S3 設定讀取市場資料 Parquet，主控台顯示連線狀態與可用資料集。"
          color={palette.accent}
        />
        <ResearchLayer
          title="研究技能"
          text="技能庫保存平台技能與特性模板，讓研究任務可重複、可下載、可版本化。"
          color={palette.emerald}
        />
        <ResearchLayer
          title="結果分級"
          text="執行結果以 strong、moderate、weak、none、insufficient data 分級，回到標的推薦與風險提示。"
          color={palette.amber}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const Closing: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0' }}>
      <Eyebrow>流程收束</Eyebrow>
      <PageTitle width={1240}>讓交易決策與執行保持一致且連貫。</PageTitle>
      <BodyText width={1100}>AI 研究先把候選標的與建議策略整理出來；交易工作台把這些判斷轉成下單、監控與通知。</BodyText>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 76 }}>
        <FlowNode title="研究" text="資料集、特性模板、研究規格與結果分級。" color={palette.emerald} />
        <FlowNode title="策略" text="AI 推薦轉成 VWAP、限價、監控時段與風險等級。" color={palette.accent} />
        <FlowNode title="下單" text="標準批次、TWAP 與到價條件建立為交易意圖。" color={palette.black} />
        <FlowNode title="通知" text="追蹤狀態同步，條件成立後建立站內通知。" color={palette.amber} />
      </div>
    </main>
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

export const meta: SlideMeta = {
  title: '廷豐 AI 股票交易',
  createdAt: '2026-07-06T15:22:46.564Z',
};

export default [Cover, ProductScope, HomeDashboardFull, HomeDashboardDetail, VideoPage, AiRecommendation, ResearchPlatform, Closing] satisfies Page[];
