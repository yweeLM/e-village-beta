import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Brain,
  Star,
  Lock,
  PartyPopper,
  Zap,
  Globe,
  Award,
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? 'https://jbuwvbjjjrhwbszanpma.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpidXd2YmpqanJod2JzemFucG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTUyMjIsImV4cCI6MjA3MDQ5MTIyMn0.ZbaYFUy7ew84YDMJJHtSoKBgfH2eopUcpMV-3EPJEXc'
);

const MILESTONES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const BRAND = '#6929C3';   // DSP purple
const PINK  = '#E91E6E';   // DSP pink
const TEAL  = '#4EC9B0';   // DSP mint teal (Savvy)

function fireCelebration() {
  const duration = 4000;
  const end = Date.now() + duration;
  const colors = [BRAND, PINK, TEAL, '#fbbf24', '#34d399'];
  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    whatsapp: '',
    hurdle: '',
    confidence: 3,
    ageRange: '',
    location: '',
    biggestHurdleText: '',
  });

  useEffect(() => {
    if (submitted && milestone) fireCelebration();
  }, [submitted, milestone]);

  const handleWhatsAppShare = () => {
    const shareMessage = encodeURIComponent(
      `I just joined the E-Village waitlist for Digital Savvy Parenting! 🛡️📱 It's a new AI-powered portal by Yetty Williams to help us protect our kids from digital risks and lead them with confidence. Join the village here: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${shareMessage}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from('waitlist_entries').insert({
      first_name: formData.firstName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      hurdle: formData.hurdle,
      confidence: formData.confidence,
      age_range: formData.ageRange,
      location: formData.location,
      biggest_hurdle_text: formData.biggestHurdleText,
      source: 'web_waitlist',
    });

    if (insertError) {
      console.error('Submission error:', insertError);
      setError('Something went wrong. Please try again or check your connection.');
      setLoading(false);
      return;
    }

    const { data: countData } = await supabase.rpc('get_waitlist_count');
    const hit = MILESTONES.find((m) => m === countData);
    setMilestone(hit ?? null);
    setLoading(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-violet-100 p-10 text-center border border-violet-50">
          {milestone ? (
            <>
              <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-100">
                <PartyPopper className="w-12 h-12 text-yellow-500" />
              </div>
              <div className="inline-block px-4 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-black uppercase tracking-widest mb-4">
                Milestone Unlocked 🎉
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">
                We just hit {milestone} signups!
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                You made it happen, {formData.firstName}! You are signup #{milestone} — the village is growing!
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">You're in the Village!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Thank you for joining, {formData.firstName}! You are now on the list for early access.
                I look forward to building this future with you.
              </p>
            </>
          )}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Invite Other Parents
            </button>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Help us grow the safety net
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setMilestone(null);
              setFormData({ ...formData, firstName: '', email: '', whatsapp: '', biggestHurdleText: '' });
            }}
            className="w-full py-4 text-slate-400 font-bold hover:text-violet-600 transition-all text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-violet-100">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-white font-black text-[10px]" style={{ backgroundColor: BRAND }}>E</div>
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-white font-black text-[10px]" style={{ backgroundColor: TEAL }}>V</div>
            </div>
            <span className="font-black text-xl tracking-tight uppercase hidden sm:block text-slate-900">
              E-Village
            </span>
          </div>
          <a
            href="#waitlist-form"
            className="text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg"
            style={{ backgroundColor: PINK }}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-700 text-xs font-black uppercase tracking-widest mb-8 border border-violet-100">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            Empowering Families Globally
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            It takes an{' '}
            <span style={{ color: BRAND }}>E-Village</span>
            <br />
            to raise a child today.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Your child's digital world doesn't come with a manual. <strong>The E-Village does.</strong>
          </p>
          <a
            href="#waitlist-form"
            className="inline-block px-10 py-5 text-white rounded-3xl font-black text-lg hover:scale-105 transition-all shadow-2xl"
            style={{ backgroundColor: PINK, boxShadow: `0 20px 40px ${PINK}40` }}
          >
            Secure Early Access
          </a>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-violet-100 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-40"></div>
        </div>
      </section>

      {/* What is E-Village */}
      <section className="py-24 bg-violet-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-black tracking-widest uppercase text-sm mb-4" style={{ color: BRAND }}>
            What is the E-Village?
          </h3>
          <h2 className="text-4xl font-black text-slate-900 leading-tight mb-8">
            A Digital Parenting Portal built for the real world.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            The E-Village is a first-of-its-kind, intelligent support system designed to act as a
            safety net and partner for your family. Unlike generic parental controls, this portal
            uses advanced technology to analyse your family's unique needs and considers your child's
            age to deliver personalised, real-time action plans to navigate the digital world with
            confidence.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-8 h-8" style={{ color: BRAND }} />,
                title: 'Social Media Addiction',
                desc: 'Screen time battles and withdrawal from real-world connection.',
                accent: BRAND,
              },
              {
                icon: <ShieldCheck className="w-8 h-8" style={{ color: TEAL }} />,
                title: 'AI Deepfakes & Safety',
                desc: 'Cyberbullying, identity threats, and AI-generated harmful content.',
                accent: TEAL,
              },
              {
                icon: <Zap className="w-8 h-8" style={{ color: PINK }} />,
                title: 'Harmful Exposure',
                desc: 'Real-time action plans when your child encounters dangerous content.',
                accent: PINK,
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm text-left" style={{ borderTop: `3px solid ${item.accent}`, border: `1px solid #f0f0f0`, borderTopWidth: '3px', borderTopColor: item.accent }}>
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mt-10 max-w-3xl mx-auto">
            Whether you are battling social media addiction, facing the threat of AI-generated
            deepfakes, or struggling to protect your child from harmful content — the E-Village
            provides the expert guidance you need, exactly when you need it.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-violet-50 p-2 rounded-[2.5rem] shadow-xl border border-violet-100">
                <div className="aspect-[4/5] bg-violet-100 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-8 text-violet-300">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="font-bold text-violet-400">Yetty Williams</p>
                    <p className="text-xs uppercase tracking-widest text-violet-300">Digital Parenting Expert</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-6 rounded-2xl border border-violet-100 shadow-lg">
                  <p className="font-black text-slate-900">Yetty Williams</p>
                  <p className="text-xs text-slate-500 italic">Author · Digital Savvy Parenting</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-black tracking-widest uppercase text-sm" style={{ color: BRAND }}>
                Who is behind it?
              </h3>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                The E-Village is created by Yetty Williams.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Yetty Williams is a leading expert in digital parenting, author of{' '}
                <em>Digital Savvy Parenting: What the World Urgently Needs</em>, and the
                award-winning founder of <strong>LagosMums</strong> — a global community reaching
                millions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                As a certified digital parenting coach trained in <strong>cyberpsychology</strong>{' '}
                with over a decade of experience, Yetty has coached thousands of parents to navigate
                the complexities of the digital age. Generic tools don't understand your culture or
                your child's specific age. The E-Village changes that.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { icon: <Brain className="w-6 h-6" style={{ color: BRAND }} />, label: 'Cyberpsychology' },
                  { icon: <Globe className="w-6 h-6" style={{ color: BRAND }} />, label: 'Global Reach' },
                  { icon: <Award className="w-6 h-6" style={{ color: BRAND }} />, label: 'Award-Winning' },
                ].map((b) => (
                  <div key={b.label} className="bg-violet-50 p-4 rounded-2xl border border-violet-100 text-center">
                    <div className="flex justify-center mb-2">{b.icon}</div>
                    <p className="text-xs font-bold text-slate-700">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-violet-50 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Join the E-Village</h2>
            <p className="text-slate-500">
              Your information is secure and helps us personalise your experience.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-400 outline-none"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-400 outline-none"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp (Optional)</label>
              <div className="relative">
                <MessageCircle className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="tel"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-400 outline-none"
                  placeholder="Phone Number"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>

            {/* Hurdles */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Biggest Digital Hurdle</label>
              <div className="grid gap-3">
                {[
                  { key: 'Mental Health', desc: 'Withdrawal or online-only "friendships".' },
                  { key: 'Safety', desc: 'Cyberbullying and AI deepfakes.' },
                  { key: 'Exposure', desc: 'Early access to harmful content.' },
                  { key: 'Addiction', desc: 'Social media and screen time battles.' },
                  { key: 'Transitions', desc: 'Behavioral shifts after moves.' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.hurdle === opt.key
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      required
                      name="hurdle"
                      className="mt-1 accent-violet-600"
                      checked={formData.hurdle === opt.key}
                      onChange={() => setFormData({ ...formData, hurdle: opt.key })}
                    />
                    <div>
                      <span className="block font-bold text-sm text-slate-900">{opt.key}</span>
                      <span className="text-xs text-slate-500">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Child's Age Range</label>
              <div className="grid grid-cols-2 gap-3">
                {['Early Years', 'Primary', 'Teenagers', 'Young Adults'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setFormData({ ...formData, ageRange: age })}
                    className={`py-4 rounded-xl border-2 font-bold text-xs transition-all ${
                      formData.ageRange === age
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-slate-100 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Location</label>
              <div className="flex gap-3">
                {['Nigeria', 'UK', 'Other'].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setFormData({ ...formData, location: loc })}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.location === loc
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-slate-100 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-6 rounded-[2rem] font-black text-xl text-white shadow-2xl transition-all flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: loading ? '#94a3b8' : PINK }}
            >
              {loading ? 'Saving Spot...' : 'Secure My Spot'}
              {!loading && <ChevronRight className="w-6 h-6" />}
            </button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Lock className="w-3 h-3 inline mr-1 mb-0.5" /> Secure & Encrypted Registration
            </p>
          </form>
        </div>
      </section>

      <footer className="bg-slate-950 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-black text-xl uppercase tracking-widest">E-Village</p>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Yetty Williams. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
