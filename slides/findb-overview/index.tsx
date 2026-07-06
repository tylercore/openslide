import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f5f2ea', text: '#182026', accent: '#0f766e' },
  fonts: {
    display:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 144, body: 34 },
  radius: 18,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  muted: '#64717a',
  soft: '#fffaf0',
  line: '#d7d0c1',
  blue: '#2b5f8a',
  gold: '#b7791f',
  red: '#a8483f',
  greenSoft: '#d7ede6',
  blueSoft: '#dce8f4',
  goldSoft: '#f3e1bd',
  redSoft: '#efd4cf',
  charcoal: '#263238',
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

const Canvas = ({
  children,
  variant = 'plain',
}: {
  children: React.ReactNode;
  variant?: 'plain' | 'ink';
}) => (
  <section
    style={{
      ...fill,
      background:
        variant === 'ink'
          ? `linear-gradient(135deg, ${palette.charcoal} 0%, #162024 62%, #0f766e 150%)`
          : 'var(--osd-bg)',
      color: variant === 'ink' ? '#f8f4ea' : 'var(--osd-text)',
    }}
  >
    {variant === 'plain' && <PaperGrain />}
    {children}
  </section>
);

const PaperGrain = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(24,32,38,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24,32,38,0.025) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
      opacity: 0.55,
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'gold' }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 800,
      color: tone === 'green' ? 'var(--osd-accent)' : palette.gold,
      textTransform: 'uppercase',
      letterSpacing: 0,
      marginBottom: 26,
    }}
  >
    {children}
  </div>
);

const PageTitle = ({ children, width = 1280 }: { children: React.ReactNode; width?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 72,
      lineHeight: 1.12,
      fontWeight: 850,
      maxWidth: width,
      margin: 0,
      letterSpacing: 0,
    }}
  >
    {children}
  </h2>
);

const BodyText = ({ children, width = 1120 }: { children: React.ReactNode; width?: number }) => (
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

const Footer = () => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      right: 120,
      bottom: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 22,
      color: palette.muted,
      borderTop: `1px solid ${palette.line}`,
      paddingTop: 22,
    }}
  >
    <span>FinDB project overview</span>
    <span>For leadership briefing</span>
  </div>
);

