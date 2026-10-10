import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  Users, 
  Layers, 
  Bell, 
  UserPlus, 
  Database, 
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  Settings,
  Plus
} from 'lucide-react';
import AiAssistantWidget from '../../components/ai/AiAssistantWidget';

function AdminDashboardView({ data, activeSidebarItem, setActiveSidebarItem }) {
  const users = data?.allUsers || [];
  const notices = data?.notices || [];

  // When activeSidebarItem is 'users' -> render full User Directory
  if (activeSidebarItem === 'users') {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">Institutional Administration</div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Institutional User Directory</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">Role-Based Access Control (RBAC) Accounts & Privileges</p>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1E293B]">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3.5">Username</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Role Privilege</th>
                  <th className="p-3.5">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3.5 font-mono font-bold text-[#0F172A]">{u.username}</td>
                    <td className="p-3.5 font-medium">{u.fullName}</td>
                    <td className="p-3.5 text-[#64748B]">{u.email}</td>
                    <td className="p-3.5">{u.department}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                        {u.role ? u.role.replace('ROLE_', '') : 'USER'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[#16A34A] font-bold flex items-center gap-1">
                        ● ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // When activeSidebarItem is 'notices' -> render full Notices Page
  if (activeSidebarItem === 'notices') {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">Institutional Administration</div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Campus Circulars & Broadcasts</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">Manage notifications and circulars broadcasted to students and faculty</p>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>Create Circular</span>
          </button>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                      {n.category}
                    </span>
                    <span className="text-xs text-[#64748B]">{n.postedDate}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A] mt-2">{n.title}</h4>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">{n.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // When activeSidebarItem is 'ai' -> render full Campus AI Page
  if (activeSidebarItem === 'ai') {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-1">RAG Engine Active</div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Campus AI Assistant</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">Query academic regulations, compliance criteria, and institution policies</p>
        </div>
        <AiAssistantWidget isCompact={false} />
      </div>
    );
  }

  // DEFAULT: Dashboard Overview
  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Institutional Administration</span>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">Campus Management Admin Control Hub</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Global access controls, user authorization, and system policies.
          </p>
        </div>
        <button 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('ai')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#14B8A6]/30 text-xs font-bold transition cursor-pointer self-start md:self-auto shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-[#14B8A6]" />
          ✦ Campus AI Regulations
        </button>
      </div>

      {/* 2. Top Metric KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('users')}
          className="bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Registered Users</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalUsers || 5}</div>
          <span className="text-xs text-[#2563EB] font-medium mt-1 block">5 Active Roles</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#14B8A6]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Total Students</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalStudents || 1}</div>
          <span className="text-xs text-[#14B8A6] font-medium mt-1 block">B.Tech Batch 2026</span>
        </div>

        <div 
          onClick={() => setActiveSidebarItem && setActiveSidebarItem('notices')}
          className="bg-white border border-[#E2E8F0] hover:border-[#F59E0B]/40 rounded-2xl p-5 shadow-xs relative overflow-hidden cursor-pointer transition group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Published Notices</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalNotices || 3}</div>
          <span className="text-xs text-[#F59E0B] font-medium mt-1 block">Campus circulars</span>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F172A]"></div>
          <span className="text-xs font-semibold text-[#64748B] uppercase">Placement Drives</span>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">{data?.totalDrives || 3}</div>
          <span className="text-xs text-[#16A34A] font-medium mt-1 block">Recruiters live</span>
        </div>
      </div>

      {/* 3. 2-Column Split: User Accounts Preview + Compact Campus AI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): User Directory Preview + Recent Activity */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* User Directory Preview */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-[#2563EB]" />
                Active User Accounts
              </h3>
              <button 
                onClick={() => setActiveSidebarItem && setActiveSidebarItem('users')}
                className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                Manage Users →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E293B]">
                <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-bold border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {users.slice(0, 4).map((u) => (
                    <tr key={u.id} className="hover:bg-[#F8FAFC]">
                      <td className="p-3 font-mono font-bold text-[#0F172A]">{u.username}</td>
                      <td className="p-3 font-medium">{u.fullName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                          {u.role ? u.role.replace('ROLE_', '') : 'USER'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-[#16A34A] font-bold text-[11px]">● ACTIVE</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent System Activity */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              Recent System Activity
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { text: 'Student profile verified: Akshaya Narayana (24EG106A18)', time: '10 minutes ago', badge: 'STUDENT', badgeColor: 'bg-[#EFF6FF] text-[#2563EB]' },
                { text: 'Mid-Semester examination circular broadcasted to 612 students', time: '32 minutes ago', badge: 'EXAM', badgeColor: 'bg-[#FFFBEB] text-[#D97706]' },
                { text: 'Corporate placement drive registered: TCS Digital (9.0 LPA)', time: '1 hour ago', badge: 'PLACEMENT', badgeColor: 'bg-[#DCFCE7] text-[#16A34A]' },
                { text: 'Faculty assignment published: Transformer Self-Attention', time: '3 hours ago', badge: 'ACADEMIC', badgeColor: 'bg-[#F5F3FF] text-[#7C3AED]' }
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.badgeColor}`}>
                      {act.badge}
                    </span>
                    <span className="font-medium text-[#1E293B]">{act.text}</span>
                  </div>
                  <span className="text-[#64748B] text-[11px] whitespace-nowrap">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-3">
              Administrative Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveSidebarItem && setActiveSidebarItem('users')}
                className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-left transition cursor-pointer"
              >
                <div className="text-xs font-bold text-[#0F172A]">+ Synchronize Departments</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">CSE, AI&DS, ECE Courses</div>
              </button>
              <button 
                onClick={() => setActiveSidebarItem && setActiveSidebarItem('notices')}
                className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-left transition cursor-pointer"
              >
                <div className="text-xs font-bold text-[#0F172A]">+ Publish Campus Circular</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Broadcast to students & faculty</div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Compact Campus AI Widget */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <AiAssistantWidget isCompact={true} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboardView;
