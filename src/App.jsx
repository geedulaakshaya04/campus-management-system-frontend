import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  GraduationCap, 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Award, 
  Calendar, 
  Bell, 
  Briefcase, 
  Sparkles, 
  Menu, 
  X,
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import LoginPage from './pages/auth/LoginPage';
import StudentDashboardView from './pages/student/StudentDashboardView';
import FacultyDashboardView from './pages/faculty/FacultyDashboardView';
import HodDashboardView from './pages/hod/HodDashboardView';
import PlacementDashboardView from './pages/placement/PlacementDashboardView';
import AdminDashboardView from './pages/admin/AdminDashboardView';
import { 
  getStudentDashboard, 
  getFacultyDashboard, 
  getHodDashboard, 
  getAdminDashboard, 
  getPlacementDashboard 
} from './services/api';

const DEFAULT_SEEDED_DATA = {
  allUsers: [
    { id: 1, username: 'admin', fullName: 'Dr. M. R. Sharma (Director)', email: 'admin@campus.edu', department: 'Administration', role: 'ROLE_ADMIN' },
    { id: 2, username: 'hod_cse', fullName: 'Dr. K. V. Rao (HOD - CSE)', email: 'hod.cse@campus.edu', department: 'Computer Science', role: 'ROLE_HOD' },
    { id: 3, username: 'prof_smith', fullName: 'Prof. Rajesh Smith', email: 'smith@campus.edu', department: 'Computer Science', role: 'ROLE_FACULTY' },
    { id: 4, username: 'placement_officer', fullName: 'Mr. Suresh Verma', email: 'placement@campus.edu', department: 'Placement Cell', role: 'ROLE_PLACEMENT' },
    { id: 5, username: 'student', fullName: 'Akshaya Narayana', email: 'akshaya@campus.edu', department: 'Computer Science', role: 'ROLE_STUDENT' }
  ],
  totalUsers: 5,
  totalStudents: 1,
  totalNotices: 3,
  totalDrives: 3,
  totalFaculty: 1,
  lowAttendanceCount: 0,
  assignments: [
    { id: 1, title: 'Implementation of Transformer Self-Attention', subject: 'Deep Learning', dueDate: '2026-10-15', totalMarks: 20 },
    { id: 2, title: 'Full-Stack Microservices with Spring Boot & Vite', subject: 'Web Programming', dueDate: '2026-10-18', totalMarks: 25 }
  ],
  placementDrives: [
    { id: 1, companyName: 'TCS Digital', roleName: 'Digital Software Engineer', packageLPA: '9.0 LPA', minCgpa: 7.0, eligibleBranches: 'CSE, IT', driveDate: '2026-10-20', status: 'ACTIVE', jobLocation: 'Hyderabad / Bengaluru' },
    { id: 2, companyName: 'Deloitte USI', roleName: 'Technology Analyst', packageLPA: '11.5 LPA', minCgpa: 7.5, eligibleBranches: 'CSE, IT', driveDate: '2026-10-27', status: 'ACTIVE', jobLocation: 'Hyderabad / Pune' },
    { id: 3, companyName: 'Amazon AWS', roleName: 'Cloud Support Associate', packageLPA: '16.0 LPA', minCgpa: 8.0, eligibleBranches: 'CSE, IT', driveDate: '2026-11-05', status: 'UPCOMING', jobLocation: 'Bengaluru' }
  ],
  drives: [
    { id: 1, companyName: 'TCS Digital', roleName: 'Digital Software Engineer', packageLPA: '9.0 LPA', minCgpa: 7.0, eligibleBranches: 'CSE, IT', driveDate: '2026-10-20', status: 'ACTIVE', jobLocation: 'Hyderabad / Bengaluru' },
    { id: 2, companyName: 'Deloitte USI', roleName: 'Technology Analyst', packageLPA: '11.5 LPA', minCgpa: 7.5, eligibleBranches: 'CSE, IT', driveDate: '2026-10-27', status: 'ACTIVE', jobLocation: 'Hyderabad / Pune' },
    { id: 3, companyName: 'Amazon AWS', roleName: 'Cloud Support Associate', packageLPA: '16.0 LPA', minCgpa: 8.0, eligibleBranches: 'CSE, IT', driveDate: '2026-11-05', status: 'UPCOMING', jobLocation: 'Bengaluru' }
  ],
  notices: [
    { id: 1, title: 'Mid-Semester Examinations Schedule', category: 'EXAM', postedDate: '2026-10-02', content: 'Mid-Term examinations commence 15th October 2026.' },
    { id: 2, title: 'National AI Hackathon 2026', category: 'EVENT', postedDate: '2026-10-01', content: 'Register your teams for the 36-hour Generative AI Hackathon.' },
    { id: 3, title: 'TCS Digital Recruitment Drive', category: 'PLACEMENT', postedDate: '2026-09-30', content: 'Eligible students must register before 10th October.' }
  ],
  student: {
    rollNumber: "24EG106A18",
    branch: "Computer Science & Engineering",
    semester: 6,
    section: "A",
    cgpa: 8.45,
    attendancePercentage: 82,
    backlogs: 0
  },
  students: [
    {
      id: 1,
      rollNumber: "24EG106A18",
      branch: "Computer Science & Engineering",
      semester: 6,
      section: "A",
      cgpa: 8.45,
      attendancePercentage: 82,
      backlogs: 0,
      user: { fullName: "Akshaya Narayana" }
    }
  ]
};

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [dashboardData, setDashboardData] = useState(DEFAULT_SEEDED_DATA);
  const [loading, setLoading] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Normalize role string (handles "ROLE_ADMIN", "ADMIN", "ROLE_STUDENT", "STUDENT", case-insensitive)
  const getNormalizedRole = (role) => {
    if (!role) return 'STUDENT';
    const clean = String(role).toUpperCase().replace('ROLE_', '').trim();
    return clean;
  };

  const userRole = currentUser ? getNormalizedRole(currentUser.role) : 'STUDENT';

  const fetchRoleData = async (user) => {
    if (!user) return;
    const role = getNormalizedRole(user?.role);
    try {
      let res;
      if (role === 'STUDENT') res = await getStudentDashboard();
      else if (role === 'FACULTY') res = await getFacultyDashboard();
      else if (role === 'HOD') res = await getHodDashboard();
      else if (role === 'PLACEMENT') res = await getPlacementDashboard();
      else if (role === 'ADMIN') res = await getAdminDashboard();
      
      if (res) {
        setDashboardData(res);
      }
    } catch (err) {
      console.warn("Backend API call deferred, rendered local seed data:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchRoleData(currentUser);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setDashboardData(DEFAULT_SEEDED_DATA);
    setActiveSidebarItem('dashboard');
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={(u) => { setCurrentUser(u); setActiveSidebarItem('dashboard'); }} />;
  }

  // Navigation Items per Role
  const getNavItems = (role) => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (role === 'STUDENT') {
      return [
        ...common,
        { id: 'profile', label: 'My Profile', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CheckSquare },
        { id: 'timetable', label: 'Timetable', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'placements', label: 'Placements', icon: Briefcase },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'FACULTY') {
      return [
        ...common,
        { id: 'students', label: 'Student Roster', icon: Users },
        { id: 'assignments', label: 'Coursework', icon: FileText },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'HOD') {
      return [
        ...common,
        { id: 'students', label: 'Department Roster', icon: Users },
        { id: 'notices', label: 'Circulars', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else if (role === 'PLACEMENT') {
      return [
        ...common,
        { id: 'drives', label: 'Placement Drives', icon: Briefcase },
        { id: 'notices', label: 'Circulars', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    } else {
      // ADMIN
      return [
        ...common,
        { id: 'users', label: 'User Directory', icon: Users },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'ai', label: '✦ Campus AI', icon: Sparkles, isAi: true }
      ];
    }
  };

  const navItems = getNavItems(userRole);

  const renderDashboardView = () => {
    switch (userRole) {
      case 'STUDENT':
        return (
          <StudentDashboardView 
            data={dashboardData} 
            activeSidebarItem={activeSidebarItem} 
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
      case 'FACULTY':
        return (
          <FacultyDashboardView 
            data={dashboardData} 
            activeSidebarItem={activeSidebarItem} 
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
      case 'HOD':
        return (
          <HodDashboardView 
            data={dashboardData} 
            activeSidebarItem={activeSidebarItem} 
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
      case 'PLACEMENT':
        return (
          <PlacementDashboardView 
            data={dashboardData} 
            activeSidebarItem={activeSidebarItem} 
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
      case 'ADMIN':
      default:
        return (
          <AdminDashboardView 
            data={dashboardData} 
            activeSidebarItem={activeSidebarItem} 
            setActiveSidebarItem={setActiveSidebarItem}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-[#1E293B]">
      
      {/* 1. Deep Navy Sidebar (#0F172A) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Institution Logo Brand */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center font-bold text-white shadow-md shadow-[#2563EB]/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight uppercase">Campus</h1>
                <p className="text-[11px] font-semibold text-[#14B8A6] tracking-wider uppercase">Management</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Menu Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarItem === item.id;
              
              if (item.isAi) {
                return (
                  <div key={item.id} className="pt-3">
                    <button
                      onClick={() => { setActiveSidebarItem(item.id); setMobileSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#14B8A6] text-white shadow-md shadow-[#14B8A6]/20'
                          : 'bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 hover:bg-[#14B8A6]/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                        <span>CAMPUS AI</span>
                      </div>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">
                        RAG
                      </span>
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveSidebarItem(item.id); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900/80 rounded-xl p-3 flex items-center justify-between">
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{currentUser.fullName || currentUser.username}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.department || userRole}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">AI-Powered Campus Management System</h2>
              <p className="text-xs text-[#64748B]">Institutional Portal • Academic Year 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
              ONLINE
            </span>
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-bold text-xs flex items-center justify-center">
                {(currentUser.fullName || currentUser.username || "A").charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-[#0F172A] block leading-tight">
                  {currentUser.fullName || currentUser.username}
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {renderDashboardView()}
        </main>
      </div>

    </div>
  );
}

export default App;
