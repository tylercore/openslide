import type { CSSProperties, ReactNode } from "react";
import type { DesignSystem, Page, SlideMeta, SlideTransition } from "@open-slide/core";
import { useSlidePageNumber } from "@open-slide/core";

import dashboard from "./assets/dashboard.png";
import researchPlatformRun from "./assets/research-platform-run.png";
import researchResultRun from "./assets/research-result-run.png";
import latestHomeDashboard from "./assets/latestHomeDashboard.png";

const productFlowVideo = new URL("./assets/product-flow.mp4", import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: "#f4f4f5", text: "#09090b", accent: "#2563eb" },
  fonts: {
    display:
      '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 132, body: 34 },
  radius: 6,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  muted: "#71717a",
  surface: "#ffffff",
  surfaceStrong: "#fafafa",
  border: "#e4e4e7",
  lineStrong: "#a1a1aa",
  black: "#111827",
  blueSoft: "#dbeafe",
  indigoSoft: "#e0e7ff",
  emerald: "#10b981",
  emeraldSoft: "#d1fae5",
  amber: "#f59e0b",
  amberSoft: "#fef3c7",
  red: "#ef4444",
  redSoft: "#fee2e2",
  slateSoft: "#f1f5f9",
};

const fill = {
  width: "100%",
  height: "100%",
  background: "var(--osd-bg)",
  color: "var(--osd-text)",
  fontFamily: "var(--osd-font-body)",
  position: "relative",
  overflow: "hidden",
  letterSpacing: 0,
} as const;

const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-4px)" },
    ],
  },
  enter: {
    duration: 220,
    delay: 70,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
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

const Canvas = ({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "ink" }) => (
  <section
    style={{
      ...fill,
      background:
        tone === "ink"
          ? "linear-gradient(135deg, #09090b 0%, #111827 58%, #1d4ed8 140%)"
          : "var(--osd-bg)",
      color: tone === "ink" ? "#f8fafc" : "var(--osd-text)",
    }}
  >
    <StyleTag />
    {tone === "light" && <GridBackground />}
    {children}
  </section>
);

const GridBackground = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "linear-gradient(rgba(9,9,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,11,0.035) 1px, transparent 1px)",
      backgroundSize: "64px 64px",
      opacity: 0.72,
      pointerEvents: "none",
    }}
  />
);

