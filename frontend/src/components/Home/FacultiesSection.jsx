import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpenCheck, Sparkles } from 'lucide-react';
import { buildSrcSet } from '../../utils/image';

import deepakImg from '../../assets/Deepak.jpeg';
import mansiImg from '../../assets/Mansi.jpeg';
import ashishImg from '../../assets/DirectorCutout.png';
import akankshaImg from '../../assets/Akanksha.jpeg';
import samdaniImg from '../../assets/Samdani.png';
import shrutiImg from '../../assets/Shruuti.jpeg';

const faculties = [
  { 
    name: "Ashish Upadhyay", 
    subject: "Mathematics", 
    exp: "12 Years", 
    tag: "Director",
    desc: "Visionary leader and senior faculty, driving academic excellence and disciplined mentoring for over two decades.",
    img: ashishImg
  },
  { 
    name: "Deepak Sharma", 
    subject: "Physics", 
    exp: "10 Years", 
    tag: "Physics Expert",
    desc: "Master of Physics concepts, dedicated to simplifying complex theories for exam readiness.",
    img: deepakImg 
  },
  { 
    name: "Akanksha Gautam", 
    subject: "Biology", 
    exp: "9 Years", 
    tag: "Biology Expert",
    desc: "Specialized in Biology, helping students build strong fundamentals and exam confidence.",
    img: akankshaImg
  },
  { 
    name: "Mansi Acharya", 
    subject: "Chemistry", 
    exp: "8 Years", 
    tag: "Chemistry Catalyst",
    desc: "Expert in unraveling the complexities of Chemistry, simplifying concepts for a competitive edge.",
    img: mansiImg
  },
  { 
    name: "CA Sudeep Samdani", 
    subject: "Accountancy", 
    exp: "Experienced", 
    tag: "Accountancy Expert",
    desc: "Builds strong accountancy fundamentals through practical learning and clear concept-based teaching.",
    img: samdaniImg
  },
  { 
    name: "Shruti Kharbanda", 
    subject: "Business Studies", 
    exp: "18 Years", 
    tag: "B.St Coach",
    desc: "Makes Business Studies practical, easy to understand, and strongly connected to exam success.",
    img: shrutiImg
  }
];

