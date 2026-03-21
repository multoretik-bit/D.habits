import { useApp, Habit } from "@/contexts/AppContext";
import { Check, ArrowUp, ArrowDown } from "lucide-react";
import HabitUnitTracker from "./HabitUnitTracker";

// Flame streak display
export function StreakFlames({ streak }: { streak: number }) {
  if (streak === 0) return null;
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 w-fit">
      <span className="text-[12px]">🔥</span>
      <span className="text-[11px] font-bold text-orange-400">{streak}</span>
    </div>
  );
}

interface HabitRowProps {
  habit: Habit;
  dateStr: string;
}

export default function HabitRow({ habit, dateStr }: HabitRowProps) {
  const { completeHabit, moveHabitUp, moveHabitDown } = useApp();
  const completed = !!(habit.completedDates && habit.completedDates[dateStr]);

  return (
    <div
      className={`w-full flex flex-col rounded-2xl transition-all mb-2 overflow-hidden border
        ${completed
          ? "opacity-60 border-slate-800/40"
          : "border-slate-800/80 shadow-sm"
        }`}
      style={{
        background: completed
          ? "rgba(15,23,42,0.5)"
          : `linear-gradient(135deg, ${habit.color}18 0%, rgba(15,23,42,0.7) 100%)`,
        borderLeft: `3px solid ${habit.color}`,
      }}
    >
      <button
        onClick={() => completeHabit(habit.id, dateStr)}
        className="flex items-center gap-3 p-3 text-left"
      >
        {/* Coin badge LEFT */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl text-center"
          style={{ backgroundColor: `${habit.color}25`, border: `1px solid ${habit.color}40` }}
        >
          <span className="text-[14px] leading-none">🪙</span>
          <span className="text-[10px] font-bold text-white leading-tight mt-0.5">{habit.coinsPerComplete}</span>
        </div>

        {/* Emoji */}
        <span
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl text-lg"
          style={{ backgroundColor: completed ? "#1e293b" : `${habit.color}22` }}
        >
          {completed ? <Check className="w-4 h-4 text-slate-500" /> : habit.emoji}
        </span>

        {/* Name + streak */}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm leading-snug ${completed ? "line-through text-slate-500" : "text-slate-100"}`}>
            {habit.name}
          </p>
          <StreakFlames streak={habit.streak} />
        </div>

        {/* Reorder controls */}
        {!completed && (
          <div className="flex flex-col gap-1 pr-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => moveHabitUp(habit.id)} className="p-1 hover:bg-slate-700/50 rounded text-slate-500 hover:text-blue-400 transition-colors">
              <ArrowUp className="w-3 h-3" />
            </button>
            <button onClick={() => moveHabitDown(habit.id)} className="p-1 hover:bg-slate-700/50 rounded text-slate-500 hover:text-blue-400 transition-colors">
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </button>

      {/* Unit tracker (shown when not completed) */}
      {habit.unitsTracking && !completed && (
        <div className="px-3 pb-3">
          <HabitUnitTracker habit={habit} />
        </div>
      )}
    </div>
  );
}
