import React, { useState } from 'react';
import { Building2, Briefcase, TrendingUp, CheckCircle2 } from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function PlacementDashboardView({ data, activeSidebarItem }) {
  const [internalTab, setInternalTab] = useState('overview');
  const currentView = activeSidebarItem && activeSidebarItem !== 'dashboard' 
    ? activeSidebarItem 
    : internalTab;

  const drives = data?.drives || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Training & Placement Operations</span>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">Corporate Relations & Placement Cell</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Drive scheduling, recruiter coordinates, and student eligibility filtering.
          </p>
        </div>
        <button 
          onClick={() => setInternalTab('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          ✦ Campus AI Recruiter Assistant
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Registered Drives</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalDrives || 3}</div>
          <span className="text-xs text-[#2563EB] font-medium mt-1 block">Active on campus</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#16A34A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Active Windows</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#16A34A] mt-2">{data?.activeDrives || 2}</div>
          <span className="text-xs text-[#16A34A] font-medium mt-1 block">Applications open</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Highest Package</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F766E] mt-2">16.0 LPA</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Amazon AWS Cloud</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Eligible Batch</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">612</div>
          <span className="text-xs text-[#64748B] font-medium mt-1 block">Above 7.0 CGPA</span>
        </div>
      </div>

      {currentView === 'ai' ? (
        <AiAssistantWidget />
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2563EB]" />
            Corporate Placement Drives & Criteria
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drives.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#0F172A]">{d.companyName}</span>
                    <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                      {d.packageLPA}
                    </span>
                  </div>
                  <div className="text-xs text-[#2563EB] font-bold mt-1">{d.roleName}</div>
                  <div className="mt-3 space-y-1.5 text-xs text-[#64748B]">
                    <div>Minimum CGPA: <span className="text-[#0F172A] font-bold">{d.minCgpa}</span></div>
                    <div>Max Backlogs: <span className="text-[#0F172A] font-bold">{d.maxBacklogs}</span></div>
                    <div>Eligible Branches: <span className="text-[#0F172A]">{d.eligibleBranches}</span></div>
                    <div>Location: <span className="text-[#0F172A]">{d.jobLocation}</span></div>
                    <div>Drive Date: <span className="text-[#0F172A] font-medium">{d.driveDate}</span></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    d.status === 'ACTIVE' 
                      ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]' 
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    ● {d.status}
                  </span>
                  <button className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs">
                    Manage Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementDashboardView;
