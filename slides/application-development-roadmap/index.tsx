import type { CSSProperties, ReactNode } from "react";
import type { DesignSystem, Page, SlideMeta, SlideTransition } from "@open-slide/core";
import { Step, Steps, useSlidePageNumber } from "@open-slide/core";

export const design: DesignSystem = {
  palette: {
    bg: "#f5f2ea",
    text: "#182026",
    accent: "#0f766e",
  },
  fonts: {
    display:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: {
    hero: 132,
    body: 34,
  },
  radius: 18,
};

const c = {
  bg: "#f5f2ea",
  paper: "#fffaf0",
  ink: "#182026",
  muted: "#68736f",
  line: "#d8d1c3",
  green: "#0f766e",
  greenSoft: "#dcece6",
  gold: "#b7791f",
  goldSoft: "#f3e1bd",
  orange: "#c9793d",
  red: "#a64c42",
  redSoft: "#efd8d3",
  navy: "#294d68",
  navySoft: "#dfe8ee",
  dark: "#101514",
  darkPanel: "#1a201e",
  darkLine: "#3c4641",
  cream: "#f5efe2",
  copper: "#ce8a4b",
};

const fill: CSSProperties = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  position: "relative",
  fontFamily: "var(--osd-font-body)",
};

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

const css = `
  @keyframes adr-orbit { to { transform: rotate(360deg); } }
  @keyframes adr-pulse { 0%, 100% { opacity: .42; } 50% { opacity: .92; } }
  @keyframes adr-scan { 0% { transform: translateX(-110%); opacity: 0; } 18% { opacity: .7; } 100% { transform: translateX(110%); opacity: 0; } }
  .adr-orbit-a { animation: adr-orbit 28s linear infinite; }
  .adr-orbit-b { animation: adr-orbit 19s linear infinite reverse; }
  .adr-pulse { animation: adr-pulse 3.4s ease-in-out infinite; }
  .adr-scan { animation: adr-scan 4.6s ease-in-out infinite; }
`;

const Canvas = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <section
    style={{
      ...fill,
      background: dark
        ? "radial-gradient(circle at 54% 42%, #22251f 0%, #101514 47%, #0b0f0e 100%)"
        : "var(--osd-bg)",
      color: dark ? c.cream : "var(--osd-text)",
    }}
  >
    <style>{css}</style>
    {!dark && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.45,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(24,32,38,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24,32,38,.025) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />
    )}
    {children}
  </section>
);

const Footer = ({ dark = false }: { dark?: boolean }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        right: 110,
        bottom: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 22,
        letterSpacing: "0.12em",
        color: dark ? "#9faaa4" : c.muted,
      }}
    >
      <span>APPLICATION DEVELOPMENT / ROADMAP</span>
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
};

const PageFrame = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <Canvas dark={dark}>
    <div
      style={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        boxSizing: "border-box",
        padding: "96px 110px 104px",
      }}
    >
      {children}
    </div>
    <Footer dark={dark} />
  </Canvas>
);

