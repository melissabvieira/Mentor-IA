/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Target, 
  Clock, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Loader2, 
  Sparkles,
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import Markdown from 'react-markdown';
import { generateCareerAdvice, UserProfile } from './services/geminiService';
import { cn } from './lib/utils';

type Step = 'interest' | 'level' | 'goal' | 'time';

const STEPS: Step[] = ['interest', 'level', 'goal', 'time'];

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [profile, setProfile] = useState<UserProfile>({
    interestArea: '',
    currentLevel: '',
    professionalGoal: '',
    studyTime: ''
  });
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCareerAdvice(profile);
      setAdvice(result || "Não foi possível obter uma resposta clara.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAdvice(null);
    setError(null);
    setCurrentStep(0);
    setProfile({
      interestArea: '',
      currentLevel: '',
      professionalGoal: '',
      studyTime: ''
    });
  };

  const isStepValid = () => {
    const key = STEPS[currentStep] as keyof UserProfile;
    if (key === 'interestArea') return profile.interestArea.length > 2;
    if (key === 'currentLevel') return profile.currentLevel !== '';
    if (key === 'professionalGoal') return profile.professionalGoal.length > 2;
    if (key === 'studyTime') return profile.studyTime.length > 1;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 md:px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              Mentor IA
              <span className="hidden sm:inline text-indigo-600 font-medium text-xs px-2 py-0.5 bg-indigo-50 rounded-full">
                Mentor de Carreira
              </span>
            </h1>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest hidden sm:block">
          Sessão ID: #{Math.floor(Math.random() * 9000 + 1000)}-B
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!advice && !loading ? (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden my-auto"
            >
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Etapa {currentStep + 1} de {totalSteps}</span>
                  <span className="text-indigo-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-indigo-600"
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Target size={12} className="text-indigo-600" />
                            Área de Foco
                          </label>
                          <h2 className="text-2xl font-bold text-slate-800 leading-tight">Em qual trilha tecnológica você deseja se destacar?</h2>
                        </div>
                        <input
                          autoFocus
                          type="text"
                          placeholder="Ex: Engenharia Front-end, DevOps, Ciência de Dados..."
                          className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-lg text-slate-800 placeholder:text-slate-400"
                          value={profile.interestArea}
                          onChange={(e) => setProfile({ ...profile, interestArea: e.target.value })}
                          onKeyDown={(e) => e.key === 'Enter' && isStepValid() && handleNext()}
                        />
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <User size={12} className="text-indigo-600" />
                            Contexto Atual
                          </label>
                          <h2 className="text-2xl font-bold text-slate-800 leading-tight">Como você avalia seu conhecimento técnico hoje?</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            { id: 'iniciante', label: 'Iniciante', desc: 'Estudando fundamentos ou transição' },
                            { id: 'intermediário', label: 'Intermediário', desc: 'Mais de 1 ano de experiência profissional' },
                            { id: 'avançado', label: 'Avançado', desc: 'Sênior, especialista ou líder técnico' }
                          ].map((level) => (
                            <button
                              key={level.id}
                              onClick={() => setProfile({ ...profile, currentLevel: level.id })}
                              className={cn(
                                "w-full px-6 py-5 rounded-2xl border transition-all text-left flex items-center justify-between group",
                                profile.currentLevel === level.id
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-white"
                              )}
                            >
                              <div>
                                <span className="block font-bold text-base">{level.label}</span>
                                <span className={cn(
                                  "text-xs mt-0.5 block",
                                  profile.currentLevel === level.id ? "text-indigo-100" : "text-slate-400"
                                )}>{level.desc}</span>
                              </div>
                              {profile.currentLevel === level.id && <CheckCircle2 size={24} />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Rocket size={12} className="text-indigo-600" />
                            Objetivo Estratégico
                          </label>
                          <h2 className="text-2xl font-bold text-slate-800 leading-tight">Qual sua meta profissional para os próximos 6 meses?</h2>
                        </div>
                        <textarea
                          autoFocus
                          placeholder="Ex: Conseguir promoção para Sênior, migrar para arquitetura de sistemas..."
                          className="w-full px-6 py-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-lg text-slate-800 placeholder:text-slate-400 min-h-[140px] resize-none"
                          value={profile.professionalGoal}
                          onChange={(e) => setProfile({ ...profile, professionalGoal: e.target.value })}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Clock size={12} className="text-indigo-600" />
                            Disponibilidade
                          </label>
                          <h2 className="text-2xl font-bold text-slate-800 leading-tight">Quantas horas semanais você dedicará a este plano?</h2>
                        </div>
                        <input
                          autoFocus
                          type="text"
                          placeholder="Ex: 10 horas semanais..."
                          className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-lg text-slate-800 placeholder:text-slate-400"
                          value={profile.studyTime}
                          onChange={(e) => setProfile({ ...profile, studyTime: e.target.value })}
                          onKeyDown={(e) => e.key === 'Enter' && isStepValid() && handleNext()}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={cn(
                    "px-4 py-2 font-bold text-sm transition-all flex items-center gap-2",
                    currentStep === 0 
                      ? "opacity-0 cursor-default" 
                      : "text-slate-400 hover:text-slate-800"
                  )}
                >
                  <ChevronLeft size={16} />
                  Voltar
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={cn(
                    "px-8 py-4 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex items-center gap-2 shadow-lg",
                    isStepValid()
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  )}
                >
                  {currentStep === totalSteps - 1 ? 'Finalizar Análise' : 'Próximo Passo'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 py-32"
            >
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-xl border-4 border-slate-200" />
                <div className="absolute inset-0 rounded-xl border-4 border-indigo-600 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                  <Zap size={24} />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-slate-800">Processando seu Perfil Profissional</h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Gerando Roadmap personalizado...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Sidebar: User Context */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
                  <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">Seu Contexto</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Interesse</label>
                      <p className="text-sm font-bold text-slate-800">{profile.interestArea}</p>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Nível</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase">
                        {profile.currentLevel}
                      </span>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Objetivo</label>
                      <p className="text-sm font-bold text-slate-800">{profile.professionalGoal}</p>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Dedicação</label>
                      <p className="text-sm font-bold text-slate-800">{profile.studyTime}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-950 text-white p-6 rounded-3xl relative overflow-hidden group shadow-xl shadow-indigo-100">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" 
                  />
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-indigo-400" />
                    Insight Inteligente
                  </h3>
                  <p className="text-xs text-indigo-100/80 leading-relaxed font-medium">
                    Com base no seu perfil, o foco deve ser na transição para papéis de maior autonomia técnica, priorizando arquitetura sobre codificação pura.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={14} />
                    Refazer Análise
                  </button>
                </div>
              </aside>

              {/* Main Evolution Plan */}
              <div className="lg:col-span-9 flex flex-col gap-6">
                {/* Custom Result Content Wrapper */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32" />
                  
                  <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">Plano de Evolução Profissional</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Estratégia exclusiva via Mentor IA</p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none 
                    prose-headings:text-slate-800 prose-headings:font-bold prose-headings:tracking-tight
                    prose-h2:text-xl prose-h2:mb-6 prose-h2:text-indigo-600
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-sm
                    prose-li:text-slate-600 prose-li:text-sm
                    prose-hr:border-slate-100 prose-hr:my-10
                    prose-ul:list-disc prose-ul:pl-5
                    grid md:grid-cols-2 gap-x-12 gap-y-2
                  ">
                    <Markdown>{advice}</Markdown>
                  </div>
                </div>

                {/* Market Tips Replacement */}
                <div className="bg-slate-900 px-8 py-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                      <Lightbulb size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Dica Prática para o Mercado</h4>
                      <p className="text-[11px] text-slate-400 italic">Mantenha seu GitHub ativo com projetos que demonstrem as novas competências sugeridas no plano.</p>
                    </div>
                  </div>
                  <button className="whitespace-nowrap px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/40">
                    Exportar PDF Completo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} Mentor IA Professional • Powered by Google Gemini
      </footer>
    </div>
  );
}