const Eyebrow = ({
  children,
  color = "var(--osd-accent)",
}: {
  children: ReactNode;
  color?: string;
}) => (
  <div
    style={{
      fontSize: 23,
      fontWeight: 900,
      color,
      textTransform: "uppercase",
      letterSpacing: 0,
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

const PageTitle = ({
  children,
  width = 1180,
  nowrap = false,
}: {
  children: ReactNode;
  width?: number;
  nowrap?: boolean;
}) => (
  <h2
    style={{
      fontFamily: "var(--osd-font-display)",
      fontSize: 74,
      lineHeight: 1.1,
      fontWeight: 900,
      maxWidth: width,
      margin: 0,
      letterSpacing: 0,
      whiteSpace: nowrap ? "nowrap" : undefined,
    }}
  >
    {children}
  </h2>
);

const BodyText = ({ children, width = 1040 }: { children: ReactNode; width?: number }) => (
  <p
    style={{
      fontSize: "var(--osd-size-body)",
      lineHeight: 1.48,
      color: palette.muted,
      maxWidth: width,
      margin: "30px 0 0",
      letterSpacing: 0,
    }}
  >
    {children}
  </p>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 48,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: 22,
        color: palette.muted,
        borderTop: `1px solid ${palette.border}`,
        paddingTop: 20,
        fontWeight: 650,
      }}
    >
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
};

const Screen = ({
  src,
  alt,
  style,
  className,
  fit = "cover",
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
  fit?: CSSProperties["objectFit"];
}) => (
  <div
    className={className}
    style={{
      borderRadius: "var(--osd-radius)",
      border: `1px solid ${palette.border}`,
      background: palette.surface,
      boxShadow: "0 30px 80px rgba(15, 23, 42, 0.14)",
      overflow: "hidden",
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{ display: "block", width: "100%", height: "100%", objectFit: fit }}
    />
  </div>
);

const Pill = ({ children, color = palette.accent }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      height: 48,
      padding: "0 20px",
      borderRadius: 6,
      border: `1px solid ${color}55`,
      background: `${color}14`,
      color,
      fontSize: 23,
      fontWeight: 900,
      whiteSpace: "nowrap",
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
      borderRadius: "var(--osd-radius)",
      padding: 30,
      minHeight: 172,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
      borderRadius: "var(--osd-radius)",
      padding: 34,
      minHeight: 240,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
      borderRadius: "var(--osd-radius)",
      padding: "30px 32px",
      minHeight: 208,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
      background: active ? "#ffffff" : palette.surfaceStrong,
      borderRadius: "var(--osd-radius)",
      padding: "22px 24px",
      minHeight: 116,
      display: "flex",
      justifyContent: "space-between",
      gap: 20,
    }}
  >
    <div>
      <div
        style={{
          fontSize: 32,
          lineHeight: 1,
          fontWeight: 950,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        {symbol}
      </div>
      <div style={{ fontSize: 23, fontWeight: 800, color: palette.text, marginTop: 10 }}>
        {name}
      </div>
      <div style={{ fontSize: 18, color: palette.muted, marginTop: 10, fontWeight: 850 }}>
        {type}
      </div>
    </div>
    <div
      style={{
        alignSelf: "flex-start",
        border: `1px solid ${active ? palette.accent : palette.lineStrong}`,
        color: active ? palette.accent : palette.muted,
        borderRadius: 6,
        padding: "8px 10px",
        fontSize: 18,
        fontWeight: 900,
        whiteSpace: "nowrap",
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
      borderRadius: "var(--osd-radius)",
      padding: "18px 20px",
    }}
  >
    <div style={{ fontSize: 18, color: palette.muted, fontWeight: 800 }}>{label}</div>
    <div style={{ fontSize: 28, marginTop: 8, color: palette.text, fontWeight: 950 }}>{value}</div>
  </div>
);

const ResearchLayer = ({ title, text, color }: { title: string; text: string; color: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "86px 1fr",
      gap: 26,
      alignItems: "start",
    }}
  >
    <div
      style={{
        width: 62,
        height: 62,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        background: `${color}22`,
      }}
    />
    <div>
      <div style={{ fontSize: 34, fontWeight: 950, color }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.42, color: palette.muted, marginTop: 10 }}>
        {text}
      </div>
    </div>
  </div>
);

const ResearchFlowStep = ({
  index,
  title,
  text,
  color,
  minHeight = 112,
}: {
  index: string;
  title: string;
  text: string;
  color: string;
  minHeight?: number;
}) => (
  <div
    style={{
      position: "relative",
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderTop: `5px solid ${color}`,
      borderRadius: "var(--osd-radius)",
      padding: "20px 22px 20px 82px",
      minHeight,
      boxShadow: "0 18px 44px rgba(15,23,42,.08)",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 22,
        top: 20,
        width: 44,
        height: 44,
        borderRadius: 6,
        background: `${color}18`,
        border: `1px solid ${color}55`,
        color,
        display: "grid",
        placeItems: "center",
        fontSize: 20,
        fontWeight: 950,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {index}
    </div>
    <div style={{ fontSize: 28, fontWeight: 950, color: palette.text }}>{title}</div>
    <div style={{ fontSize: 21, lineHeight: 1.32, color: palette.muted, marginTop: 8 }}>{text}</div>
  </div>
);

const FlowArrow = ({ color = palette.lineStrong }: { color?: string }) => (
  <div
    style={{
      height: 24,
      display: "grid",
      placeItems: "center",
      color,
      fontSize: 26,
      fontWeight: 950,
      lineHeight: 1,
    }}
  >
    ↓
  </div>
);

const ResultStat = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div
    style={{
      background: `${color}12`,
      border: `1px solid ${color}40`,
      borderRadius: "var(--osd-radius)",
      padding: "16px 18px",
      minHeight: 88,
    }}
  >
    <div style={{ fontSize: 19, color, fontWeight: 900 }}>{label}</div>
    <div
      style={{ fontSize: 34, lineHeight: 1, color: palette.text, fontWeight: 950, marginTop: 10 }}
    >
      {value}
    </div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 6 }}>標的數</div>
  </div>
);

