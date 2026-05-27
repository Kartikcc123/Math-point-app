import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Home,
  LayoutDashboard,
  LibraryBig,
  LogIn,
  Phone,
  Receipt,
  ShoppingBag,
  User,
  UserRoundPlus,
  Users,
} from 'lucide-react';

const navConfigs = {
  public: [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Faculty', path: '/faculties', icon: GraduationCap },
    { label: 'Contact', path: '/contact', icon: Phone },
    { label: 'Login', path: '/login', icon: LogIn },
  ],
  student: [
    { label: 'Home', path: '/student/dashboard', icon: Home },
    { label: 'Courses', path: '/student/courses', icon: BookOpen },
    { label: 'Results', path: '/student/results', icon: BarChart3 },
    { label: 'Attend', path: '/student/attendance', icon: CheckCircle },
    { label: 'Profile', path: '/student/profile', icon: User },
  ],
  studentLimited: [
    { label: 'Courses', path: '/student/courses', icon: BookOpen },
    { label: 'Purchases', path: '/student/purchases', icon: ShoppingBag },
    { label: 'Profile', path: '/student/profile', icon: User },
  ],
  parent: [
    { label: 'Home', path: '/parent', icon: Home },
    { label: 'Children', path: '/parent/children', icon: Users },
    { label: 'Attend', path: '/parent/attendance', icon: CheckCircle },
    { label: 'Profile', path: '/parent', icon: User },
  ],
  teacher: [
    { label: 'Home', path: '/teacher', icon: Home },
    { label: 'Courses', path: '/teacher/courses', icon: BookOpen },
    { label: 'Students', path: '/teacher/students', icon: Users },
    { label: 'Attend', path: '/teacher/attendance', icon: CheckCircle },
  ],
  admin: [
    { label: 'Home', path: '/admin', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Parents', path: '/admin/parents', icon: UserRoundPlus },
    { label: 'Courses', path: '/admin/courses', icon: LibraryBig },
    { label: 'More', path: '/admin/payments', icon: Receipt },
  ],
};

const variantStyles = {
  public: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-sky-400 text-slate-950',
    dot: 'bg-sky-400',
  },
  student: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-sky-400 text-slate-950',
    dot: 'bg-sky-400',
  },
  studentLimited: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-sky-400 text-slate-950',
    dot: 'bg-sky-400',
  },
  parent: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-amber-300 text-slate-950',
    dot: 'bg-amber-300',
  },
  teacher: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-emerald-300 text-slate-950',
    dot: 'bg-emerald-300',
  },
  admin: {
    active: 'bg-slate-950 text-white shadow-slate-950/20',
    icon: 'bg-violet-300 text-slate-950',
    dot: 'bg-violet-300',
  },
};

const isRouteActive = (pathname, itemPath) => {
  if (itemPath === '/student/dashboard') {
    return pathname === '/student' || pathname === '/student/dashboard';
  }

  if (itemPath === '/parent') {
    return pathname === '/parent' || pathname === '/parent/dashboard';
  }

  if (itemPath === '/teacher') {
    return pathname === '/teacher' || pathname === '/teacher/dashboard';
  }

  if (itemPath === '/admin') {
    return pathname === '/admin' || pathname === '/admin/dashboard';
  }

  if (itemPath === '/') {
    return pathname === '/';
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};

const BottomNav = ({ variant = 'student' }) => {
  const items = navConfigs[variant] || navConfigs.student;
  const style = variantStyles[variant] || variantStyles.student;
  const location = useLocation();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden" aria-label="Mobile bottom navigation">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/96 to-transparent" />
      <div className="pointer-events-auto relative mx-auto max-w-md px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2">
        <div className="rounded-[30px] border border-white/80 bg-white/92 p-1.5 shadow-[0_20px_60px_-26px_rgba(15,23,42,0.75)] ring-1 ring-slate-900/5 backdrop-blur-2xl">
          <div className={`grid gap-1 ${items.length === 3 ? 'grid-cols-3' : items.length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
            {items.map(({ label, path, icon: Icon }) => {
              const active = isRouteActive(location.pathname, path);
              const icon = React.createElement(Icon, {
                className: `h-[18px] w-[18px] ${active ? 'text-current' : 'text-slate-500'}`,
                strokeWidth: 2.4,
              });

              return (
                <Link
                  key={`${variant}-${label}`}
                  to={path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-[22px] px-1 text-[10px] font-black transition duration-200 active:scale-95 ${
                    active
                      ? `${style.active} shadow-lg`
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-2xl transition ${
                      active ? style.icon : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {icon}
                  </span>
                  <span className="max-w-full truncate leading-none">{label}</span>
                  {active ? (
                    <span className={`absolute -bottom-1 h-1 w-5 rounded-full ${style.dot}`} />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