const FacultiesSection = () => {
  const mobileTrackRef = useRef(null);
  const [activeFaculty, setActiveFaculty] = useState(0);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return undefined;

    const updateActiveFaculty = () => {
      const cards = Array.from(track.children);
      if (!cards.length) return;

      const trackLeft = track.getBoundingClientRect().left;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveFaculty(closestIndex);
    };

    const goToFaculty = (index) => {
      const cards = track.children;
      const targetCard = cards[index];
      if (!targetCard) return;

      track.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth',
      });
    };

    updateActiveFaculty();
    track.addEventListener('scroll', updateActiveFaculty, { passive: true });

    const intervalId = window.setInterval(() => {
      if (!window.matchMedia('(max-width: 767px)').matches) return;

      setActiveFaculty((current) => {
        const nextIndex = (current + 1) % faculties.length;
        goToFaculty(nextIndex);
        return nextIndex;
      });
    }, 3200);

    return () => {
      track.removeEventListener('scroll', updateActiveFaculty);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="faculties" className="bg-white py-12 border-b border-gray-100 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-sky-800">
                <Sparkles className="h-3.5 w-3.5" />
                Expert Faculties
              </div>
              <h2 className="mt-4 text-[30px] font-black leading-[1.05] tracking-tight text-slate-950">
                Learn from focused mentors
              </h2>
            </div>
            <Link
              to="/faculties"
              className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15"
              aria-label="View all faculties"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            Subject experts who make concepts clearer, practice sharper, and exam preparation more disciplined.
          </p>

          <div
            ref={mobileTrackRef}
            className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {faculties.map((fac) => (
              <article
                key={fac.name}
                className="w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.8)]"
              >
                <div className="relative h-52 bg-[linear-gradient(180deg,#eff8ff_0%,#f8fafc_100%)]">
                  <div className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-800 shadow-sm">
                    {fac.tag}
                  </div>
                  <img
                    src={fac.img}
                    alt={fac.name}
                    srcSet={buildSrcSet(fac.img)}
                    sizes="260px"
                    loading="lazy"
                    decoding="async"
                    width={260}
                    height={260}
                    className="absolute bottom-0 left-1/2 h-[92%] w-full -translate-x-1/2 object-contain object-bottom"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-black text-slate-950">{fac.name}</h3>
                      <p className="mt-1 text-sm font-bold text-sky-700">{fac.subject}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
                      <Award className="h-3.5 w-3.5" />
                      {fac.exp}
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
                    {fac.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
                    <BookOpenCheck className="h-5 w-5 shrink-0 text-sky-700" />
                    <span className="text-xs font-bold text-slate-700">
                      Clear concepts with exam-focused practice
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {faculties.map((fac, index) => (
              <button
                key={fac.name}
                type="button"
                onClick={() => {
                  setActiveFaculty(index);
                  mobileTrackRef.current?.scrollTo({
                    left: mobileTrackRef.current.children[index]?.offsetLeft || 0,
                    behavior: 'smooth',
                  });
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeFaculty === index ? 'w-7 bg-slate-900' : 'w-2.5 bg-slate-300'
                }`}
                aria-label={`Show faculty ${fac.name}`}
              />
            ))}
          </div>
        </div>

        {/* Header Elements */}
        <div className="hidden text-center mb-16 flex-col items-center md:flex">
          <div className="bg-[#fff1f2] text-[#9f1239] text-[13px] font-bold px-4 py-1.5 rounded-full mb-5">
            Expert Faculties
          </div>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1a202c] tracking-tight mb-4">
            Learn from the Math Masters
          </h2>
          <p className="text-slate-500 text-[16px] max-w-2xl mx-auto leading-relaxed">
            India's top educators right on your screen, combining deep subject knowledge with the best exam-oriented strategies.
          </p>
        </div>
        
        <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-2 xl:grid-cols-3">
          {faculties.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 flex flex-col items-center p-8 text-center transition-shadow group relative"
            >
              
              {/* Optional background accent for the top of the card */}
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-slate-50 rounded-t-xl border-b border-gray-100 z-0"></div>

              {/* Portrait */}
              <div className="relative w-[120px] h-[120px] rounded-full border-[3px] border-[#0a1128] p-1 bg-white z-10 mb-5 group-hover:scale-105 transition-transform duration-300">
                <img src={fac.img} alt={fac.name} srcSet={buildSrcSet(fac.img)} sizes="120px" loading="lazy" decoding="async" width={120} height={120} className="w-full h-full object-cover object-top rounded-full bg-slate-50" />
              </div>
              
              {/* Info */}
              <h3 className="text-xl font-extrabold text-[#1a202c] mb-1 z-10">{fac.name}</h3>
              <p className="text-[#9f1239] font-bold text-[13.5px] bg-[#fff1f2] px-3 py-1 rounded-md mb-4 z-10">
                {fac.subject}
              </p>
              
              <p className="text-slate-500 text-sm font-medium mb-6 z-10 leading-relaxed px-2">
                {fac.desc}
              </p>
              
              {/* Bottom Tags */}
              <div className="mt-auto w-full flex items-center justify-center gap-3 pt-5 border-t border-gray-100 z-10">
                <span className="text-slate-700 text-[12px] font-bold bg-slate-100 px-3 py-1.5 rounded flex-1">
                  Exp: {fac.exp}
                </span>
                <span className="text-indigo-700 text-[12px] font-bold bg-indigo-50 px-3 py-1.5 rounded flex-1">
                  {fac.tag}
                </span>
              </div>

            </div>
          ))}
        </div>

        <div className="hidden mt-14 text-center md:block">
          <Link 
            to="/faculties" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold text-white bg-slate-900 rounded-full shadow-md hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Meet All Our Faculties &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacultiesSection;
