import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  Briefcase, 
  Calendar, 
  FileText, 
  Bell, 
  Sparkles, 
  ChevronRight,
  User,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Edit3,
  Trash2
} from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';
import { updateStudentProfile, deleteStudentProfile } from '../../services/api';

function StudentDashboardView({ data, activeSidebarItem, setActiveSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  const [currentName, setCurrentName] = useState(data?.user?.fullName || "Akshaya Narayana");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(currentName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    try {
      setIsSaving(true);
      await updateStudentProfile({ fullName: newName.trim() });
      setCurrentName(newName.trim());
      setIsEditingName(false);
    } catch (err) {
      console.error("Failed to update name:", err);
      // Fallback state update for offline demo
      setCurrentName(newName.trim());
      setIsEditingName(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteName = async () => {
    if (!window.confirm("Are you sure you want to remove/clear your profile name?")) return;
    try {
      setIsSaving(true);
      await deleteStudentProfile();
      setCurrentName("");
    } catch (err) {
      console.error("Failed to clear name:", err);
      setCurrentName("");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Use active sidebar item if not default dashboard, or use internalTab
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

  const student = data?.student || {
    rollNumber: "24EG106A18",
    branch: "Computer Science & Engineering",
    semester: 6,
    section: "A",
    cgpa: 8.45,
    attendancePercentage: 82,
    backlogs: 0
  };

  const assignments = data?.assignments || [];
  const placementDrives = data?.placementDrives || data?.drives || [];
  const notices = data?.notices || [];

  return (
    <div className="space-y-6">
      
      {/* 1. Profile / Navigation Top Subheader */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
            <span>Student Workspace</span>
            <span>•</span>
            <span className="font-mono text-[#64748B]">{student.rollNumber}</span>
            <span>•</span>
            <span className="text-[#059669]">B.Tech CSE Sem VI (Sec {student.section})</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Good morning, {currentName || "Student"} 👋
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Here's what's happening today in your academic portal.
          </p>
        </div>

        <button 
          onClick={() => {
            if (setActiveSidebarItem) setActiveSidebarItem('ai');
            else setInternalTab('ai');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-[#14B8A6]" />
          Ask Campus AI
        </button>
      </div>

      {/* 2. Top Metric KPI Row: Attendance, Classes, Tasks, Notices */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('attendance')}
          className="bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Attendance</span>
            <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] group-hover:scale-105 transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{student.attendancePercentage}%</div>
            <div className="text-[11px] font-medium text-[#16A34A] mt-1 flex items-center gap-1">
              <span>● Above 75% Cutoff</span>
            </div>
          </div>
        </div>

        {/* Classes Today */}
        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('timetable')}
          className="bg-white border border-[#E2E8F0] hover:border-[#14B8A6]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Classes Today</span>
            <div className="p-2 rounded-lg bg-[#F0FDFA] text-[#14B8A6] group-hover:scale-105 transition">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">3 Lectures</div>
            <div className="text-[11px] font-medium text-[#2563EB] mt-1">
              Next: 09:00 AM (LH-302)
            </div>
          </div>
        </div>

        {/* Tasks / Assignments */}
        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('assignments')}
          className="bg-white border border-[#E2E8F0] hover:border-[#F59E0B]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Pending Tasks</span>
            <div className="p-2 rounded-lg bg-[#FFFBEB] text-[#F59E0B] group-hover:scale-105 transition">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{assignments.length} Submissions</div>
            <div className="text-[11px] font-medium text-[#F59E0B] mt-1">
              Deep Learning due soon
            </div>
          </div>
        </div>

        {/* Notices */}
        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('notices')}
          className="bg-white border border-[#E2E8F0] hover:border-[#0F172A]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Circulars</span>
            <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#0F172A] group-hover:scale-105 transition">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{notices.length} New</div>
            <div className="text-[11px] font-medium text-[#16A34A] mt-1">
              Mid-term schedule out
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conditional Page Render based on currentView */}
      
      {/* CAMPUS AI PAGE */}
      {currentView === 'ai' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Campus AI Assistant</h3>
              <p className="text-xs text-[#64748B]">Context-aware RAG assistant indexed with university handbook and syllabus</p>
            </div>
          </div>
          <AiAssistantWidget isCompact={false} />
        </div>
      )}

      {/* MY PROFILE PAGE */}
      {currentView === 'profile' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-2xl border border-[#DBEAFE]">
                {currentName ? currentName.charAt(0).toUpperCase() : "S"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  {currentName || <span className="text-[#94A3B8] italic">(No Name Specified)</span>}
                </h3>
                <p className="text-xs text-[#64748B] font-mono mt-0.5">Roll No: {student.rollNumber} • {student.branch}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                  ● Regular Student • Semester VI
                </span>
              </div>
            </div>

            {/* Edit / Delete Action Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {!isEditingName ? (
                <>
                  <button
                    onClick={() => {
                      setNewName(currentName);
                      setIsEditingName(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-bold transition cursor-pointer border border-[#BFDBFE]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Name
                  </button>
                  <button
                    onClick={handleDeleteName}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#DC2626] text-xs font-bold transition cursor-pointer border border-[#FECACA]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Name
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* Inline Edit Form */}
          {isEditingName && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
              <div className="text-xs font-bold text-[#166534] flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                Edit Student Profile Name
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter full name"
                  className="flex-1 px-3.5 py-2 text-sm bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
                <button
                  onClick={handleSaveName}
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3.5 py-2 bg-white hover:bg-[#F1F5F9] text-[#64748B] text-xs font-bold rounded-xl border border-[#CBD5E1] transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#64748B] uppercase">Academic CGPA</span>
              <div className="text-2xl font-bold text-[#2563EB] mt-1">{student.cgpa} / 10.0</div>
              <p className="text-xs text-[#64748B] mt-1">Distinction Grade</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#64748B] uppercase">Attendance Percentage</span>
              <div className="text-2xl font-bold text-[#16A34A] mt-1">{student.attendancePercentage}%</div>
              <p className="text-xs text-[#64748B] mt-1">Exam Hall Ticket Permitted</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#64748B] uppercase">Active Backlogs</span>
              <div className="text-2xl font-bold text-[#0F172A] mt-1">{student.backlogs}</div>
              <p className="text-xs text-[#16A34A] mt-1">All Clear</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
            <div className="font-bold text-[#0F172A] text-sm mb-2">Student Information Record</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#475569]">
              <div>Email: <span className="text-[#0F172A] font-semibold">{data?.user?.email || "akshaya@campus.edu"}</span></div>
              <div>Department: <span className="text-[#0F172A] font-semibold">{student.branch}</span></div>
              <div>Section: <span className="text-[#0F172A] font-semibold">Section {student.section}</span></div>
              <div>Academic Year: <span className="text-[#0F172A] font-semibold">2026</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ATTENDANCE PAGE */}
      {currentView === 'attendance' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Attendance & Academic Eligibility</h3>
              <p className="text-xs text-[#64748B]">University Regulation Clause 4.2: Minimum 75% aggregate attendance required for Semester-End Exams.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              ● Overall: {student.attendancePercentage}% (ELIGIBLE)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: 'Deep Learning', present: 28, total: 32, pct: 87.5, faculty: 'Prof. Rajesh Smith' },
              { subject: 'Web Programming & Microservices', present: 26, total: 30, pct: 86.6, faculty: 'Dr. K. V. Rao' },
              { subject: 'Cloud Computing & DevOps', present: 22, total: 30, pct: 73.3, faculty: 'Prof. Ananya Sen' }
            ].map((sub, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-sm font-bold text-[#0F172A]">{sub.subject}</div>
                <div className="text-xs text-[#64748B] mt-0.5">{sub.faculty}</div>
                <div className="text-2xl font-bold mt-3" style={{ color: sub.pct >= 75 ? '#16A34A' : '#DC2626' }}>
                  {sub.pct}%
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  Attended {sub.present} of {sub.total} classes
                </div>
                <div className="mt-3 w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all" 
                    style={{ 
                      width: `${sub.pct}%`, 
                      backgroundColor: sub.pct >= 75 ? '#16A34A' : '#DC2626' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIMETABLE PAGE */}
      {currentView === 'timetable' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Weekly Lecture Timetable</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1E293B]">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3.5">Day</th>
                  <th className="p-3.5">09:00 - 10:00</th>
                  <th className="p-3.5">10:00 - 11:00</th>
                  <th className="p-3.5">11:00 - 12:00</th>
                  <th className="p-3.5">01:00 - 02:00</th>
                  <th className="p-3.5">02:00 - 04:00</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {[
                  { day: 'Monday', c1: 'Deep Learning (LH-302)', c2: 'Library / Self Study', c3: 'Web Programming (Lab 4)', c4: 'Break', c5: 'Cloud Computing Lab' },
                  { day: 'Tuesday', c1: 'Cloud Computing (LH-201)', c2: 'Deep Learning (LH-302)', c3: 'Cyber Security (LH-101)', c4: 'Break', c5: 'Web Programming' },
                  { day: 'Wednesday', c1: 'Web Programming', c2: 'Cloud Computing', c3: 'Deep Learning', c4: 'Break', c5: 'Deep Learning Lab' },
                  { day: 'Thursday', c1: 'Cyber Security', c2: 'Technical Seminar', c3: 'Web Programming', c4: 'Break', c5: 'Placement Training' },
                  { day: 'Friday', c1: 'Deep Learning', c2: 'Cloud Computing', c3: 'Mentoring Session', c4: 'Break', c5: 'Mini Project Lab' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="p-3.5 font-bold text-[#0F172A]">{row.day}</td>
                    <td className="p-3.5 text-[#2563EB]">{row.c1}</td>
                    <td className="p-3.5">{row.c2}</td>
                    <td className="p-3.5 text-[#2563EB]">{row.c3}</td>
                    <td className="p-3.5 text-[#64748B]">{row.c4}</td>
                    <td className="p-3.5 font-medium">{row.c5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ASSIGNMENTS PAGE */}
      {currentView === 'assignments' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Coursework & Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((a) => (
              <div key={a.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                  <h4 className="text-sm font-bold text-[#0F172A] mt-1">{a.title}</h4>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{a.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#64748B]">Due Date: {a.dueDate}</span>
                  <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition">
                    Upload Solution
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLACEMENTS PAGE */}
      {currentView === 'placements' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Active Placement Opportunities</h3>
              <p className="text-xs text-[#64748B]">Companies offering campus recruitment drives for B.Tech CSE 2026 batch</p>
            </div>
            <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#BBF7D0]">
              Eligible for all active drives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {placementDrives.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#0F172A]">{d.companyName}</span>
                    <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#BBF7D0]">
                      {d.packageLPA}
                    </span>
                  </div>
                  <div className="text-xs text-[#2563EB] font-bold mt-1">{d.roleName}</div>
                  <div className="mt-3 space-y-1.5 text-xs text-[#64748B]">
                    <div>Minimum CGPA: <span className="text-[#0F172A] font-bold">{d.minCgpa}</span></div>
                    <div>Backlog Cutoff: <span className="text-[#0F172A] font-bold">0</span></div>
                    <div>Eligible: <span className="text-[#0F172A]">{d.eligibleBranches}</span></div>
                    <div>Drive Date: <span className="text-[#0F172A] font-medium">{d.driveDate}</span></div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs">
                  Apply for Drive
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTICES PAGE */}
      {currentView === 'notices' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Campus Announcements & Circulars</h3>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                    {n.category}
                  </span>
                  <span className="text-xs text-[#64748B]">{n.postedDate}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mt-2">{n.title}</h4>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEFAULT DASHBOARD: 2-Column Split (Schedule & Tasks on Left, Compact Campus AI on Right) */}
      {currentView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Schedule + Assignments */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Today's Schedule */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  Today's Schedule
                </h3>
                <span className="text-xs text-[#64748B] font-medium">B.Tech VI Sem • Block B</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '09:00 - 10:00 AM', subject: 'Deep Learning', room: 'LH-302', faculty: 'Prof. Rajesh Smith' },
                  { time: '11:00 - 12:00 PM', subject: 'Web Programming', room: 'Lab 4', faculty: 'Dr. K. V. Rao' },
                  { time: '02:00 - 03:00 PM', subject: 'Cloud Computing', room: 'LH-201', faculty: 'Prof. Ananya Sen' }
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-10 rounded-full bg-[#2563EB]"></div>
                      <div>
                        <div className="text-sm font-bold text-[#1E293B]">{c.subject}</div>
                        <div className="text-xs text-[#64748B]">{c.faculty} • {c.room}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Quick View */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F59E0B]" />
                  Upcoming Submissions
                </h3>
                <button 
                  onClick={() => {
                    if (setActiveSidebarItem) setActiveSidebarItem('assignments');
                    else setInternalTab('assignments');
                  }}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer"
                >
                  View All ({assignments.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {assignments.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                      <h4 className="text-sm font-bold text-[#1E293B] mt-0.5">{a.title}</h4>
                      <p className="text-xs text-[#64748B] mt-1">Due: {a.dueDate} • {a.totalMarks} Marks</p>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold cursor-pointer shadow-xs transition">
                      Submit
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Compact Campus AI Widget directly on main dashboard */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <AiAssistantWidget isCompact={true} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentDashboardView;
