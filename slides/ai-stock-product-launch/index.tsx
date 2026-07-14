import type { CSSProperties, ReactNode } from "react";
import type { DesignSystem, Page, SlideMeta, SlideTransition } from "@open-slide/core";
import { useSlidePageNumber } from "@open-slide/core";

export const design: DesignSystem = {
  palette: { bg: "#f5f5f0", text: "#14201e", accent: "#16827a" },
  fonts: {
    display: '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 164, body: 36 },
  radius: 10,
};

const c = {
  bg: "#f5f5f0",
  ink: "#14201e",
  muted: "#667370",
  line: "#d9dfd9",
  white: "#ffffff",
  teal: "#16827a",
  tealSoft: "#dff2ee",
  blue: "#2d6cdf",
  blueSoft: "#e5edff",
  amber: "#b47718",
  amberSoft: "#fff0d5",
  red: "#b5524c",
  redSoft: "#f8e4e1",
  dark: "#24312e",
};

const fill: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  fontFamily: "var(--osd-font-body)",
};

const ease = "cubic-bezier(.2,.7,.2,1)";

const styles = `
  @keyframes launch-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes launch-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
  .launch-rise { opacity: 0; animation: launch-rise .7s ${ease} forwards; }
  .launch-delay-1 { animation-delay: .10s; }
  .launch-delay-2 { animation-delay: .18s; }
  .launch-delay-3 { animation-delay: .26s; }
  .launch-pulse { animation: launch-pulse 3.5s ease-in-out infinite; }
`;

const Canvas = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <section
    style={{
      ...fill,
      background: dark
        ? "linear-gradient(135deg, #14201e 0%, #1b3832 65%, #16827a 145%)"
        : "var(--osd-bg)",
      color: dark ? "#f8fbf8" : "var(--osd-text)",
    }}
  >
    <style>{styles}</style>
    {!dark && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(20,32,30,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(20,32,30,.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    )}
    {children}
  </section>
);

const Eyebrow = ({ children, color = c.teal }: { children: ReactNode; color?: string }) => (
  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.14em", color, marginBottom: 22 }}>
    {children}
  </div>
);

const Title = ({ children, width = 1680, size = 76 }: { children: ReactNode; width?: number; size?: number }) => (
  <h2
    style={{
      fontFamily: "var(--osd-font-display)",
      fontSize: size,
      lineHeight: 1.12,
      fontWeight: 950,
      maxWidth: width,
      margin: 0,
      letterSpacing: "-0.035em",
    }}
  >
    {children}
  </h2>
);

const Body = ({ children, width = 1680, color = c.muted }: { children: ReactNode; width?: number; color?: string }) => (
  <p style={{ maxWidth: width, margin: "26px 0 0", fontSize: "var(--osd-size-body)", lineHeight: 1.5, color }}>
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
        bottom: 42,
        paddingTop: 18,
        borderTop: "1px solid rgba(20,32,30,.16)",
        display: "flex",
        justifyContent: "space-between",
        color: c.muted,
        fontSize: 21,
        fontWeight: 700,
      }}
    >
      <span>AI STOCK / PRODUCT LAUNCH PLAN</span>
      <span>{String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
  );
};

