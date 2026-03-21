import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Plus, X } from "lucide-react";

interface AdvancedColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#ef4444",
  "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6",
  "#6366f1", "#a855f7", "#d946ef", "#f472b6", "#94a3b8",
];

export default function AdvancedColorPicker({ value, onChange, label }: AdvancedColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { customColors, addCustomColor, removeCustomColor } = useApp();

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground block">{label}</label>}
      <div className="flex gap-2 items-center">
        <div
          className="w-10 h-10 rounded-lg border-2 border-border cursor-pointer flex-shrink-0"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm font-mono"
          placeholder="#6366f1"
        />
        <button
          type="button"
          onClick={() => addCustomColor(value)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title="Сохранить цвет"
        >
          <Plus size={20} />
        </button>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border border-border bg-secondary"
        />
      </div>
      
      {showPicker && (
        <div className="p-3 bg-card border border-border rounded-lg space-y-4 shadow-xl">
          <div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex justify-between items-center">
              <span>Палитра</span>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {PRESET_COLORS.map((color, i) => (
                <button
                  key={`${color}-${i}`}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setShowPicker(false);
                  }}
                  className="w-full aspect-square rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    borderColor: value === color ? "white" : "transparent",
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {customColors.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2">
                <span>Мои цвета</span>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {customColors.map((color) => (
                  <div key={color} className="relative group">
                    <button
                      type="button"
                      onClick={() => {
                        onChange(color);
                        setShowPicker(false);
                      }}
                      className="w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor: value === color ? "white" : "transparent",
                      }}
                      title={color}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomColor(color);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