const Eyebrow = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <div
    style={{
      fontSize: 23,
      fontWeight: 900,
      letterSpacing: "0.16em",
      color: dark ? c.copper : "var(--osd-accent)",
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

const PageTitle = ({
  children,
  dark = false,
  width = 1560,
}: {
  children: ReactNode;
  dark?: boolean;
  width?: number;
}) => (
  <h2
    style={{
      fontFamily: "var(--osd-font-display)",
      fontSize: 72,
      fontWeight: 900,
      lineHeight: 1.16,
      letterSpacing: "-0.035em",
      maxWidth: width,
      margin: 0,
      color: dark ? c.cream : "var(--osd-text)",
    }}
  >
    {children}
  </h2>
);

const Lead = ({
  children,
  dark = false,
  width = 1320,
}: {
  children: ReactNode;
  dark?: boolean;
  width?: number;
}) => (
  <p
    style={{
      fontSize: "var(--osd-size-body)",
      lineHeight: 1.55,
      maxWidth: width,
      margin: "26px 0 0",
      color: dark ? "#adb6b1" : c.muted,
    }}
  >
    {children}
  </p>
);

const Card = ({
  label,
  title,
  text,
  accent = c.green,
  dark = false,
  dashed = false,
  compact = false,
}: {
  label: string;
  title: string;
  text: string;
  accent?: string;
  dark?: boolean;
  dashed?: boolean;
  compact?: boolean;
}) => (
  <div
    style={{
      minHeight: compact ? 196 : 230,
      padding: compact ? "24px 30px" : "34px 36px",
      boxSizing: "border-box",
      border: dashed
        ? `2px dashed ${dark ? c.darkLine : c.line}`
        : `1px solid ${dark ? c.darkLine : c.line}`,
      borderTop: `7px solid ${accent}`,
      borderRadius: "var(--osd-radius)",
      background: dark ? "rgba(26,32,30,.88)" : "rgba(255,250,240,.86)",
      boxShadow: dark ? "0 20px 50px rgba(0,0,0,.22)" : "0 18px 45px rgba(40,45,40,.07)",
    }}
  >
    <div style={{ fontSize: 21, fontWeight: 900, letterSpacing: "0.12em", color: accent }}>
      {label}
    </div>
    <div
      style={{
        fontSize: compact ? 36 : 42,
        fontWeight: 900,
        marginTop: compact ? 12 : 18,
        color: dark ? c.cream : c.ink,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: compact ? 26 : 28,
        lineHeight: 1.48,
        color: dark ? "#aeb8b2" : c.muted,
        marginTop: compact ? 8 : 16,
      }}
    >
      {text}
    </div>
  </div>
);

const Pill = ({
  children,
  active = false,
  dark = false,
}: {
  children: ReactNode;
  active?: boolean;
  dark?: boolean;
}) => (
  <div
    style={{
      padding: "14px 23px",
      borderRadius: 999,
      border: `1px solid ${active ? (dark ? c.copper : c.green) : dark ? c.darkLine : c.line}`,
      background: active ? (dark ? "rgba(206,138,75,.15)" : c.greenSoft) : "transparent",
      color: active ? (dark ? c.copper : c.green) : dark ? "#aeb8b2" : c.muted,
      fontSize: 24,
      fontWeight: 800,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const FlowNode = ({
  number,
  title,
  text,
  accent = c.green,
  dark = false,
}: {
  number: string;
  title: string;
  text: string;
  accent?: string;
  dark?: boolean;
}) => (
  <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        fontSize: 24,
        fontWeight: 900,
        color: dark ? c.dark : c.paper,
        background: accent,
      }}
    >
      {number}
    </div>
    <div style={{ fontSize: 34, fontWeight: 900, marginTop: 24, color: dark ? c.cream : c.ink }}>
      {title}
    </div>
    <div
      style={{ fontSize: 26, lineHeight: 1.48, color: dark ? "#aeb8b2" : c.muted, marginTop: 12 }}
    >
      {text}
    </div>
  </div>
);

const Arrow = ({ dark = false }: { dark?: boolean }) => (
  <div
    style={{
      width: 54,
      paddingTop: 20,
      fontSize: 40,
      color: dark ? c.copper : c.gold,
      textAlign: "center",
    }}
  >
    →
  </div>
);

const Orbital = ({ size = 620 }: { size?: number }) => (
  <div style={{ width: size, height: size, position: "relative" }}>
    <div
      style={{
        position: "absolute",
        inset: size * 0.12,
        borderRadius: 999,
        background:
          "radial-gradient(circle, rgba(245,239,226,.15) 0%, rgba(206,138,75,.08) 34%, transparent 68%)",
        boxShadow: "0 0 80px rgba(206,138,75,.18)",
      }}
    />
    <div
      className="adr-orbit-a"
      style={{
        position: "absolute",
        inset: size * 0.18,
        borderRadius: "50%",
        border: `2px solid ${c.copper}`,
        transform: "rotate(18deg)",
        boxShadow: "0 0 24px rgba(206,138,75,.18)",
      }}
    />
    <div
      className="adr-orbit-b"
      style={{
        position: "absolute",
        left: size * 0.12,
        right: size * 0.12,
        top: size * 0.31,
        bottom: size * 0.31,
        borderRadius: "50%",
        border: "2px solid rgba(245,239,226,.7)",
        transform: "rotate(-28deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: size * 0.24,
        right: size * 0.24,
        top: size * 0.12,
        bottom: size * 0.12,
        borderRadius: "50%",
        border: "1px dashed rgba(206,138,75,.55)",
        transform: "rotate(38deg)",
      }}
    />
    <div
      className="adr-pulse"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: c.cream,
        boxShadow: "0 0 30px rgba(245,239,226,.9)",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

const Cover: Page = () => (
  <Canvas>
    <div style={{ position: "absolute", right: 100, top: 90, opacity: 0.95 }}>
      <div
        style={{
          width: 650,
          height: 650,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(15,118,110,.24), rgba(15,118,110,.06) 45%, transparent 70%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 90,
            borderRadius: "50%",
            border: `2px solid ${c.green}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "205px 30px",
            borderRadius: "50%",
            border: `2px solid ${c.gold}`,
            transform: "rotate(28deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "58px 220px",
            borderRadius: "50%",
            border: `1px dashed ${c.green}`,
            transform: "rotate(-18deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 298,
            borderRadius: "50%",
            background: c.ink,
            boxShadow: `0 0 0 18px ${c.goldSoft}`,
          }}
        />
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 1, padding: "126px 110px", width: 1150 }}>
      <Eyebrow>APPLICATION DEVELOPMENT / STRATEGY 2026</Eyebrow>
      <h1
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: "var(--osd-size-hero)",
          fontWeight: 950,
          lineHeight: 1.02,
          letterSpacing: "-0.055em",
          margin: "38px 0 34px",
          color: "var(--osd-text)",
        }}
      >
        應用開發部門
        <br />
        產品版圖與計畫
      </h1>
      <p style={{ fontSize: "46px", lineHeight: 1.5, color: c.muted, margin: 0 }}>
        短、中、長期規劃
      </p>
      <div style={{ display: "flex", gap: 18, marginTop: 64 }}>
        <Pill active>30 DAYS</Pill>
        <Pill>90 DAYS</Pill>
        <Pill>365 DAYS</Pill>
      </div>
    </div>
  </Canvas>
);

const Decision: Page = () => (
  <PageFrame>
    <Eyebrow>THE DECISION</Eyebrow>
    <PageTitle>核准第四產品，不增加編制。</PageTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 64, marginTop: 58 }}>
      <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: 34 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: c.green, letterSpacing: ".12em" }}>
          CURRENT TEAM / 4
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 30 }}>
          <div
            style={{
              width: 196,
              height: 196,
              borderRadius: "50%",
              background: c.ink,
              color: c.paper,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1.35,
            }}
          >
            資深工程師
            <br />
            兼任 PM
          </div>
          <div style={{ fontSize: 44, color: c.gold }}>→</div>
          <div style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: c.greenSoft,
                color: c.green,
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              ENG 1
            </div>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: c.goldSoft,
                color: c.gold,
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              ENG 2
            </div>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: c.navySoft,
                color: c.navy,
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              ENG 3
            </div>
          </div>
        </div>
        <Lead width={790}>以產品優先級管理容量，而非用新增人力交換速度。</Lead>
      </div>
      <div
        style={{
          background: c.ink,
          color: c.paper,
          borderRadius: 26,
          padding: "42px 48px",
          minHeight: 392,
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: c.copper, fontSize: 23, fontWeight: 900, letterSpacing: ".13em" }}>
          APPROVAL REQUEST
        </div>
        <div style={{ fontSize: 58, lineHeight: 1.16, fontWeight: 900, marginTop: 26 }}>
          啟動獨立產品
          <br />
          Travis AI
        </div>
        <div
          style={{
            borderTop: "1px solid #4b514d",
            marginTop: 34,
            paddingTop: 28,
            fontSize: 30,
            lineHeight: 1.52,
            color: "#c4cbc7",
          }}
        >
          FInDB 新需求趨緩，釋出的工程容量改投向交易復盤。
        </div>
      </div>
    </div>
  </PageFrame>
);

const InfraModule = ({
  code,
  title,
  text,
  accent,
}: {
  code: string;
  title: string;
  text: string;
  accent: string;
}) => (
  <div
    style={{
      minHeight: 154,
      padding: "22px 24px",
      border: `1px solid ${c.darkLine}`,
      borderRadius: 14,
      background: "rgba(255,255,255,.035)",
      boxSizing: "border-box",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: accent, fontSize: 19, fontWeight: 900, letterSpacing: ".12em" }}>
        {code}
      </span>
      <div style={{ display: "flex", gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: accent }} />
        <span style={{ width: 6, height: 6, borderRadius: 99, background: c.darkLine }} />
        <span style={{ width: 6, height: 6, borderRadius: 99, background: c.darkLine }} />
      </div>
    </div>
    <div style={{ fontSize: 28, fontWeight: 900, color: c.paper, marginTop: 15 }}>{title}</div>
    <div style={{ fontSize: 22, lineHeight: 1.42, color: "#aeb8b2", marginTop: 8 }}>{text}</div>
  </div>
);

const CurrentArchitecture: Page = () => (
  <PageFrame>
    <Eyebrow>CURRENT ARCHITECTURE</Eyebrow>
    <PageTitle>一套基礎建設，支撐所有產品開發。</PageTitle>
    <div style={{ marginTop: 38 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
        <Card
          compact
          label="PRODUCT 01"
          title="AI股票交易機器人"
          text="AI 分析、策略判斷、交易執行與監控。"
          accent={c.green}
        />
        <Card
          compact
          label="PRODUCT 02"
          title="金融晨報"
          text="盤前新聞、重要指標與當日趨勢。"
          accent={c.gold}
        />
        <Card
          compact
          label="RESERVED"
          title="未來發展"
          text="後續產品開發。"
          accent={c.line}
          dashed
        />
      </div>
      <div style={{ height: 34, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "16.67%",
            top: 0,
            bottom: 16,
            borderLeft: `2px solid ${c.line}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 16,
            borderLeft: `2px solid ${c.line}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "83.33%",
            top: 0,
            bottom: 16,
            borderLeft: `2px solid ${c.line}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "16.67%",
            right: "16.67%",
            bottom: 16,
            borderTop: `2px solid ${c.line}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            height: 16,
            borderLeft: `2px solid ${c.green}`,
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          background: c.ink,
          borderRadius: 24,
          color: c.paper,
          padding: "28px 34px 30px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
            <div style={{ fontSize: 47, fontWeight: 950 }}>金融DB</div>
            <div style={{ fontSize: 21, letterSpacing: ".14em", fontWeight: 900, color: c.copper }}>
              共享資料層
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Pill dark active>
              MARKET DATA
            </Pill>
            <Pill dark>RESEARCH</Pill>
            <Pill dark>PLATFORM API</Pill>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 22 }}
        >
          <InfraModule code="INGEST" title="資料接入" text="市場行情與研究來源" accent={c.navy} />
          <InfraModule
            code="GOVERN"
            title="治理標準化"
            text="驗證、清洗與代碼對齊"
            accent={c.green}
          />
          <InfraModule code="SERVE" title="服務介面" text="查詢、API 與資料供應" accent={c.gold} />
          <InfraModule
            code="OPERATE"
            title="維運監控"
            text="品質、告警與可觀測性"
            accent={c.copper}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: c.green,
              boxShadow: `0 0 16px ${c.green}`,
            }}
          />
          <div
            style={{
              height: 2,
              flex: 1,
              background: "linear-gradient(90deg, #294d68, #0f766e, #b7791f, #ce8a4b)",
            }}
          />
          <div style={{ color: "#b8c1bc", fontSize: 21, fontWeight: 800, letterSpacing: ".08em" }}>
            共用資料與研究服務匯流排
          </div>
        </div>
      </div>
    </div>
  </PageFrame>
);

const Findb: Page = () => (
  <PageFrame>
    <Eyebrow>PROJECT / FINDB</Eyebrow>
    <PageTitle>把市場資料，變成可被信任的供應鏈。</PageTitle>
    <Lead>FInDB 不直接面向終端使用者；它決定所有產品能否拿到一致、可追溯、可擴充的市場語境。</Lead>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 22, marginTop: 66 }}>
      <FlowNode number="01" title="收集" text="串接市場原始資料與研究來源。" accent={c.navy} />
      <Arrow />
      <FlowNode number="02" title="治理" text="驗證、清洗、標準化與對齊代碼。" accent={c.green} />
      <Arrow />
      <FlowNode number="03" title="供應" text="以穩定介面 feed 後續服務。" accent={c.gold} />
      <Arrow />
      <FlowNode number="04" title="沉澱" text="累積可重用的資料與研究資產。" accent={c.orange} />
    </div>
    <div
      style={{
        marginTop: 58,
        borderLeft: `8px solid ${c.green}`,
        background: c.greenSoft,
        padding: "25px 34px",
        fontSize: 30,
        fontWeight: 800,
      }}
    >
      現階段：新增需求趨緩，重心轉向資料品質、穩定供應與必要維運。
    </div>
  </PageFrame>
);

const AiStock: Page = () => (
  <PageFrame>
    <Eyebrow>PROJECT / AI-STOCK</Eyebrow>
    <PageTitle>讓 AI 分析走完整條交易工作流。</PageTitle>
    <Lead>從全市場發現候選標的，到策略、執行、監控與通知，判斷不再停在報告裡。</Lead>
    <div style={{ display: "flex", alignItems: "stretch", gap: 18, marginTop: 66 }}>
      <FlowNode number="01" title="發現" text="掃描市場，辨識可解釋候選。" accent={c.navy} />
      <Arrow />
      <FlowNode number="02" title="策略" text="AI 建議進場、風險與節奏。" accent={c.green} />
      <Arrow />
      <FlowNode number="03" title="交易" text="標準批次、條件與執行流程。" accent={c.gold} />
      <Arrow />
      <FlowNode number="04" title="監控" text="追蹤狀態、通知與市場曝險。" accent={c.red} />
    </div>
    <div
      style={{
        position: "absolute",
        right: 110,
        bottom: 112,
        fontSize: 104,
        lineHeight: 1,
        fontWeight: 950,
        color: c.greenSoft,
        letterSpacing: "-.06em",
        zIndex: -1,
      }}
    >
      DISCOVER → EXECUTE
    </div>
  </PageFrame>
);

const DailyInsights: Page = () => (
  <PageFrame>
    <Eyebrow>PROJECT / DAILY-INSIGHTS</Eyebrow>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: ".82fr 1.18fr",
        gap: 80,
        alignItems: "center",
        height: 730,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 170,
            lineHeight: 0.9,
            fontWeight: 950,
            color: c.gold,
            letterSpacing: "-.07em",
          }}
        >
          08:30
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: ".13em",
            color: c.muted,
          }}
        >
          BEFORE THE MARKET OPENS
        </div>
      </div>
      <div>
        <PageTitle width={920}>先看懂今天，再開始交易。</PageTitle>
        <Lead width={880}>每日盤前整合重要新聞與指標，建立該交易日的整體趨勢與關注清單。</Lead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 44 }}>
          <Card label="SIGNAL" title="重要指標" text="快速辨識風險與動能。" accent={c.green} />
          <Card label="CONTEXT" title="盤前新聞" text="保留脈絡，不只看摘要。" accent={c.gold} />
        </div>
      </div>
    </div>
  </PageFrame>
);

const PortfolioStatus: Page = () => (
  <PageFrame>
    <Eyebrow>PORTFOLIO STATUS</Eyebrow>
    <PageTitle>三案進度不變，容量重新流動。</PageTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: 46, marginTop: 62 }}>
      <div style={{ display: "grid", gap: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr 190px",
            alignItems: "center",
            padding: "26px 30px",
            background: c.paper,
            border: `1px solid ${c.line}`,
            borderRadius: 18,
          }}
        >
          <strong style={{ fontSize: 34 }}>FInDB</strong>
          <span style={{ fontSize: 28, color: c.muted }}>需求趨緩，轉入品質與維運節奏</span>
          <Pill active>容量釋出</Pill>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr 190px",
            alignItems: "center",
            padding: "26px 30px",
            background: c.paper,
            border: `1px solid ${c.line}`,
            borderRadius: 18,
          }}
        >
          <strong style={{ fontSize: 34 }}>AI-stock</strong>
          <span style={{ fontSize: 28, color: c.muted }}>完整交易工作流持續推進</span>
          <Pill>進度不變</Pill>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr 190px",
            alignItems: "center",
            padding: "26px 30px",
            background: c.paper,
            border: `1px solid ${c.line}`,
            borderRadius: 18,
          }}
        >
          <strong style={{ fontSize: 34 }}>Daily-insights</strong>
          <span style={{ fontSize: 28, color: c.muted }}>維持每日交付與品質</span>
          <Pill>進度不變</Pill>
        </div>
      </div>
      <div style={{ borderRadius: 24, background: c.green, color: c.paper, padding: "44px 42px" }}>
        <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: ".13em", opacity: 0.74 }}>
          CAPACITY SHIFT
        </div>
        <div style={{ fontSize: 112, lineHeight: 1, fontWeight: 950, marginTop: 28 }}>1</div>
        <div style={{ fontSize: 34, fontWeight: 900, marginTop: 14 }}>名工程師主責新案</div>
        <div style={{ fontSize: 27, lineHeight: 1.5, marginTop: 22, opacity: 0.78 }}>
          同時保留 FInDB 必要維運責任。
        </div>
      </div>
    </div>
  </PageFrame>
);

const MissingLoop: Page = () => (
  <PageFrame>
    <Eyebrow>WHY NOW</Eyebrow>
    <PageTitle>我們完成了交易，卻還沒完成學習。</PageTitle>
    <Lead>資料、洞察與執行已串起來；真正缺少的是交易之後，把經驗轉回下一次決策。</Lead>
    <Steps>
      <Step>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 70 }}>
          <FlowNode number="01" title="資料" text="FInDB 提供可信市場語境。" accent={c.navy} />
          <Arrow />
          <FlowNode number="02" title="洞察" text="Daily-insights 建立今日方向。" accent={c.gold} />
          <Arrow />
          <FlowNode number="03" title="交易" text="AI-stock 推進策略與執行。" accent={c.green} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            marginTop: 54,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 36,
            alignItems: "center",
            background: c.redSoft,
            borderLeft: `8px solid ${c.red}`,
            padding: "30px 38px",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 900 }}>
            成交之後：為什麼贏？為什麼輸？下一次要改什麼？
          </div>
          <div style={{ fontSize: 64, color: c.red, fontWeight: 950 }}>?</div>
        </div>
      </Step>
    </Steps>
  </PageFrame>
);

const TargetAudience: Page = () => (
  <PageFrame>
    <Eyebrow>TARGET AUDIENCE</Eyebrow>
    <PageTitle>第一個服務對象：主動型個人交易者。</PageTitle>
    <div style={{ display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: 58, marginTop: 56 }}>
      <div
        style={{
          background: c.ink,
          borderRadius: 26,
          color: c.paper,
          padding: "42px 42px",
          minHeight: 500,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: c.goldSoft,
            color: c.gold,
            fontSize: 52,
            fontWeight: 950,
          }}
        >
          TA
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, marginTop: 30 }}>有方法，卻難以持續修正</div>
        <div style={{ fontSize: 28, lineHeight: 1.52, color: "#bdc5c1", marginTop: 22 }}>
          交易頻率高、資料分散，知道該復盤，卻缺乏低摩擦的工具與證據。
        </div>
      </div>
      <div style={{ display: "grid", gap: 18 }}>
        <Card
          compact
          label="FRICTION 01"
          title="紀錄散落"
          text="交易、筆記、新聞與策略無法對齊。"
          accent={c.navy}
        />
        <Card
          compact
          label="FRICTION 02"
          title="偏誤難見"
          text="靠印象解釋結果，容易重複同樣錯誤。"
          accent={c.red}
        />
        <Card
          compact
          label="FRICTION 03"
          title="無法重現"
          text="缺少回測與來源證據，改善難以驗證。"
          accent={c.gold}
        />
      </div>
    </div>
  </PageFrame>
);

const TravisReveal: Page = () => (
  <Canvas dark>
    <div style={{ position: "absolute", right: 80, top: 70 }}>
      <Orbital size={820} />
    </div>
    <div style={{ position: "relative", zIndex: 2, padding: "120px 110px", width: 1040 }}>
      <Eyebrow dark>PROPOSAL / NEW PRODUCT</Eyebrow>
      <div
        style={{
          fontSize: 24,
          letterSpacing: ".28em",
          fontWeight: 900,
          color: c.cream,
          marginTop: 54,
        }}
      >
        TRAVIS AI
      </div>
      <h2
        style={{
          fontSize: 132,
          lineHeight: 1.02,
          letterSpacing: "-.055em",
          fontWeight: 950,
          margin: "28px 0 34px",
        }}
      >
        把每次交易，
        <br />
        變成下一次優勢。
      </h2>
      <p style={{ fontSize: 38, lineHeight: 1.5, color: "#aeb8b2", margin: 0 }}>
        互動式交易復盤 × Trading Assistant
      </p>
      <div style={{ display: "flex", gap: 14, marginTop: 58 }}>
        <Pill dark active>
          對話復盤
        </Pill>
        <Pill dark>SERVER 回測</Pill>
        <Pill dark>可解釋建議</Pill>
      </div>
    </div>
  </Canvas>
);

const DemoFlow: Page = () => (
  <PageFrame dark>
    <Eyebrow dark>DEMO / MAIN FLOW</Eyebrow>
    <PageTitle dark>在對話裡完成復盤，在伺服器上驗證假設。</PageTitle>
    <Lead dark>使用者不必先整理成報告；Travis 透過追問建立情境，再把可驗證的假設送進回測。</Lead>
    <Steps>
      <Step>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 66 }}>
          <FlowNode
            dark
            number="01"
            title="匯入情境"
            text="交易紀錄、想法與市場背景。"
            accent={c.copper}
          />
          <Arrow dark />
          <FlowNode
            dark
            number="02"
            title="對話追問"
            text="補足動機、限制與決策條件。"
            accent={c.cream}
          />
          <Arrow dark />
          <FlowNode
            dark
            number="03"
            title="Server 回測"
            text="驗證策略與相似市場情境。"
            accent={c.copper}
          />
          <Arrow dark />
          <FlowNode
            dark
            number="04"
            title="形成下一步"
            text="回傳證據、偏誤與行動提醒。"
            accent={c.cream}
          />
        </div>
      </Step>
      <Step>
        <div
          style={{
            marginTop: 52,
            border: `1px solid ${c.darkLine}`,
            borderRadius: 18,
            padding: "26px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(26,32,30,.74)",
          }}
        >
          <span style={{ fontSize: 29, color: "#b6bfba" }}>
            輸出不是「你做錯了」，而是「在什麼條件下，這個決策可被改善」。
          </span>
          <Pill dark active>
            EVIDENCE FIRST
          </Pill>
        </div>
      </Step>
    </Steps>
  </PageFrame>
);

const MiniPanel = ({
  title,
  children,
  width,
}: {
  title: string;
  children: ReactNode;
  width?: number;
}) => (
  <div
    style={{
      width,
      border: `1px solid ${c.darkLine}`,
      borderRadius: 18,
      background: "rgba(26,32,30,.94)",
      boxShadow: "0 22px 56px rgba(0,0,0,.28)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        padding: "17px 21px",
        borderBottom: `1px solid ${c.darkLine}`,
        fontSize: 20,
        fontWeight: 900,
        color: c.copper,
        letterSpacing: ".08em",
      }}
    >
      {title}
    </div>
    <div style={{ padding: 22 }}>{children}</div>
  </div>
);

const DemoConcept: Page = () => (
  <PageFrame dark>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Eyebrow dark>DEMO / CONCEPT INTERFACE</Eyebrow>
        <PageTitle dark width={980}>
          一個畫面，串起對話、證據與研究。
        </PageTitle>
      </div>
      <Pill dark active>
        LIVE DEMO READY
      </Pill>
    </div>
    <div style={{ position: "relative", height: 590, marginTop: 34 }}>
      <div style={{ position: "absolute", left: 0, top: 30 }}>
        <MiniPanel title="目前工作階段 / 研究管理員" width={430}>
          <div
            style={{
              padding: 20,
              borderRadius: 14,
              background: "#232a27",
              fontSize: 24,
              color: "#d4d9d6",
            }}
          >
            你：請幫我復盤這筆交易。
          </div>
          <div
            style={{
              padding: 20,
              borderRadius: 14,
              background: "#30271f",
              border: `1px solid #704b2e`,
              fontSize: 24,
              lineHeight: 1.45,
              color: "#e2d7ca",
              marginTop: 16,
            }}
          >
            代理：先確認進場理由與原始風險假設。
          </div>
          <div
            style={{
              marginTop: 62,
              border: `1px solid ${c.darkLine}`,
              borderRadius: 14,
              padding: "18px 20px",
              color: "#8d9892",
              fontSize: 22,
            }}
          >
            輸入訊息　　<span style={{ color: c.copper }}>傳送 ↗</span>
          </div>
        </MiniPanel>
      </div>
      <div style={{ position: "absolute", left: 520, top: -58, opacity: 0.78 }}>
        <Orbital size={530} />
      </div>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <MiniPanel title="研究總覽" width={430}>
          <div style={{ fontSize: 62, lineHeight: 1, fontWeight: 950 }}>76%</div>
          <div style={{ color: "#939f99", fontSize: 20, marginTop: 8 }}>證據涵蓋率</div>
          <div
            style={{
              height: 112,
              marginTop: 20,
              position: "relative",
              borderBottom: `1px solid ${c.darkLine}`,
            }}
          >
            <svg width="370" height="100" viewBox="0 0 370 100" aria-label="coverage trend">
              <polyline
                points="10,78 70,62 130,70 190,42 250,31 330,22"
                fill="none"
                stroke={c.copper}
                strokeWidth="4"
              />
              <circle cx="10" cy="78" r="5" fill={c.copper} />
              <circle cx="70" cy="62" r="5" fill={c.copper} />
              <circle cx="130" cy="70" r="5" fill={c.copper} />
              <circle cx="190" cy="42" r="5" fill={c.copper} />
              <circle cx="250" cy="31" r="5" fill={c.copper} />
              <circle cx="330" cy="22" r="5" fill={c.copper} />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 21,
              color: "#b7c0bb",
              marginTop: 18,
            }}
          >
            <span>來源比較</span>
            <span style={{ color: c.copper }}>可追溯</span>
          </div>
        </MiniPanel>
      </div>
      <div style={{ position: "absolute", left: 480, bottom: 10, display: "flex", gap: 10 }}>
        <Pill dark active>
          工作階段
        </Pill>
        <Pill dark>研究總覽</Pill>
        <Pill dark>來源比較</Pill>
        <Pill dark>研究發現</Pill>
      </div>
    </div>
  </PageFrame>
);

const ProductArchitecture: Page = () => (
  <PageFrame>
    <Eyebrow>PRODUCT ARCHITECTURE</Eyebrow>
    <PageTitle>獨立產品體驗，共用可信市場資料。</PageTitle>
    <div style={{ display: "grid", gridTemplateColumns: ".7fr 1.3fr", gap: 44, marginTop: 54 }}>
      <div style={{ display: "grid", gap: 18 }}>
        <Card
          label="DATA LAYER"
          title="FInDB"
          text="提供市場資料、歷史資料與研究語境。"
          accent={c.green}
        />
        <Card
          label="INPUT"
          title="交易紀錄"
          text="使用者決策、進出場與持倉脈絡。"
          accent={c.navy}
        />
      </div>
      <div style={{ background: c.ink, color: c.paper, borderRadius: 26, padding: "38px 42px" }}>
        <div style={{ fontSize: 23, color: c.copper, fontWeight: 900, letterSpacing: ".12em" }}>
          TRAVIS AI / INDEPENDENT PRODUCT
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 46 }}>
          <FlowNode
            dark
            number="01"
            title="對話層"
            text="理解意圖、補齊決策條件。"
            accent={c.copper}
          />
          <Arrow dark />
          <FlowNode
            dark
            number="02"
            title="回測服務"
            text="執行假設、保存參數與結果。"
            accent={c.cream}
          />
          <Arrow dark />
          <FlowNode
            dark
            number="03"
            title="證據層"
            text="說明結果、來源與可重現性。"
            accent={c.copper}
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          <Pill dark active>
            獨立入口
          </Pill>
          <Pill dark>專屬體驗</Pill>
          <Pill dark>可追溯輸出</Pill>
        </div>
      </div>
    </div>
  </PageFrame>
);