const Pill = ({ children, color = palette.accent }: { children: React.ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 48,
      padding: '0 22px',
      borderRadius: 999,
      border: `1px solid ${color}55`,
      background: `${color}16`,
      color,
      fontSize: 24,
      fontWeight: 800,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const SignalCard = ({
  label,
  title,
  text,
  color,
  background,
}: {
  label: string;
  title: string;
  text: string;
  color: string;
  background: string;
}) => (
  <div
    style={{
      background,
      border: `1px solid ${color}40`,
      borderRadius: 'var(--osd-radius)',
      padding: 34,
      minHeight: 245,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 850, color }}>{label}</div>
    <div>
      <div style={{ fontSize: 36, fontWeight: 850, color: palette.text, marginBottom: 14 }}>{title}</div>
      <div style={{ fontSize: 27, lineHeight: 1.45, color: palette.muted }}>{text}</div>
    </div>
  </div>
);

const FlowNode = ({
  title,
  subtitle,
  color,
  background,
}: {
  title: string;
  subtitle: string;
  color: string;
  background: string;
}) => (
  <div
    style={{
      width: 310,
      minHeight: 180,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${color}55`,
      background,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 24px 55px rgba(31, 41, 55, 0.08)',
    }}
  >
    <div style={{ fontSize: 36, fontWeight: 850, color }}>{title}</div>
    <div style={{ fontSize: 25, lineHeight: 1.4, color: palette.muted }}>{subtitle}</div>
  </div>
);

const Arrow = () => (
  <div
    style={{
      width: 86,
      height: 2,
      background: palette.line,
      position: 'relative',
      flexShrink: 0,
      marginTop: 84,
    }}
  >
    <div
      style={{
        position: 'absolute',
        right: -2,
        top: -7,
        width: 16,
        height: 16,
        borderTop: `2px solid ${palette.line}`,
        borderRight: `2px solid ${palette.line}`,
        transform: 'rotate(45deg)',
      }}
    />
  </div>
);

const CoverageTile = ({
  title,
  body,
  color,
}: {
  title: string;
  body: string;
  color: string;
}) => (
  <div
    style={{
      borderLeft: `8px solid ${color}`,
      background: palette.soft,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 32px',
      boxShadow: '0 18px 38px rgba(31, 41, 55, 0.06)',
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 850, marginBottom: 10 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.4, color: palette.muted }}>{body}</div>
  </div>
);

const TrustLayer = ({
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
      gridTemplateColumns: '95px 1fr',
      gap: 28,
      alignItems: 'start',
    }}
  >
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: '50%',
        background: `${color}24`,
        border: `2px solid ${color}`,
      }}
    />
    <div>
      <div style={{ fontSize: 36, fontWeight: 850, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.42, color: palette.muted }}>{text}</div>
    </div>
  </div>
);

const Outcome = ({
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
      background: '#ffffffaa',
      border: `1px solid ${color}55`,
      borderRadius: 'var(--osd-radius)',
      padding: 34,
      minHeight: 222,
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 850, color, marginBottom: 18 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.42, color: palette.muted }}>{text}</div>
  </div>
);

const NextStep = ({
  phase,
  title,
  text,
  color,
}: {
  phase: string;
  title: string;
  text: string;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '190px 1fr',
      gap: 28,
      alignItems: 'start',
      padding: '28px 0',
      borderBottom: `1px solid ${palette.line}`,
    }}
  >
    <div style={{ color, fontSize: 26, fontWeight: 850 }}>{phase}</div>
    <div>
      <div style={{ fontSize: 34, fontWeight: 850, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 27, lineHeight: 1.42, color: palette.muted }}>{text}</div>
    </div>
  </div>
);

const Cover: Page = () => (
  <Canvas variant="ink">
    <div style={{ position: 'absolute', inset: 0, opacity: 0.24 }}>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 110,
          width: 620,
          height: 620,
          borderRadius: '50%',
          border: '2px solid rgba(248,244,234,0.32)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 238,
          top: 228,
          width: 384,
          height: 384,
          borderRadius: '50%',
          border: '2px solid rgba(248,244,234,0.28)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 350,
          top: 340,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(15,118,110,0.55)',
        }}
      />
    </div>

    <div style={{ position: 'relative', padding: '138px 140px 0' }}>
      <Eyebrow>Financial data platform</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 0.98,
          fontWeight: 900,
          maxWidth: 1110,
          margin: 0,
          letterSpacing: 0,
        }}
      >
        FinDB
        <br />
        可信任的金融資料底座
      </h1>
      <p style={{ fontSize: 38, lineHeight: 1.42, color: '#dfe8df', maxWidth: 980, margin: '48px 0 0' }}>
        將多來源市場資料整理成一致、可查、可追溯的資料服務，支援報告、圖表、研究與 AI 應用。
      </p>
      <div style={{ display: 'flex', gap: 18, marginTop: 56 }}>
        <Pill color="#8fd1c7">Source</Pill>
        <Pill color="#e7c778">Normalize</Pill>
        <Pill color="#93bce2">Serve</Pill>
      </div>
    </div>
  </Canvas>
);

const WhyItMatters: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0' }}>
      <Eyebrow>Why this matters</Eyebrow>
      <PageTitle width={1320}>金融資料最大的風險，不是沒有資料，而是資料不一致。</PageTitle>
      <BodyText width={1180}>
        報告、策略驗證與 AI 查詢都依賴同一個前提：資料來源清楚、欄位定義一致，且能回頭查到每次匯入與修正紀錄。
      </BodyText>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 74 }}>
        <SignalCard
          label="來源分散"
          title="同一市場，多種格式"
          text="Bloomberg、區域市場、期貨與宏觀資料各自有不同命名與欄位。"
          color={palette.blue}
          background={palette.blueSoft}
        />
        <SignalCard
          label="品質不穩"
          title="錯價會一路放大"
          text="高低價、成交量、缺漏值若未阻擋，會進入圖表與模型。"
          color={palette.red}
          background={palette.redSoft}
        />
        <SignalCard
          label="追溯困難"
          title="修正需要證據"
          text="主管與使用者需要知道資料何時來、誰修正、為什麼修正。"
          color={palette.gold}
          background={palette.goldSoft}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const HowItWorks: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0' }}>
      <Eyebrow>How FinDB works</Eyebrow>
      <PageTitle>FinDB 把資料處理拆成清楚的三段，降低彼此耦合。</PageTitle>
      <BodyText width={1120}>
        抓資料的服務只負責傳送；主系統負責驗證、標準化與查詢。每一段都有明確責任，便於擴充市場與排查問題。
      </BodyText>

      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 78 }}>
        <FlowNode title="Fetch" subtitle="外部服務抓取原始市場資料，不長期保存。" color={palette.blue} background={palette.blueSoft} />
        <Arrow />
        <FlowNode title="Source" subtitle="API key、去重、寫入 Raw，建立處理批次。" color={palette.accent} background={palette.greenSoft} />
        <Arrow />
        <FlowNode title="Normalize" subtitle="欄位轉換、資料品質檢查，寫入 canonical models。" color={palette.gold} background={palette.goldSoft} />
        <Arrow />
        <FlowNode title="Serve" subtitle="提供統一查詢 API，給報告、圖表與 AI 使用。" color={palette.charcoal} background={palette.soft} />
      </div>

      <div
        style={{
          marginTop: 58,
          padding: '26px 32px',
          borderRadius: 'var(--osd-radius)',
          background: '#ffffffaa',
          border: `1px solid ${palette.line}`,
          fontSize: 28,
          color: palette.muted,
          maxWidth: 1270,
        }}
      >
        管理端 Admin API 補上人工修正、DQ issue 處理與 raw payload 查詢，讓維運流程有紀錄可循。
      </div>
    </main>
    <Footer />
  </Canvas>
);

const Coverage: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0' }}>
      <Eyebrow>Current coverage</Eyebrow>
      <PageTitle width={1330}>目前已可服務多種資料需求，核心路徑已串接完成。</PageTitle>
      <BodyText width={1140}>
        Source、Serve、Admin 與 normalize 主流程已可運作，資料範圍從日頻行情延伸到公司行為、宏觀與期貨。
      </BodyText>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 70 }}>
        <CoverageTile
          title="行情資料"
          body="CRYPTO、US、FX、TW、HK、CN equity / index EOD 已有標準化流程。"
          color={palette.accent}
        />
        <CoverageTile
          title="Bloomberg direct ingest"
          body="Crypto、FX、US stock、港中資料、macro 與 WTX 可直接匯入。"
          color={palette.blue}
        />
        <CoverageTile
          title="延伸資料"
          body="Corporate actions、macro observations、futures continuous data 已納入模型。"
          color={palette.gold}
        />
        <CoverageTile
          title="查詢與管理"
          body="Instruments、EOD、calendar、DQ issue、raw payload 與修正紀錄可透過 API 使用。"
          color={palette.red}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const TrustModel: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0', display: 'grid', gridTemplateColumns: '720px 1fr', gap: 96 }}>
      <div>
        <Eyebrow>Governance model</Eyebrow>
        <PageTitle width={720}>可信任，來自每一層都有留下痕跡。</PageTitle>
        <BodyText width={690}>
          FinDB 不只存結果，也保存來源、批次、品質檢查與人工修正紀錄。這讓資料問題可以被定位、重跑與審計。
        </BodyText>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 38, paddingTop: 20 }}>
        <TrustLayer
          title="Raw layer"
          text="保存原始 payload，支援日後追溯與 rerun。"
          color={palette.blue}
        />
        <TrustLayer
          title="Canonical layer"
          text="長期保存標準化後的 instruments、EOD、macro 與 futures 資料。"
          color={palette.accent}
        />
        <TrustLayer
          title="Registry and audit"
          text="記錄 ingestion run、DQ issue 與 correction，讓修正流程可解釋。"
          color={palette.gold}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const ValueForTeams: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0' }}>
      <Eyebrow>Business value</Eyebrow>
      <PageTitle width={1250}>FinDB 讓資料團隊從反覆整理，轉向穩定供應。</PageTitle>
      <BodyText width={1110}>
        同一份 canonical data 可以被不同消費者重用，減少每個應用各自整理資料、各自處理錯誤的成本。
      </BodyText>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, marginTop: 72 }}>
        <Outcome title="主管與研究報告" text="使用一致的市場資料與宏觀資料，降低人工整理與口徑不一致。" color={palette.blue} />
        <Outcome title="圖表與工具頁" text="透過 Serve API 與 lookup cache 快速查標的、日 K、calendar 與 futures。" color={palette.accent} />
        <Outcome title="AI / RAG 應用" text="提供可追溯、經正規化的資料來源，讓回答與引用更穩定。" color={palette.gold} />
      </div>

      <div
        style={{
          marginTop: 56,
          fontSize: 32,
          lineHeight: 1.45,
          color: palette.text,
          padding: '30px 36px',
          background: palette.greenSoft,
          borderRadius: 'var(--osd-radius)',
          border: `1px solid ${palette.accent}40`,
        }}
      >
        核心價值：把「每次要用資料都重新整理」變成「一次治理，多處使用」。
      </div>
    </main>
    <Footer />
  </Canvas>
);

const NextRoadmap: Page = () => (
  <Canvas>
    <main style={{ position: 'relative', padding: '118px 120px 0', display: 'grid', gridTemplateColumns: '710px 1fr', gap: 90 }}>
      <div>
        <Eyebrow tone="gold">What comes next</Eyebrow>
        <PageTitle width={700}>下一步重點是把已跑通的流程，升級成更穩的營運能力。</PageTitle>
        <BodyText width={690}>
          現階段主流程已可展示與使用；後續投資應聚焦在大量資料、維運可觀測性與更多市場驗證。
        </BodyText>
        <div style={{ display: 'flex', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
          <Pill>已交付主路徑</Pill>
          <Pill color={palette.gold}>擴展中</Pill>
        </div>
      </div>

      <div style={{ paddingTop: 6 }}>
        <NextStep
          phase="Priority 1"
          title="拆出 worker / queue"
          text="避免大量 normalize 任務與 API process 互相影響，提升批次處理穩定度。"
          color={palette.accent}
        />
        <NextStep
          phase="Priority 2"
          title="補強效能與索引"
          text="針對 bulk upsert、pagination 與查詢模式建立壓測基線。"
          color={palette.blue}
        />
        <NextStep
          phase="Priority 3"
          title="擴充市場驗證"
          text="補齊 TW / HK / CN、macro、WTX 的樣本資料、smoke test 與操作文件。"
          color={palette.gold}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

export const meta: SlideMeta = {
  title: 'FinDB Overview',
  createdAt: '2026-07-06T12:46:34.002Z',
};

export default [Cover, WhyItMatters, HowItWorks, Coverage, TrustModel, ValueForTeams, NextRoadmap] satisfies Page[];
