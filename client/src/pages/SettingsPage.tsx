import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, RefreshCw, Cloud, Lock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { exportBackup, importBackup, isSyncing, syncWithCloud } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const success = await importBackup(file);
    if (success) {
      toast.success("Бэкап импортирован! Перезагрузите страницу.");
    } else {
      toast.error("Ошибка импорта бэкапа.");
    }
  };

  const handleClearData = () => {
    if (confirm("Вы уверены? Все данные будут удалены безвозвратно!")) {
      localStorage.removeItem("dhabits_data");
      window.location.reload();
    }
  };

  const handleSync = async () => {
    try {
      await syncWithCloud();
      toast.success("Данные синхронизированы!");
    } catch (err) {
      toast.error("Ошибка синхронизации. Проверь интернет.");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error("Пароль должен быть не менее 6 символов");
    setPassLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast.error("Ошибка: " + error.message);
    } else {
      toast.success("Пароль успешно установлен!");
      setNewPassword("");
    }
    setPassLoading(false);
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto pb-24">
      <h2 className="text-3xl font-bold text-foreground">Настройки</h2>

      {/* Cloud Sync */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Cloud className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Облачная синхронизация</h3>
            <p className="text-muted-foreground text-xs">Подключите все устройства к вашему аккаунту</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ваши данные автоматически сохраняются в облаке. Если вы зашли с нового устройства, нажмите кнопку ниже, чтобы загрузить последние изменения.
        </p>

        <Button 
          onClick={handleSync} 
          disabled={isSyncing}
          className="w-full gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 rounded-xl transition-all active:scale-[0.98]"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Синхронизация..." : "Синхронизировать сейчас"}
        </Button>
      </div>

      {/* Security */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Lock className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Безопасность</h3>
            <p className="text-muted-foreground text-xs">Установите пароль для быстрого входа без почты</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-medium ml-1">Новый пароль</label>
            <input 
              type="password" 
              placeholder="Минимум 6 символов" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            disabled={passLoading}
            variant="outline"
            className="w-full h-12 rounded-xl border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
          >
            {passLoading ? "Обновление..." : "Установить пароль"}
          </Button>
        </form>
      </div>

      {/* Data Management */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">Управление данными</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Экспортируйте свои данные в JSON файл или импортируйте ранее созданный бэкап.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={exportBackup} variant="outline" className="gap-2 rounded-xl">
            <Download className="w-4 h-4" />
            Экспорт бэкапа
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="gap-2 rounded-xl"
          >
            <Upload className="w-4 h-4" />
            Импорт бэкапа
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive/20 rounded-lg p-6 space-y-4 shadow-sm">
        <h3 className="text-lg font-semibold text-destructive">Опасная зона</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Удалить все данные. Это действие невозможно отменить.
        </p>
        <Button onClick={handleClearData} variant="outline" className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground rounded-xl">
          <Trash2 className="w-4 h-4" />
          Очистить все данные
        </Button>
      </div>

      {/* About */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-2 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">О dHabits</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          dHabits — это геймифицированный трекер привычек. Версия 1.1.0
        </p>
      </div>
    </div>
  );
}