const Chip = ({ children, color = c.teal, background = c.tealSoft }: { children: ReactNode; color?: string; background?: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      minHeight: 42,
      padding: "0 16px",
      borderRadius: 7,
      background,
      color,
      fontSize: 21,
      fontWeight: 900,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const Card = ({ title, text, color = c.teal, background = c.white, children }: { title: string; text?: string; color?: string; background?: string; children?: ReactNode }) => (
  <div
    style={{
      border: `1px solid ${c.line}`,
      borderTop: `5px solid ${color}`,
      borderRadius: "var(--osd-radius)",
      background,
      padding: 28,
      minHeight: 196,
      boxShadow: "0 20px 55px rgba(20,32,30,.06)",
    }}
  >
    <div style={{ fontSize: 29, fontWeight: 950, color: c.ink }}>{title}</div>
    {text && <div style={{ marginTop: 16, color: c.muted, fontSize: 25, lineHeight: 1.45 }}>{text}</div>}
    {children}
  </div>
);

const Step = ({ number, title, text, color = c.teal }: { number: string; title: string; text: string; color?: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 20, alignItems: "start" }}>
    <div style={{ width: 56, height: 56, borderRadius: "50%", background: color, color: c.white, display: "grid", placeItems: "center", fontSize: 22, fontWeight: 950 }}>{number}</div>
    <div>
      <div style={{ fontSize: 29, fontWeight: 950 }}>{title}</div>
      <div style={{ marginTop: 8, color: c.muted, fontSize: 23, lineHeight: 1.42 }}>{text}</div>
    </div>
  </div>
);

const ScopeItem = ({ children, included = true }: { children: ReactNode; included?: boolean }) => (
  <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 27, fontWeight: 750, color: included ? undefined : "#c4d0cc" }}>
    <span style={{ color: included ? "#84d6ca" : "#e8b875", fontSize: 28 }}>{included ? "＋" : "－"}</span>
    {children}
  </div>
);

const DemoLine = ({ number, children, active = false }: { number: string; children: ReactNode; active?: boolean }) => (
  <div style={{ display: "grid", gridTemplateColumns: "68px 1fr", gap: 18, alignItems: "center", padding: "18px 22px", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8, background: active ? "rgba(132,214,202,.16)" : "rgba(255,255,255,.06)" }}>
    <span style={{ color: "#84d6ca", fontSize: 24, fontWeight: 950 }}>{number}</span>
    <span style={{ fontSize: 30, fontWeight: 850 }}>{children}</span>
  </div>
);

