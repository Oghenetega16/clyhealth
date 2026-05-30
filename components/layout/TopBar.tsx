"use client";
import { AnimatePresence, motion } from "motion/react";
import { Bell, RefreshCw, ShoppingCart, User, Activity } from "lucide-react";
import { useHealthStore } from "@/store/health-store";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const { report, isRefreshing, refreshData, toggleNotifications, notificationsOpen } =
    useHealthStore();

  return (
    <header
      className="relative z-20 flex items-center justify-between px-6 py-3.5 border-b"
      style={{
        background: "color-mix(in oklch, var(--color-surface) 95%, transparent)",
        backdropFilter: "blur(20px)",
        borderColor: "var(--color-border)",
      }}>

      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-cyan))" }}>
          <Activity size={15} className="text-white" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>
          ClyHealth
        </span>
      </div>

      {/* Age chips */}
      <div className="hidden md:flex items-center gap-5">
        <AgeChip label="Biological age" value={report.biologicalAge} color="var(--color-accent-blue)" />
        <div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>↓</div>
        <AgeChip label="Chronological age" value={report.chronologicalAge} color="var(--color-accent-cyan)" />

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: "color-mix(in oklch, var(--color-accent-red) 10%, transparent)", border: "1px solid color-mix(in oklch, var(--color-accent-red) 25%, transparent)" }}>
          <span style={{ fontSize: 11, color: "var(--color-accent-red)", fontWeight: 500 }}>
            Your body is aging{" "}
            <span style={{ fontWeight: 700 }}>{report.agingSpeed} years faster</span>
            {" "}than your chronological age
          </span>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        <IconButton
          onClick={() => refreshData()}
          title="Refresh data"
          active={isRefreshing}>
          <RefreshCw
            size={14}
            className={cn(isRefreshing && "[animation:spin_1s_linear_infinite]")}
            style={{ color: isRefreshing ? "var(--color-accent-blue)" : "var(--color-text-secondary)" }}
          />
        </IconButton>

        <IconButton onClick={toggleNotifications} active={notificationsOpen} badge={3}>
          <Bell size={14} style={{ color: notificationsOpen ? "var(--color-accent-blue)" : "var(--color-text-secondary)" }} />
        </IconButton>

        <IconButton badge={report.cartItems > 0 ? report.cartItems : undefined}>
          <ShoppingCart size={14} style={{ color: "var(--color-text-secondary)" }} />
        </IconButton>

        <button
          aria-label="User button"
          className="w-8 h-8 rounded-full flex cursor-pointer items-center justify-center transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))", border: "2px solid var(--color-border-2)" }}>
          <User size={13} className="text-white" />
        </button>
      </div>

      {/* Notifications panel */}
      <AnimatePresence>
        {notificationsOpen && <NotificationDropdown />}
      </AnimatePresence>
    </header>
  );
}

function AgeChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color, fontFamily: "var(--font-display)" }}>{value}</span>
      <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>yrs</span>
    </div>
  );
}

function IconButton({
  children, onClick, active, badge, title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  badge?: number;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-xl flex items-center justify-center relative transition-all duration-200 hover:scale-105"
      style={{
        background: active
          ? "color-mix(in oklch, var(--color-accent-blue) 15%, transparent)"
          : "var(--color-surface-3)",
        border: `1px solid ${active ? "color-mix(in oklch, var(--color-accent-blue) 40%, transparent)" : "var(--color-border)"}`,
      }}>
      {children}
      {badge !== undefined && (
        <span
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-accent-red)", fontSize: 9, fontWeight: 700, color: "#fff" }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function NotificationDropdown() {
  const notifications = [
    { type: "alert", text: "Inflammation markers elevated above baseline", time: "2h ago" },
    { type: "info", text: "Monthly biological age report is ready", time: "1d ago" },
    { type: "tip", text: "Add Omega-3 to reduce CRP levels", time: "3d ago" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="absolute top-14 right-6 w-72 rounded-2xl shadow-2xl overflow-hidden"
      style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-2)", zIndex: 50 }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)" }}>
          Notifications
        </span>
      </div>
      {notifications.map((n, i) => {
        const dotColor = n.type === "alert" ? "var(--color-accent-red)" : n.type === "tip" ? "var(--color-accent-cyan)" : "var(--color-accent-blue)";
        return (
          <div key={i}
            className="px-4 py-3 flex items-start gap-3 cursor-pointer border-b last:border-0 transition-colors hover:bg-[var(--color-surface-3)]"
            style={{ borderColor: "var(--color-border)" }}>
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: dotColor }} />
            <div>
              <p style={{ fontSize: 12, color: "var(--color-text-primary)", lineHeight: 1.4 }}>{n.text}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{n.time}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