const GoToMarket: Page = () => (
  <PageFrame>
    <Eyebrow>GO TO MARKET</Eyebrow>
    <PageTitle>先驗證復盤會不會被持續使用。</PageTitle>
    <Lead>第一階段不追求公開流量；從既有用戶挑選高意願交易者，建立短而密集的學習循環。</Lead>
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 64 }}>
      <FlowNode number="01" title="邀請" text="從既有產品與社群找高頻交易者。" accent={c.navy} />
      <Arrow />
      <FlowNode number="02" title="封測" text="完成多次復盤與回測對話。" accent={c.green} />
      <Arrow />
      <FlowNode number="03" title="迭代" text="修正摩擦、證據與建議品質。" accent={c.gold} />
      <Arrow />
      <FlowNode number="04" title="決策" text="以真實使用訊號決定擴大發布。" accent={c.orange} />
    </div>
    <div
      style={{
        marginTop: 52,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${c.line}`,
        paddingTop: 30,
      }}
    >
      <span style={{ fontSize: 29, color: c.muted }}>
        先證明「願意再回來復盤」，再討論規模與商業化。
      </span>
      <Pill active>CLOSED BETA FIRST</Pill>
    </div>
  </PageFrame>
);

const Roadmap30: Page = () => (
  <PageFrame>
    <Eyebrow>SHORT TERM / 30 DAYS</Eyebrow>
    <div
      style={{ display: "grid", gridTemplateColumns: ".42fr 1.58fr", gap: 70, alignItems: "start" }}
    >
      <div>
        <div
          style={{
            fontSize: 214,
            lineHeight: 0.9,
            fontWeight: 950,
            color: c.green,
            letterSpacing: "-.08em",
          }}
        >
          30
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: ".15em",
            color: c.muted,
            marginTop: 20,
          }}
        >
          DAYS AFTER APPROVAL
        </div>
      </div>
      <div>
        <PageTitle width={1040}>把可操作 demo，變成可驗證閉環。</PageTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }}>
          <Card
            label="TRAVIS"
            title="穩定主流程"
            text="對話、server 回測與結果解釋打通。"
            accent={c.copper}
          />
          <Card
            label="MEASURE"
            title="建立量測"
            text="定義完成復盤、回測與回訪事件。"
            accent={c.green}
          />
          <Card
            label="USERS"
            title="準備封測"
            text="建立既有用戶名單與訪談節奏。"
            accent={c.navy}
          />
          <Card
            label="FINDB"
            title="穩定維運"
            text="守住供應品質，新增需求採必要優先。"
            accent={c.gold}
          />
        </div>
      </div>
    </div>
  </PageFrame>
);

const Roadmap90: Page = () => (
  <PageFrame>
    <Eyebrow>MID TERM / 90 DAYS</Eyebrow>
    <div
      style={{ display: "grid", gridTemplateColumns: ".42fr 1.58fr", gap: 70, alignItems: "start" }}
    >
      <div>
        <div
          style={{
            fontSize: 214,
            lineHeight: 0.9,
            fontWeight: 950,
            color: c.gold,
            letterSpacing: "-.08em",
          }}
        >
          90
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: ".15em",
            color: c.muted,
            marginTop: 20,
          }}
        >
          DAYS AFTER APPROVAL
        </div>
      </div>
      <div>
        <PageTitle width={1040}>用封閉 Beta，驗證持續復盤。</PageTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }}>
          <Card label="BETA" title="真實使用" text="讓既有用戶完成多輪交易復盤。" accent={c.gold} />
          <Card
            label="RELIABILITY"
            title="回測可重現"
            text="保存參數、版本、來源與結果。"
            accent={c.green}
          />
          <Card
            label="QUALITY"
            title="建議可解釋"
            text="從結論回到證據與決策條件。"
            accent={c.navy}
          />
          <Card
            label="PORTFOLIO"
            title="三案照常"
            text="AI-stock、Daily-insights 持續交付。"
            accent={c.orange}
          />
        </div>
      </div>
    </div>
  </PageFrame>
);

const Roadmap365: Page = () => (
  <PageFrame>
    <Eyebrow>LONG TERM / 365 DAYS</Eyebrow>
    <div
      style={{ display: "grid", gridTemplateColumns: ".42fr 1.58fr", gap: 70, alignItems: "start" }}
    >
      <div>
        <div
          style={{
            fontSize: 196,
            lineHeight: 0.9,
            fontWeight: 950,
            color: c.ink,
            letterSpacing: "-.08em",
          }}
        >
          365
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: ".15em",
            color: c.muted,
            marginTop: 20,
          }}
        >
          DAYS AFTER APPROVAL
        </div>
      </div>
      <div>
        <PageTitle width={1080}>形成資料、洞察、交易、復盤的四產品版圖。</PageTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }}>
          <Card label="01 / DATA" title="FInDB" text="持續供應可信市場資料。" accent={c.navy} />
          <Card
            label="02 / CONTEXT"
            title="Daily-insights"
            text="每天建立市場判讀起點。"
            accent={c.gold}
          />
          <Card
            label="03 / ACTION"
            title="AI-stock"
            text="推進策略、交易與監控。"
            accent={c.green}
          />
          <Card
            label="04 / LEARNING"
            title="Travis AI"
            text="讓每次交易回到可驗證學習。"
            accent={c.copper}
          />
        </div>
      </div>
    </div>
  </PageFrame>
);

const Metric = ({
  label,
  title,
  text,
  accent,
}: {
  label: string;
  title: string;
  text: string;
  accent: string;
}) => (
  <div
    style={{
      padding: "26px 28px",
      borderTop: `6px solid ${accent}`,
      background: c.paper,
      borderRadius: 16,
      boxShadow: "0 14px 36px rgba(40,45,40,.06)",
    }}
  >
    <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: ".12em", color: accent }}>
      {label}
    </div>
    <div style={{ fontSize: 34, fontWeight: 900, marginTop: 14 }}>{title}</div>
    <div style={{ fontSize: 25, lineHeight: 1.45, color: c.muted, marginTop: 10 }}>{text}</div>
  </div>
);

const Close: Page = () => (
  <PageFrame>
    <Eyebrow>SUCCESS FRAMEWORK / CLOSE</Eyebrow>
    <PageTitle>不先承諾漂亮數字，先建立可被驗證的產品。</PageTitle>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 48 }}>
      <Metric label="ACTIVATION" title="啟用" text="完成第一次對話復盤。" accent={c.navy} />
      <Metric label="RELIABILITY" title="可靠度" text="回測完成且可重現。" accent={c.green} />
      <Metric label="ENGAGEMENT" title="回訪" text="願意再次帶交易回來。" accent={c.gold} />
      <Metric label="VALUE" title="決策價值" text="產出可採取的下一步。" accent={c.orange} />
      <Metric label="LEARNING" title="測試完成" text="持續收斂產品假設。" accent={c.red} />
    </div>
    <div
      style={{
        marginTop: 44,
        background: c.ink,
        color: c.paper,
        borderRadius: 22,
        padding: "34px 42px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ color: c.copper, fontSize: 22, fontWeight: 900, letterSpacing: ".12em" }}>
          DECISION
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, marginTop: 10 }}>
          核准 Travis AI 立項與既有容量配置
        </div>
      </div>
      <div style={{ fontSize: 28, color: "#bdc6c1", textAlign: "right", lineHeight: 1.45 }}>
        不新增編制
        <br />
        不降低既有進度
      </div>
    </div>
  </PageFrame>
);

export const meta: SlideMeta = {
  title: "應用開發部門｜產品版圖與 30／90／365 天計畫",
  createdAt: "2026-08-12T09:45:46.913Z",
};

export default [
  Cover,
  CurrentArchitecture,
  Findb,
  AiStock,
  DailyInsights,
  PortfolioStatus,
  MissingLoop,
  TargetAudience,
  TravisReveal,
  DemoFlow,
  DemoConcept,
  Decision,
  ProductArchitecture,
  GoToMarket,
  Roadmap30,
  Roadmap90,
  Roadmap365,
  Close,
] satisfies Page[];