const ProgressLabel = ({ label, complete = false }: { label: string; complete?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
    <div style={{ flex: 1, height: 8, background: complete ? c.teal : c.line, borderRadius: 99 }} />
    <span style={{ fontSize: 22, fontWeight: 900, color: complete ? c.teal : c.muted }}>{label}</span>
  </div>
);

const Cover: Page = () => (
  <Canvas dark>
    <div style={{ position: "absolute", right: -90, top: -150, width: 720, height: 720, border: "1px solid rgba(255,255,255,.18)", borderRadius: "50%" }} />
    <div style={{ position: "absolute", right: 170, top: 110, width: 310, height: 310, border: "1px solid rgba(255,255,255,.18)", borderRadius: "50%" }} />
    <main style={{ position: "relative", padding: "148px 120px 0" }}>
      <div className="launch-rise" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.16em", color: "#84d6ca" }}>AI STOCK / PRODUCT LAUNCH PLAN</div>
      <h1 className="launch-rise launch-delay-1" style={{ margin: "34px 0 0", maxWidth: 1680, fontSize: "var(--osd-size-hero)", lineHeight: 1.05, fontWeight: 950, letterSpacing: "-0.055em" }}>
        從交易機器人<br />重新定義為研究成果平台
      </h1>
      <p className="launch-rise launch-delay-2" style={{ margin: "42px 0 0", maxWidth: 1680, fontSize: 34, lineHeight: 1.5, color: "#b9cbc6" }}>
        以已驗證的標的特性，每日產出可追溯的全市場研究成果，讓機構投資團隊先看懂、再採用。
      </p>
      <div className="launch-rise launch-delay-3" style={{ display: "flex", gap: 14, marginTop: 48 }}>
        <Chip color="#b9eee6" background="rgba(132,214,202,.18)">機構優先</Chip>
        <Chip color="#b9eee6" background="rgba(132,214,202,.18)">每日批次</Chip>
        <Chip color="#b9eee6" background="rgba(132,214,202,.18)">平台呈現</Chip>
      </div>
    </main>
    <div style={{ position: "absolute", left: 120, bottom: 72, color: "#91aaa4", fontSize: 21 }}>產品定位與業務推廣路線｜2026</div>
  </Canvas>
);

const ProductShift: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "104px 120px 0" }}>
      <Eyebrow>01 / PRODUCT SHIFT</Eyebrow>
      <Title>先解決研究效率<br />暫不承擔交易整合</Title>
      <Body>券商串接尚未談定，不應再成為產品進度的前置條件。AI Stock 先聚焦在機構最需要的上游研究成果。</Body>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 1fr", gap: 24, alignItems: "center", marginTop: 64 }}>
        <Card title="原本的模糊想像" text="交易意圖、批次下單、TWAP、監控、通知、AI 推薦全部放在同一條路線。" color={c.red} background={c.redSoft} />
        <div style={{ textAlign: "center", color: c.teal, fontSize: 56, fontWeight: 900 }}>→</div>
        <Card title="重新定義的 V1" text="固定特性、每日研究、結果解釋、平台瀏覽；交易平台作為下游使用。" color={c.teal} background={c.tealSoft} />
      </div>
      <div style={{ marginTop: 44, display: "flex", gap: 14 }}>
        <Chip color={c.red} background={c.redSoft}>暫緩券商串接</Chip>
        <Chip color={c.red} background={c.redSoft}>暫緩自動下單</Chip>
        <Chip color={c.teal} background={c.tealSoft}>先做研究成果</Chip>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const Positioning: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "102px 120px 0" }}>
      <Eyebrow>02 / POSITIONING</Eyebrow>
      <Title>一個標準平台<br />服務投資團隊的候選標的建立</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1.08fr .92fr", gap: 72, marginTop: 62 }}>
        <div>
          <div style={{ fontSize: 25, fontWeight: 900, color: c.muted, letterSpacing: "0.08em" }}>TARGET</div>
          <div style={{ marginTop: 18, fontSize: 50, lineHeight: 1.18, fontWeight: 950 }}>機構投資研究團隊<br />專業投資經理人</div>
          <Body>他們需要從全市場快速找出具備特定特性的候選標的，並能向團隊說明判斷依據。</Body>
        </div>
        <div style={{ borderLeft: `5px solid ${c.teal}`, paddingLeft: 32, alignSelf: "center" }}>
          <div style={{ fontSize: 24, color: c.teal, fontWeight: 900 }}>CORE PROMISE</div>
          <div style={{ marginTop: 18, fontSize: 42, lineHeight: 1.24, fontWeight: 900 }}>用已驗證、可追溯、可重跑的標的特性，縮短建立候選池的時間。</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 66 }}>
        <Card title="可解釋" text="分數、等級、樣本數與限制說明，讓結果不是黑盒。" />
        <Card title="可追溯" text="資料來源、模板版本、研究規格與執行紀錄保留在平台。" color={c.blue} />
        <Card title="可持續" text="每日批次更新，特性庫通過審核後持續新增。" color={c.amber} />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const V1Scope: Page = () => (
  <Canvas dark>
    <main style={{ position: "relative", padding: "98px 120px 0" }}>
      <Eyebrow color="#84d6ca">03 / V1 SCOPE</Eyebrow>
      <Title>V1 只承諾一件事<br />每天把研究成果講清楚</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 56 }}>
        <div style={{ background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 10, padding: 30 }}>
          <div style={{ color: "#84d6ca", fontSize: 22, fontWeight: 900, letterSpacing: "0.12em" }}>KEEP GOING</div>
          <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
            <ScopeItem>已驗證特性模板（持續增加）</ScopeItem>
            <ScopeItem>台股 universe 每日收盤後批次</ScopeItem>
            <ScopeItem>排名／分數／等級／樣本數</ScopeItem>
            <ScopeItem>證據、限制與歷史版本</ScopeItem>
            <ScopeItem>邀請制帳號與一致介面</ScopeItem>
            <ScopeItem>平台內查看與判讀</ScopeItem>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: 30 }}>
          <div style={{ color: "#e8b875", fontSize: 22, fontWeight: 900, letterSpacing: "0.12em" }}>PENDING</div>
          <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
            <ScopeItem included={false}>券商串接與自動下單</ScopeItem>
            <ScopeItem included={false}>通知與盤中即時監控</ScopeItem>
            <ScopeItem included={false}>客戶自訂任意特性</ScopeItem>
            <ScopeItem included={false}>客戶即時自行執行研究</ScopeItem>
            <ScopeItem included={false}>投資報酬保證或直接建議</ScopeItem>
            <ScopeItem included={false}>首版客製化與完整 API</ScopeItem>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const ResearchGovernance: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "98px 120px 0" }}>
      <Eyebrow>04 / TRUST LAYER</Eyebrow>
      <Title>已驗證不是一句話<br />而是一個上線閘門</Title>
      <Body>每一個新特性都要經過相同審核，才能進入正式特性庫，讓研究品質成為產品可以持續累積的資產。</Body>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, marginTop: 62 }}>
        <Card title="01 資料" text="來源、期間、版本與樣本數清楚。" color={c.blue} background={c.blueSoft} />
        <Card title="02 驗證" text="研究／驗證期間分離，檢查跨期間穩定性。" color={c.amber} background={c.amberSoft} />
        <Card title="03 解釋" text="分數、等級、診斷資料與限制可閱讀。" color={c.teal} background={c.tealSoft} />
        <Card title="04 核准" text="研究與產品負責人核准，建立正式版本。" color={c.dark} background="#e9eeeb" />
      </div>
      <div style={{ marginTop: 48, padding: "22px 28px", background: c.ink, color: "#f8fbf8", borderRadius: 9, fontSize: 28, lineHeight: 1.4, fontWeight: 750 }}>
        對外定位：研究篩選工具，不宣稱必然報酬，也不把歷史結果直接等同未來績效。
      </div>
    </main>
    <Footer />
  </Canvas>
);

