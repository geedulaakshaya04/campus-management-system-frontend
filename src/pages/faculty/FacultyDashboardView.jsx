import React, { useState } from 'react';
import { Users, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function FacultyDashboardView({ data, activeSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

  const students = data?.students || [];
  const assignments = data?.assignments || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Faculty Academic Management</span>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">Computer Science & Engineering Console</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Manage course lectures, attendance validation, and student assignments.
          </p>
        </div>
        <button 
          onClick={() => setInternalTab('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          ✦ Campus AI Knowledge
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Registered Students</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-[#16A34A] font-medium mt-1 block">Active across sections</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Active Assignments</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.activeAssignments || 2}</div>
          <span className="text-xs text-[#2563EB] font-medium mt-1 block">Semester VI B.Tech</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#16A34A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Average Attendance</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">82%</div>
          <span className="text-xs text-[#16A34A] font-medium mt-1 block">Meets 75% Regulation</span>
        </div>
      </div>

      {/* Router View */}
      {currentView === 'ai' ? (
        <AiAssistantWidget />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Coursework */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2563EB]" />
              Assigned Coursework & Projects
            </h3>
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#2563EB]">{a.subject}</span>
                  <div className="text-sm font-bold text-[#0F172A] mt-1">{a.title}</div>
                  <div className="text-xs text-[#64748B] mt-1">Due Date: {a.dueDate} • Maximum Marks: {a.totalMarks}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Roster */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#16A34A]" />
              Student Class Performance
            </h3>
            <div className="space-y-3">
              {students.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">{s.user?.fullName || "Akshaya Narayana"}</div>
                    <div className="text-xs text-[#64748B] font-mono">{s.rollNumber} • Section {s.section}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                      {s.attendancePercentage}% Attendance
                    </span>
                    <div className="text-xs text-[#64748B] font-medium mt-1">CGPA: {s.cgpa}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDashboardView;
