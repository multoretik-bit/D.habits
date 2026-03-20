import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle2, Inbox, Lock, Key } from "lucide-react";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password" | "sent">("email");
  const [loading, setLoading] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Введите email");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      if (error.message.includes("rate limit")) {
        toast.error("Лимит писем исчерпан. Используйте вход по паролю!");
      } else {
        toast.error(error.message);
      }
    } else {
      setStep("sent");
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Введите email и пароль");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error("Ошибка входа: " + error.message);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">dHabits</h1>
          <p className="text-slate-400 text-sm">Синхронизация данных</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {step === "email" && (
            <form onSubmit={handleSendLink} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm font-medium">Email адрес</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-slate-950 border-slate-700 text-white rounded-xl h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 rounded-xl h-12" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Отправить ссылку →"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("password")}
                className="w-full text-slate-400 text-sm hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Войти по паролю
              </button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email-p" className="text-slate-300 text-sm font-medium">Email адрес</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email-p"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-slate-950 border-slate-700 text-white rounded-xl h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Пароль</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-slate-950 border-slate-700 text-white rounded-xl h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 rounded-xl h-12 font-bold" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Войти"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-slate-400 text-sm hover:text-white transition-colors"
              >
                ← Вернуться к магической ссылке
              </button>
            </form>
          )}

          {step === "sent" && (
            <div className="space-y-5 text-center">
              <Inbox className="w-12 h-12 text-green-400 mx-auto" />
              <h2 className="text-white font-bold text-lg">Письмо отправлено!</h2>
              <p className="text-slate-400 text-sm">Проверьте {email} и папку спам.</p>
              <button onClick={() => setStep("email")} className="text-blue-400 text-sm">Попробовать еще раз</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