const DailyFlow: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "100px 120px 0" }}>
      <Eyebrow>05 / PRODUCT FLOW</Eyebrow>
      <Title>每天一個穩定循環<br />平台只呈現可信結果</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, marginTop: 62 }}>
        <div style={{ display: "grid", gap: 30 }}>
          <Step number="01" title="獨家特性模板" text="定期追蹤，確認特性存續。" />
          <Step number="02" title="每日批次執行" text="收盤後執行，留下資料、模板與研究規格版本。" color={c.blue} />
          <Step number="03" title="結果品質檢查" text="確認批次完成、資料完整，失敗結果不進入展示層。" color={c.amber} />
        </div>
        <div style={{ display: "grid", gap: 30 }}>
          <Step number="04" title="結果工作台" text="查看排名、分數、等級、樣本數、證據與限制。" color={c.teal} />
          <Step number="05" title="歷史版本追蹤" text="比較不同批次與模板版本，讓研究判斷可回看。" color={c.dark} />
          <div style={{ padding: 28, background: c.tealSoft, borderRadius: 9, color: c.ink, fontSize: 30, lineHeight: 1.35, fontWeight: 900 }}>研究成果留在平台內，先建立一致的查看與判讀習慣。</div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const Roadmap: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "94px 120px 0" }}>
      <Eyebrow>06 / 12-WEEK ROADMAP</Eyebrow>
      <Title>先讓研究管線穩定<br />再讓業務可以展示</Title>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, marginTop: 64 }}>
        <Card title="Phase 1" text="第 1–2 週" color={c.amber} background={c.amberSoft}>
          <div style={{ marginTop: 24, fontSize: 25, lineHeight: 1.5, color: c.ink }}>研究資料搜集<br />凍結產品邊界<br />確認 universe 與資料節奏<br />選定 3–5 個特性</div>
        </Card>
        <Card title="Phase 2" text="第 3–5 週" color={c.blue} background={c.blueSoft}>
          <div style={{ marginTop: 24, fontSize: 25, lineHeight: 1.5, color: c.ink }}>獨家特性模板與版本<br />每日批次與重跑<br />結果品質檢查<br />研究紀錄可追溯</div>
        </Card>
        <Card title="Phase 3" text="第 6–12 週" color={c.teal} background={c.tealSoft}>
          <div style={{ marginTop: 24, fontSize: 25, lineHeight: 1.5, color: c.ink }}>標準平台與邀請制帳號<br />最新／歷史結果<br />業務 Demo<br />開放客戶實際使用</div>
        </Card>
      </div>
      <div style={{ marginTop: 54, display: "flex", alignItems: "center", gap: 16 }}>
        <ProgressLabel label="定義" complete />
        <ProgressLabel label="產出" complete />
        <ProgressLabel label="呈現" complete />
        <ProgressLabel label="推廣" />
      </div>
    </main>
    <Footer />
  </Canvas>
);

