import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Brain,
  Star,
  Lock,
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    setLoading(false);

    if (insertError) {
      console.error('Submission error:', insertError);
      setError('Something went wrong. Please try again or check your connection.');
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDF8F9] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-pink-100 p-10 text-center border border-pink-50">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">You're in the Village!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">
            Thank you for joining, {formData.firstName}! You are now on the list for early access.
            I look forward to building this future with you.
          </p>

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
              setFormData({
                ...formData,
                firstName: '',
                email: '',
                whatsapp: '',
                biggestHurdleText: '',
              });
            }}
            className="w-full py-4 text-slate-400 font-bold hover:text-pink-600 transition-all text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-pink-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E91E63] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-pink-200">
              EV
            </div>
            <span className="font-black text-xl tracking-tight uppercase hidden sm:block text-slate-900">
              E-Village
            </span>
          </div>
          <a
            href="#waitlist-form"
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#E91E63] transition-all shadow-lg shadow-slate-200"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-widest mb-8 border border-slate-100">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            Empowering Families Globally
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            It takes an <span className="text-[#E91E63]">E-Village</span> <br />
            to raise a child today.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Reclaim your influence and lead your family into the digital age with confidence using
            our new real-time parenting portal.
          </p>
          <a
            href="#waitlist-form"
            className="inline-block px-10 py-5 bg-[#E91E63] text-white rounded-3xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-pink-200"
          >
            Secure Early Access
          </a>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-30"></div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-white">
                <div className="aspect-[4/5] bg-slate-200 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-8 text-slate-400">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="font-bold">Yetty Williams</p>
                    <p className="text-xs uppercase tracking-widest">Digital Parenting Expert</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-6 rounded-2xl border border-slate-100 shadow-lg">
                  <p className="font-black text-slate-900">Yetty Williams</p>
                  <p className="text-xs text-slate-500 italic">
                    Author of "Digital Savvy Parenting"
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-pink-600 font-black tracking-widest uppercase text-sm">
                Expert Guidance
              </h3>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                I am building the safety net your family deserves.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                As a certified coach trained in <strong>cyberpsychology</strong>, I've spent a
                decade training 7,000+ parents. Generic tools don't understand your culture or your
                child's specific age. The E-Village changes that.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <Brain className="w-8 h-8 text-pink-600 mb-4" />
                  <h4 className="font-bold text-sm">Deep Insights</h4>
                  <p className="text-xs text-slate-500">Evidence-based psychology.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <ShieldCheck className="w-8 h-8 text-pink-600 mb-4" />
                  <h4 className="font-bold text-sm">Real Protection</h4>
                  <p className="text-xs text-slate-500">Real-time crisis support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-50 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900">Join the E-Village</h2>
            <p className="text-slate-500">
              Your information is secure and helps us personalize your experience.
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
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#E91E63] outline-none"
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
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#E91E63] outline-none"
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
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#E91E63] outline-none"
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
                        ? 'border-pink-600 bg-pink-50'
                        : 'border-slate-50 bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      required
                      name="hurdle"
                      className="mt-1 accent-pink-600"
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
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
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
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-slate-50 bg-slate-50 text-slate-500'
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
              className={`w-full py-6 rounded-[2rem] font-black text-xl text-white shadow-2xl transition-all flex items-center justify-center gap-3 ${
                loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-pink-600 shadow-pink-100'
              }`}
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
