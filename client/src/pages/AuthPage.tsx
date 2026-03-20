import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle2, Inbox } from "lucide-react";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "sent">("email");
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
      toast.error(error.message);
    } else {
      setStep("sent");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">dHabits</h1>
          <p className="text-slate-400 text-sm">Синхронизация между устройствами</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {step === "email" ? (
            <form onSubmit={handleSendLink} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
                  Email адрес
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-medium transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Отправить ссылку →"}
              </Button>
              <p className="text-center text-slate-500 text-xs">
                Мы отправим волшебную ссылку для входа
              </p>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Inbox className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-1">Проверьте почту!</h2>
                <p className="text-slate-400 text-sm">
                  Мы отправили ссылку для входа на
                </p>
                <p className="text-blue-400 font-medium mt-1">{email}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 text-left space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-sm">Нажмите на ссылку в письме</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-sm">Проверьте папку «Спам»</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-sm">Ссылка действует 24 часа</p>
                </div>
              </div>
              <button
                type="button"
                className="w-full text-slate-400 hover:text-slate-200 text-sm transition-colors"
                onClick={() => { setStep("email"); }}
              >
                ← Изменить email или отправить заново
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