const TopSymbolRow = ({
  symbol,
  grade,
  score,
  samples,
}: {
  symbol: string;
  grade: string;
  score: string;
  samples: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "96px 96px 1fr 96px",
      alignItems: "center",
      gap: 16,
      borderBottom: `1px solid ${palette.border}`,
      padding: "10px 0",
      fontSize: 20,
      fontWeight: 850,
    }}
  >
    <div
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        color: palette.text,
        fontWeight: 950,
      }}
    >
      {symbol}
    </div>
    <div
      style={{
        justifySelf: "start",
        borderRadius: 6,
        padding: "6px 12px",
        color: palette.emerald,
        background: palette.emeraldSoft,
        fontSize: 16,
        fontWeight: 950,
      }}
    >
      {grade}
    </div>
    <div style={{ color: palette.muted }}>分數 {score}</div>
    <div style={{ color: palette.muted, textAlign: "right" }}>{samples}</div>
  </div>
);

const ProductVideo = () => (
  <video
    src={productFlowVideo}
    controls
    playsInline
    preload="metadata"
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      background: "#09090b",
    }}
  />
);

const Cover: Page = () => (
  <Canvas>
    <Screen
      src={dashboard}
      alt="持倉與監控儀表板"
      className="as-drift"
      style={{
        position: "absolute",
        right: -76,
        top: 132,
        width: 1040,
        height: 585,
        opacity: 0.92,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, #f4f4f5 0%, #f4f4f5 50%, rgba(244,244,245,.74) 76%, rgba(244,244,245,.18) 100%)",
      }}
    />
    <main style={{ position: "relative", padding: "142px 120px 0" }}>
      <Eyebrow>AI stock trading workbench</Eyebrow>
      <h1
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: "var(--osd-size-hero)",
          lineHeight: 1.03,
          fontWeight: 950,
          maxWidth: 900,
          margin: 0,
          letterSpacing: 0,
        }}
      >
        廷豐 AI 股票交易機器人
      </h1>
      <BodyText width={760}>
        桌面版交易意圖、到價通知與 AI 智能推薦工作台，把研究判斷、提醒建立與監控通知放在同一個流程。
      </BodyText>
      <div style={{ display: "flex", gap: 16, marginTop: 54, flexWrap: "wrap" }}>
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
    <main style={{ position: "relative", padding: "116px 120px 0" }}>
      <Eyebrow>產品邊界</Eyebrow>
      <PageTitle width={1260}>交易意圖標準化，即時監控與通知</PageTitle>
      <BodyText width={1120}>AI智能監控與即時通知</BodyText>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginTop: 70 }}>
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
    <main style={{ position: "relative", padding: "74px 120px 0" }}>
      <div style={{ position: "relative", marginBottom: 28 }}>
        <Eyebrow>主要介面</Eyebrow>
        <PageTitle width={980}>持倉與監控儀表板</PageTitle>
      </div>
      <div
        style={{
          position: "relative",
          width: 1500,
          aspectRatio: "1812 / 899",
          margin: "0 auto",
          borderRadius: "var(--osd-radius)",
          overflow: "hidden",
          border: `1px solid ${palette.border}`,
          boxShadow: "0 32px 90px rgba(15,23,42,.16)",
          background: palette.surface,
        }}
      >
        <img
          src={latestHomeDashboard}
          alt="首頁持倉與監控儀表板"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const HomeDashboardDetail: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "104px 120px 0" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "980px 1fr", gap: 64, alignItems: "end" }}
      >
        <div>
          <Eyebrow>首頁說明</Eyebrow>
          <PageTitle width={980}>讓交易狀態先被看見，再進入下一步。</PageTitle>
          <BodyText width={900}>
            首頁把資產水位、監控狀態與通知訊號放在同一個視野，讓使用者先掌握全局，再決定要深入哪一條流程。
          </BodyText>
        </div>

        <Screen
          src={latestHomeDashboard}
          alt="首頁狀態摘要"
          fit="contain"
          style={{
            height: 304,
            boxShadow: "0 20px 58px rgba(15,23,42,.12)",
            background: palette.surfaceStrong,
          }}
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26, marginTop: 62 }}
      >
        <FeatureCard
          title="資產水位"
          text="持倉部位、持倉市值與監控數並列呈現，讓資產規模與市場曝險成為第一眼的判斷基準。"
          color={palette.accent}
          background={palette.blueSoft}
        />
        <FeatureCard
          title="監控節奏"
          text="Active Monitors 區塊把目前需要注意的狀態集中起來，讓監控中的標的與觸發訊號不散落在不同頁面。"
          color={palette.black}
          background={palette.slateSoft}
        />
        <FeatureCard
          title="決策入口"
          text="首頁只保留總覽與前往下一步的入口，讓下單、追蹤與通知流程各自回到更聚焦的工作區。"
          color={palette.emerald}
          background={palette.emeraldSoft}
        />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const VideoPage: Page = () => (
  <Canvas tone="ink">
    <div style={{ position: "absolute", left: 88, right: 88, top: 72, bottom: 98 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "var(--osd-radius)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.14)",
          boxShadow: "0 32px 120px rgba(0,0,0,.38)",
          background: "#09090b",
        }}
      >
        <ProductVideo />
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 122,
        top: 108,
        padding: "16px 22px",
        borderRadius: 6,
        background: "rgba(9,9,11,.82)",
        border: "1px solid rgba(255,255,255,.14)",
        color: "#f8fafc",
        fontSize: 25,
        fontWeight: 900,
      }}
    >
      21 秒產品流程
    </div>
    <Footer />
  </Canvas>
);

