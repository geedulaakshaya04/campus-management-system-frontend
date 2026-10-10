import React, { useState } from 'react';
import { Users, AlertTriangle, Layers, BookOpen, CheckCircle2 } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function HodDashboardView({ data, activeSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

  const students = data?.students || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Department Governance</span>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">HOD Department Analytics</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Academic compliance, low-attendance alerts, and faculty coordination.
          </p>
        </div>
        <button 
          onClick={() => setInternalTab('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          ✦ Campus AI Regulations
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Department Students</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-[#2563EB] font-medium mt-1 block">Registered in semester VI</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#16A34A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Attendance Below 75% Cutoff</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#16A34A] mt-2">{data?.lowAttendanceCount || 0}</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Zero students currently at risk</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Faculty Members</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalFaculty || 1}</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Active teaching staff</span>
        </div>
      </div>

      {currentView === 'ai' ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2563EB]" />
            Department Students Academic Report
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1E293B]">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3.5">Roll Number</th>
                  <th className="p-3.5">Branch & Sec</th>
                  <th className="p-3.5">CGPA</th>
                  <th className="p-3.5">Attendance</th>
                  <th className="p-3.5">Backlogs</th>
                  <th className="p-3.5">Exam Eligibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3.5 font-mono font-bold text-[#0F172A]">{s.rollNumber}</td>
                    <td className="p-3.5">{s.branch} (Sec {s.section})</td>
                    <td className="p-3.5 font-bold text-[#2563EB]">{s.cgpa}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                        {s.attendancePercentage}%
                      </span>
                    </td>
                    <td className="p-3.5 font-medium">{s.backlogs}</td>
                    <td className="p-3.5">
                      <span className="text-[#16A34A] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default HodDashboardView;
