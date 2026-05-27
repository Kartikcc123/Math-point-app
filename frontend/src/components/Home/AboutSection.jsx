import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  Video,
} from 'lucide-react';
import mentorImage from '../../assets/Mentor.png';
import studentImage from '../../assets/Student.jpeg';

const mentorImageClass =
  'h-full w-full object-cover object-[center_18%] scale-[1.32]';
const studentImageClass =
  'h-full w-full object-cover object-[center_16%] scale-[1.34]';

const stats = [
  {
    title: 'Daily Live',
    description: 'Interactive math classes',
    icon: Video,
    className: 'bg-red-50 text-red-600',
  },
  {
    title: '10,000+',
    description: 'Practice queries & DPPs',
    icon: FileText,
    className: 'bg-sky-50 text-sky-700',
  },
  {
    title: '24 x 7',
    description: 'Doubt solving support',
    icon: BrainCircuit,
    className: 'bg-violet-50 text-violet-700',
  },
  {
    title: '99.9%',
    description: 'Highest board scores',
    icon: Award,
    className: 'bg-amber-50 text-amber-700',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/60 pointer-events-none" />

      <div className="relative z-10 sm:hidden">
        <div className="px-4 pb-12 pt-10">
          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.8)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-sky-800">
              <Sparkles className="h-3.5 w-3.5" />
              Maths Excellence
            </div>

            <h2 className="mt-4 text-[30px] font-black leading-[1.05] tracking-tight text-slate-950">
              Turning students into <span className="text-sky-600">toppers</span>
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              Smart learning, expert mentorship, and consistent practice for stronger mathematics results.
            </p>

            <div className="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-3">
              <div className="overflow-hidden rounded-[24px] bg-slate-100">
                <img
                  src={mentorImage}
                  alt="Lead Mentor"
                  loading="lazy"
                  decoding="async"
                  width={224}
                  height={224}
                  className={`h-48 transition-transform duration-500 ${mentorImageClass}`}
                />
              </div>

              <div className="grid gap-3">
                <div className="overflow-hidden rounded-[22px] bg-slate-100">
                  <img
                    src={studentImage}
                    alt="Student"
                    loading="lazy"
                    decoding="async"
                    width={144}
                    height={144}
                    className={`h-24 transition-transform duration-500 ${studentImageClass}`}
                  />
                </div>

                <div className="rounded-[22px] bg-slate-950 p-3 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
                    Method
                  </p>
                  <p className="mt-1 text-xs font-bold leading-5">
                    Logic first. Practice daily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm">
            {[
              'Logic-based concept clarity',
              'Structured chapter practice',
              'Focused doubt solving support',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 px-1 py-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-600" />
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.75)] active:scale-[0.98]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-black text-slate-800 shadow-sm active:scale-[0.98]"
            >
              Contact
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="rounded-[22px] border border-slate-200 bg-white p-3.5 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.75)]"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.className}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="mt-2.5 text-sm font-black text-slate-950">{stat.title}</h4>
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto hidden max-w-7xl px-4 sm:block sm:px-6 lg:px-8">
        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-sky-800 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Trusted Maths Excellence
            </span>

            <h2 className="mx-auto max-w-2xl text-3xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:mx-0 lg:text-6xl">
              Turning students into <span className="text-sky-600">toppers</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-600 sm:text-base lg:mx-0 lg:text-lg">
              India&apos;s trusted platform for smart learning, expert mentorship, structured practice, and result-focused mathematics guidance.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.75)] transition hover:bg-sky-700 active:scale-[0.98]"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-sky-200 hover:text-sky-700 active:scale-[0.98]"
              >
                Contact Institute
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-md overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.7)] sm:h-[460px] lg:max-w-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(14,165,233,0.18),transparent_34%)]" />
            <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300 sm:h-[360px] sm:w-[360px]" />
            <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-200 sm:h-[260px] sm:w-[260px]" />

            <div className="absolute left-5 top-6 z-20 max-w-[178px] rounded-2xl border border-slate-100 bg-white/95 px-3 py-2 text-left shadow-lg backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-700">Student Question</p>
              <p className="mt-1 text-xs font-bold text-slate-800">How can I score 93/100?</p>
            </div>

            <div className="absolute bottom-6 right-4 z-30 max-w-[210px] rounded-2xl bg-slate-950 px-4 py-3 text-left text-white shadow-xl sm:right-8">
              <p className="text-[11px] font-semibold leading-5 text-slate-200">
                Maths is easy when taught with logic and consistent practice.
              </p>
            </div>

            <img
              src={mentorImage}
              alt="Lead Mentor"
              loading="lazy"
              decoding="async"
              width={224}
              height={224}
              className={`absolute left-[22%] top-[47%] z-20 h-40 w-40 -translate-y-1/2 rounded-full border-4 border-white bg-sky-50 shadow-2xl sm:left-[28%] sm:h-56 sm:w-56 lg:left-[34%] ${mentorImageClass}`}
            />

            <img
              src={studentImage}
              alt="Student"
              loading="lazy"
              decoding="async"
              width={144}
              height={144}
              className={`absolute right-5 top-[23%] z-10 h-24 w-24 rounded-full border-4 border-white bg-pink-50 shadow-xl sm:right-14 sm:h-36 sm:w-36 ${studentImageClass}`}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-[0_16px_40px_-30px_rgba(15,23,42,0.7)] sm:p-5"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.className}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-base font-black text-slate-950 sm:text-lg">{stat.title}</h4>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
