'use client';

import React, { useState } from 'react';
import {
  SUPER_ADMIN_USER,
  DEMO_DEPARTMENTS,
  setCurrentUser,
  type AuthUser
} from '../page-builder/cmsStore';
import {
  ShieldCheck,
  Building2,
  X,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'department'>('admin');
  const [selectedDeptId, setSelectedDeptId] = useState('agronomy');
  const [emailInput, setEmailInput] = useState(SUPER_ADMIN_USER.email);
  const [passwordInput, setPasswordInput] = useState('••••••••');

  if (!isOpen) return null;

  const handleAdminQuickLogin = () => {
    setCurrentUser(SUPER_ADMIN_USER);
    onLoginSuccess(SUPER_ADMIN_USER);
    onClose();
  };

  const handleDepartmentLogin = (deptId: string) => {
    const dept = DEMO_DEPARTMENTS.find((d) => d.id === deptId) || DEMO_DEPARTMENTS[0];
    const user: AuthUser = {
      email: dept.email,
      name: `${dept.name} Editor`,
      role: 'department_editor',
      departmentId: dept.id,
      departmentName: dept.name
    };
    setCurrentUser(user);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071b2d]/65 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200 select-none animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#071b2d] text-white p-6 border-b-2 border-[#e8a62a] relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/uaf_logo.png"
              alt="UAF"
              className="w-11 h-11 rounded-full bg-white p-0.5 border-2 border-[#e8a62a]"
            />
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                University Portal Sign In
              </h2>
              <p className="text-xs text-[#e8a62a] font-semibold">
                Centralized CMS & Department Page Studio
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setEmailInput(SUPER_ADMIN_USER.email);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedRole === 'admin'
                  ? 'bg-[#071b2d] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('department');
                const d = DEMO_DEPARTMENTS.find((x) => x.id === selectedDeptId);
                if (d) setEmailInput(d.email);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedRole === 'department'
                  ? 'bg-[#163887] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#e8a62a]" />
              <span>Department Editor</span>
            </button>
          </div>

          {selectedRole === 'admin' ? (
            /* Super Admin Sign In */
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-black font-bold">
                  <Sparkles className="w-4 h-4 text-[#e8a62a]" />
                  <span>Configured Super Admin Account</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-[11.5px]">
                  Sign in with your email <strong>{SUPER_ADMIN_USER.email}</strong> to review department proposals, live preview JSON pages, and approve or reject submissions.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Admin Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#163887]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Password:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#163887]"
                    />
                  </div>
                </div>
              </div>

              {/* Direct 1-Click Login Button for user */}
              <button
                type="button"
                onClick={handleAdminQuickLogin}
                className="w-full py-3 bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Sign In as {SUPER_ADMIN_USER.email}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            /* Department Editor Sign In */
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  Select Department to Edit:
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => {
                    setSelectedDeptId(e.target.value);
                    const d = DEMO_DEPARTMENTS.find((x) => x.id === e.target.value);
                    if (d) setEmailInput(d.email);
                  }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#163887]"
                >
                  {DEMO_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 space-y-1">
                <p>
                  <strong>Role:</strong> Department Page Editor
                </p>
                <p className="text-[11px] text-stone-500">
                  Allows creating and modifying department pages using standardized templates. All edits are saved in JSON and submitted to Super Admin for approval.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDepartmentLogin(selectedDeptId)}
                className="w-full py-3 bg-[#071b2d] hover:bg-[#0c2b47] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Launch Department Page Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