const UseCasesAndAudience: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "104px 120px 0" }}>
      <Eyebrow>使用情境與 TA</Eyebrow>
      <PageTitle width={1680} nowrap>
        一個平台，服務兩種不同方向的決策需求
      </PageTitle>
      <BodyText width={1680}>
        產品核心不是單一交易功能，而是把「大量交易的執行效率」與「專業投資的標的發現」放在同一個決策流程。
      </BodyText>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginTop: 64 }}>
        <div
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderTop: `5px solid ${palette.black}`,
            borderRadius: "var(--osd-radius)",
            padding: 42,
            minHeight: 378,
            boxShadow: "0 24px 70px rgba(15,23,42,.10)",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: palette.muted }}>TA 01</div>
          <h3 style={{ fontSize: 46, lineHeight: 1.12, margin: "20px 0 0", fontWeight: 950 }}>
            有大量交易需求的交易者
          </h3>
          <p style={{ fontSize: 28, lineHeight: 1.45, color: palette.muted, margin: "26px 0 0" }}>
            需要把批次下單、TWAP、監控與通知自動化，降低重複操作與盤中錯過條件的風險。
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
            <Pill color={palette.black}>自動化交易</Pill>
            <Pill color={palette.accent}>執行效率</Pill>
          </div>
        </div>

        <div
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderTop: `5px solid ${palette.emerald}`,
            borderRadius: "var(--osd-radius)",
            padding: 42,
            minHeight: 378,
            boxShadow: "0 24px 70px rgba(15,23,42,.10)",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: palette.muted }}>TA 02</div>
          <h3 style={{ fontSize: 46, lineHeight: 1.12, margin: "20px 0 0", fontWeight: 950 }}>
            機構與專業投資經理人
          </h3>
          <p style={{ fontSize: 28, lineHeight: 1.45, color: palette.muted, margin: "26px 0 0" }}>
            需要從全市場快速找出可解釋、可追蹤、可回測的候選標的，作為投組與交易策略的輸入。
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
            <Pill color={palette.emerald}>AI 智能標的</Pill>
            <Pill color={palette.amber}>研究驅動</Pill>
            <Pill color={palette.accent}>投資決策</Pill>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const AiTargetLeadIn: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "112px 120px 0" }}>
      <Eyebrow>AI 智能標的</Eyebrow>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "760px 1fr",
          gap: 74,
          alignItems: "stretch",
          height: 690,
        }}
      >
        <div>
          <PageTitle width={760}>AI Research - 智能標的研究平台。</PageTitle>
          <BodyText width={700}>
            對專業投資人來說，AI
            不能只給一句推薦；它必須把資料、規格、分級與排序留在同一條證據鏈上。
          </BodyText>
        </div>

        <div style={{ display: "grid", alignContent: "space-between", height: "100%" }}>
          <ResearchFlowStep
            index="01"
            title="全市場掃描"
            text="先把完整數據完整放進研究流程，而不是靠人工逐檔挑選。"
            color={palette.accent}
            minHeight={145}
          />
          <ResearchFlowStep
            index="02"
            title="特性分級"
            text="每個標的回傳分數、樣本數與等級，讓候選池能被解釋。"
            color={palette.emerald}
            minHeight={145}
          />
          <ResearchFlowStep
            index="03"
            title="交易銜接"
            text="智能標的回到平台後，才能變成監控、可循環使用的標的。"
            color={palette.black}
            minHeight={145}
          />
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const AiRecommendation: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "76px 120px 0" }}>
      <Eyebrow>AI 股票交易研究流程</Eyebrow>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 64 }}>
        <PageTitle width={980}>先把交易想法變成可重跑的研究規格，再把結果餵回策略。</PageTitle>
        <div
          style={{
            width: 460,
            color: palette.muted,
            fontSize: 25,
            lineHeight: 1.45,
            fontWeight: 750,
            paddingBottom: 6,
          }}
        >
          研究平台以固定模板完成全市場掃描，讓交易候選池能被重複驗證。
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "610px 1fr",
          gap: 54,
          marginTop: 34,
          alignItems: "start",
        }}
      >
        <div>
          <ResearchFlowStep
            index="01"
            title="市場資料"
            text="S3 Parquet 與台股 universe 先確認可讀，研究不直接依賴人工整理的截圖。"
            color={palette.accent}
          />
          <FlowArrow color={palette.accent} />
          <ResearchFlowStep
            index="02"
            title="研究技能"
            text="平台技能與特性模板固定版本，讓同一套規則能被 agent 重複下載、驗證與執行。"
            color={palette.emerald}
          />
          <FlowArrow color={palette.emerald} />
          <ResearchFlowStep
            index="03"
            title="Research Spec"
            text="交易假設寫成 JSON 規格，先過結構與語意驗證，再送出非同步研究執行。"
            color={palette.amber}
          />
          <FlowArrow color={palette.amber} />
          <ResearchFlowStep
            index="04"
            title="結果分級"
            text="每個標的回傳分數、樣本數與 strong / moderate / weak 等級，成為 AI 推薦的依據。"
            color={palette.black}
          />
        </div>

        <div>
          <Screen
            src={researchPlatformRun}
            alt="internal-research 平台首頁與 run 列表截圖"
            fit="cover"
            style={{ height: 420, borderTop: `5px solid ${palette.black}` }}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 22 }}
          >
            <ResearchMetric label="追蹤標的" value="985" />
            <ResearchMetric label="研究模板" value="1.0.1" />
            <ResearchMetric label="執行耗時" value="3 分 12 秒" />
          </div>
          <div
            style={{
              marginTop: 20,
              borderLeft: `5px solid ${palette.accent}`,
              background: palette.blueSoft,
              borderRadius: "var(--osd-radius)",
              padding: "22px 26px",
              color: palette.text,
              fontSize: 25,
              lineHeight: 1.42,
              fontWeight: 750,
            }}
          >
            這一頁的重點是流程可追溯：資料源、技能版本、研究規格、執行紀錄與結果都在同一個工作台裡。
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const ResearchPlatform: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "92px 120px 0" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "650px 1fr", gap: 54, alignItems: "start" }}
      >
        <div
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderTop: `5px solid ${palette.black}`,
            borderRadius: "var(--osd-radius)",
            padding: 30,
            minHeight: 760,
            boxShadow: "0 24px 70px rgba(15,23,42,.10)",
          }}
        >
          <Eyebrow>研究成果</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--osd-font-display)",
              fontSize: 58,
              lineHeight: 1.08,
              fontWeight: 900,
              margin: 0,
              letterSpacing: 0,
            }}
          >
            運行結果進行排行
          </h2>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: palette.muted,
              margin: "18px 0 0",
              fontWeight: 650,
            }}
          >
            將全市場標的分級，作為 AI 股票交易候選池
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 22 }}>
            <ResultStat label="強" value="8" color={palette.emerald} />
            <ResultStat label="中等" value="16" color={palette.accent} />
            <ResultStat label="弱" value="23" color={palette.amber} />
            <ResultStat label="無" value="108" color={palette.lineStrong} />
          </div>

          <div
            style={{
              marginTop: 18,
              background: palette.surfaceStrong,
              border: `1px solid ${palette.border}`,
              borderRadius: "var(--osd-radius)",
              padding: "18px 24px 6px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "96px 96px 1fr 96px",
                gap: 16,
                color: palette.muted,
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              <div>標的</div>
              <div>等級</div>
              <div>分數</div>
              <div style={{ textAlign: "right" }}>樣本</div>
            </div>
            <TopSymbolRow symbol="2207" grade="強" score="0.2886" samples="839" />
            <TopSymbolRow symbol="1216" grade="強" score="0.2552" samples="840" />
            <TopSymbolRow symbol="1235" grade="強" score="0.2017" samples="797" />
          </div>
        </div>

        <div>
          <Screen
            src={researchResultRun}
            alt="特性結果截圖"
            fit="cover"
            style={{ height: 558, borderTop: `5px solid ${palette.emerald}` }}
          />
          <div
            style={{
              marginTop: 22,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <FlowNode
              title="篩選"
              text="先取 strong / moderate 作為交易候選。"
              color={palette.emerald}
            />
            <FlowNode
              title="解釋"
              text="用分數、樣本數與診斷資料確認可信度。"
              color={palette.accent}
            />
            <FlowNode
              title="執行"
              text="回到工作台建立監控、TWAP 或批次下單。"
              color={palette.black}
            />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const Closing: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "118px 120px 0" }}>
      <Eyebrow>流程收束</Eyebrow>
      <PageTitle width={1240}>讓交易決策與執行保持一致且連貫。</PageTitle>
      <BodyText width={1100}>
        AI 研究先把候選標的與建議策略整理出來；交易工作台把這些判斷轉成下單、監控與通知。
      </BodyText>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 76 }}
      >
        <FlowNode
          title="研究"
          text="資料集、特性模板、研究規格與結果分級。"
          color={palette.emerald}
        />
        <FlowNode
          title="策略"
          text="AI 推薦轉成 VWAP、限價、監控時段與風險等級。"
          color={palette.accent}
        />
        <FlowNode
          title="下單"
          text="標準批次、TWAP 與到價條件建立為交易意圖。"
          color={palette.black}
        />
        <FlowNode
          title="通知"
          text="追蹤狀態同步，條件成立後建立站內通知。"
          color={palette.amber}
        />
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
      { opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
    ],
  },
};

export const meta: SlideMeta = {
  title: "廷豐 AI 股票交易",
  createdAt: "2026-07-06T15:22:46.564Z",
};

export default [
  Cover,
  ProductScope,
  HomeDashboardFull,
  HomeDashboardDetail,
  VideoPage,
  AiTargetLeadIn,
  AiRecommendation,
  ResearchPlatform,
  UseCasesAndAudience,
  Closing,
] satisfies Page[];