const DemoAndConversion: Page = () => (
  <Canvas dark>
    <main style={{ position: "relative", padding: "96px 120px 0" }}>
      <Eyebrow color="#84d6ca">07 / SALES MOTION</Eyebrow>
      <Title>用一個標準流程<br />帶客戶進入四週實際使用</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 58, marginTop: 58 }}>
        <div style={{ display: "grid", gap: 20 }}>
          <DemoLine number="01">看：已驗證特性與每日排名。</DemoLine>
          <DemoLine number="02">解：說明分數、證據與限制。</DemoLine>
          <DemoLine number="03">用：邀請客戶進入標準平台。</DemoLine>
          <DemoLine number="04" active>問：搜集使用回饋，優化體驗。</DemoLine>
        </div>
        <div style={{ alignSelf: "center", padding: 30, borderLeft: "5px solid #84d6ca" }}>
          <div style={{ color: "#84d6ca", fontSize: 22, fontWeight: 900, letterSpacing: "0.12em" }}>NEXT STEP</div>
          <div style={{ marginTop: 16, fontSize: 39, lineHeight: 1.25, fontWeight: 900 }}>邀請制帳號<br />4 週使用觀察</div>
          <div style={{ marginTop: 20, color: "#b9cbc6", fontSize: 24, lineHeight: 1.45 }}>先驗證客戶是否持續查看、回看證據，並把研究判斷帶回內部流程。</div>
        </div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

const MetricsAndClose: Page = () => (
  <Canvas>
    <main style={{ position: "relative", padding: "104px 120px 0" }}>
      <Eyebrow>08 / LAUNCH GATE</Eyebrow>
      <Title>上線不是做完所有功能<br />而是有人持續使用</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22, marginTop: 62 }}>
        <Card title="產品穩定" text="每日批次成功、結果可追溯、平台顯示一致。" color={c.blue} background={c.blueSoft} />
        <Card title="客戶使用" text="每週回訪、查看最新與歷史結果、閱讀證據。" color={c.teal} background={c.tealSoft} />
        <Card title="業務推廣" text="標準 Demo 可複製，Demo 後能轉成邀請制帳號。" color={c.amber} background={c.amberSoft} />
      </div>
      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr", gap: 34, alignItems: "center" }}>
        <div style={{ fontSize: 39, lineHeight: 1.35, fontWeight: 900 }}>成效追蹤<br /><span style={{ color: c.teal }}>每週活躍機構數、4 週留存率、研究查看率、頁面留存時長</span></div>
      </div>
    </main>
    <Footer />
  </Canvas>
);

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 140, easing: "cubic-bezier(.4,0,1,1)", keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 240, delay: 60, easing: ease, keyframes: [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }] },
};

export const meta: SlideMeta = {
  title: "AI Stock 產品業務推廣規劃",
  createdAt: "2026-07-14T05:42:33.966Z",
};

export default [Cover, ProductShift, Positioning, V1Scope, ResearchGovernance, DailyFlow, Roadmap, DemoAndConversion, MetricsAndClose] satisfies Page[];
