'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Users,
  Plus,
  Edit2,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Image as ImageIcon,
  FlaskConical,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import {
  useFacultyStore,
  getAllDepartmentsList,
  addFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
  updateDepartment,
  resetFacultyDataToDefaults,
  exportFacultyDataJSON,
  importFacultyDataJSON,
  getDepartment
} from '../services/facultyStore';
import { StaffMember, FACULTY_PORTRAIT_POOL } from '../data/facultyDefaultData';

interface FacultyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDeptId?: string;
  initialMember?: StaffMember;
  initialMemberIndex?: number;
  initialTab?: 'members' | 'overview' | 'import-export';
}

export const FacultyManagerModal: React.FC<FacultyManagerModalProps> = ({
  isOpen,
  onClose,
  initialDeptId = 'sci-cs',
  initialMember,
  initialMemberIndex,
  initialTab = 'members'
}) => {
  const { store, hasCustomModifications } = useFacultyStore();
  const allDepartments = useMemo(() => getAllDepartmentsList(), [store]);

  const [selectedDeptId, setSelectedDeptId] = useState(initialDeptId);
  const [activeTab, setActiveTab] = useState<'members' | 'overview' | 'import-export'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialDeptId) setSelectedDeptId(initialDeptId);
      if (initialTab) setActiveTab(initialTab);
      if (initialMember) {
        setIsEditingMember(true);
        setEditingIndex(typeof initialMemberIndex === 'number' ? initialMemberIndex : null);
        setFormName(initialMember.name || '');
        setFormDesignation(initialMember.designation || 'Assistant Professor');
        setFormQualification(initialMember.qualification || 'Ph.D.');
        setFormSpecialization(initialMember.specialization || '');
        setFormResearchAreas(initialMember.researchAreas || '');
        setFormEmail(initialMember.email || '');
        setFormPhone(initialMember.phone || '');
        setFormAddress(initialMember.address || '');
        setFormHecSupervisor(initialMember.hecApprovedSupervisor || 'Yes');
        setFormImage(initialMember.image || FACULTY_PORTRAIT_POOL[0]);
      }
    }
  }, [isOpen, initialDeptId, initialTab, initialMember, initialMemberIndex]);

  // Form State for Adding / Editing Staff Member
  const [isEditingMember, setIsEditingMember] = useState(!!initialMember);
  const [editingIndex, setEditingIndex] = useState<number | null>(
    typeof initialMemberIndex === 'number' ? initialMemberIndex : null
  );

  const [formName, setFormName] = useState(initialMember?.name || '');
  const [formDesignation, setFormDesignation] = useState(initialMember?.designation || 'Assistant Professor');
  const [formQualification, setFormQualification] = useState(initialMember?.qualification || 'Ph.D.');
  const [formSpecialization, setFormSpecialization] = useState(initialMember?.specialization || '');
  const [formResearchAreas, setFormResearchAreas] = useState(initialMember?.researchAreas || '');
  const [formEmail, setFormEmail] = useState(initialMember?.email || '');
  const [formPhone, setFormPhone] = useState(initialMember?.phone || '');
  const [formAddress, setFormAddress] = useState(initialMember?.address || '');
  const [formHecSupervisor, setFormHecSupervisor] = useState(initialMember?.hecApprovedSupervisor || 'Yes');
  const [formImage, setFormImage] = useState(initialMember?.image || FACULTY_PORTRAIT_POOL[0]);

  // JSON Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Department Overview Edit Form
  const currentDept = useMemo(() => getDepartment(selectedDeptId), [selectedDeptId, store]);
  const [overviewTopPara, setOverviewTopPara] = useState(currentDept?.paragraphsTop[0] || '');
  const [newLabName, setNewLabName] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const resetMemberForm = () => {
    setIsEditingMember(false);
    setEditingIndex(null);
    setFormName('');
    setFormDesignation('Assistant Professor');
    setFormQualification('Ph.D.');
    setFormSpecialization('');
    setFormResearchAreas('');
    setFormEmail('');
    setFormPhone('');
    setFormAddress('');
    setFormHecSupervisor('Yes');
    setFormImage(FACULTY_PORTRAIT_POOL[0]);
  };

  const handleStartEdit = (member: StaffMember, index: number) => {
    setIsEditingMember(true);
    setEditingIndex(index);
    setFormName(member.name);
    setFormDesignation(member.designation);
    setFormQualification(member.qualification);
    setFormSpecialization(member.specialization);
    setFormResearchAreas(member.researchAreas || '');
    setFormEmail(member.email);
    setFormPhone(member.phone || '');
    setFormAddress(member.address || '');
    setFormHecSupervisor(member.hecApprovedSupervisor || 'Yes');
    setFormImage(member.image || FACULTY_PORTRAIT_POOL[0]);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      alert('Please provide full name and email address.');
      return;
    }

    const memberData: StaffMember = {
      name: formName.trim(),
      designation: formDesignation.trim(),
      qualification: formQualification.trim(),
      specialization: formSpecialization.trim(),
      researchAreas: formResearchAreas.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      address: formAddress.trim(),
      hecApprovedSupervisor: formHecSupervisor,
      image: formImage.trim() || FACULTY_PORTRAIT_POOL[0]
    };

    if (editingIndex !== null) {
      updateFacultyMember(selectedDeptId, editingIndex, memberData);
      showToast(`Updated "${formName}" successfully!`);
    } else {
      addFacultyMember(selectedDeptId, memberData);
      showToast(`Added "${formName}" to ${currentDept?.name || selectedDeptId}!`);
    }

    resetMemberForm();
  };

  const handleDeleteMember = (index: number, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from this department?`)) {
      deleteFacultyMember(selectedDeptId, index);
      showToast(`Removed "${name}" from department.`);
      if (editingIndex === index) {
        resetMemberForm();
      }
    }
  };

  const handleSaveDepartmentOverview = () => {
    if (!currentDept) return;
    const newTop = [...currentDept.paragraphsTop];
    newTop[0] = overviewTopPara;
    updateDepartment(selectedDeptId, { paragraphsTop: newTop });
    showToast('Department overview updated successfully!');
  };

  const handleAddLab = () => {
    if (!newLabName.trim() || !currentDept) return;
    const currentLabs = currentDept.societiesOrLabs || [];
    updateDepartment(selectedDeptId, {
      societiesOrLabs: [...currentLabs, newLabName.trim()]
    });
    setNewLabName('');
    showToast('Research lab added!');
  };

  const handleRemoveLab = (idx: number) => {
    if (!currentDept) return;
    const currentLabs = currentDept.societiesOrLabs || [];
    const updated = currentLabs.filter((_, i) => i !== idx);
    updateDepartment(selectedDeptId, { societiesOrLabs: updated });
    showToast('Research lab removed.');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const res = importFacultyDataJSON(importJsonText);
    if (res.success) {
      setImportStatus({ type: 'success', text: res.message });
      showToast('Faculty data imported!');
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus({ type: 'error', text: res.message });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
        const res = importFacultyDataJSON(content);
        if (res.success) {
          setImportStatus({ type: 'success', text: 'File loaded & saved successfully!' });
          showToast('JSON loaded successfully!');
        } else {
          setImportStatus({ type: 'error', text: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  const filteredStaff = (currentDept?.staffList || []).filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.designation.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.specialization.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#163887] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-[#e8a62a]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  Dynamic Faculty & Department Manager
                </h2>
                <span className="bg-[#e8a62a] text-[#071b2d] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  No Code Required
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Instantly add, edit, or remove faculty members and department details across the live website.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Alert */}
        {saveToast && (
          <div className="bg-blue-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-200" />
              {saveToast}
            </span>
            <span className="text-blue-200 text-[11px]">Updates are live immediately</span>
          </div>
        )}

        {/* Department Selector & Navigation Tabs */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Department Dropdown */}
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-stone-500 shrink-0" />
            <label className="text-xs font-bold text-stone-700 shrink-0">Department:</label>
            <select
              value={selectedDeptId}
              onChange={(e) => {
                setSelectedDeptId(e.target.value);
                resetMemberForm();
              }}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#163887] shadow-xs max-w-xs sm:max-w-md truncate"
            >
              {allDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.staffCount} staff) - [{dept.facultyName}]
                </option>
              ))}
            </select>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-stone-200/70 p-1 rounded-xl text-xs font-bold text-stone-700">
            <button
              type="button"
              onClick={() => setActiveTab('members')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'members'
                  ? 'bg-white text-black shadow-xs'
                  : 'hover:text-stone-900'
              }`}
            >
              Faculty Members ({currentDept?.staffList.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-black shadow-xs'
                  : 'hover:text-stone-900'
              }`}
            >
              Dept Overview & Labs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('import-export')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'import-export'
                  ? 'bg-white text-black shadow-xs'
                  : 'hover:text-stone-900'
              }`}
            >
              Backup / JSON Import
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* ====================================================
              TAB 1: FACULTY MEMBERS (ADD, EDIT, DELETE)
          ==================================================== */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              
              {/* Form Section: Add or Edit Faculty Member */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    {isEditingMember ? (
                      <>
                        <Edit2 className="w-4 h-4 text-black" />
                        <h3 className="text-sm font-bold text-stone-900">
                          Edit Faculty Member: <span className="text-black">{formName || 'Selected Member'}</span>
                        </h3>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-black" />
                        <h3 className="text-sm font-bold text-stone-900">
                          Add New Faculty Member to <span className="text-black">{currentDept?.shortLabel || 'Department'}</span>
                        </h3>
                      </>
                    )}
                  </div>

                  {isEditingMember && (
                    <button
                      type="button"
                      onClick={resetMemberForm}
                      className="text-xs text-stone-600 hover:text-stone-900 underline font-medium cursor-pointer"
                    >
                      Cancel & Add New Instead
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveMember} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Full Name with Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Muhammad Asif"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Designation *
                      </label>
                      <select
                        value={formDesignation}
                        onChange={(e) => setFormDesignation(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      >
                        <option value="Chairman / Professor">Chairman / Professor</option>
                        <option value="Director / Professor">Director / Professor</option>
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Adjunct Professor">Adjunct Professor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Qualification
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ph.D. (UAF) • Post-Doc (UK)"
                        value={formQualification}
                        onChange={(e) => setFormQualification(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@uaf.edu.pk"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Office Phone & Extension
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. +92419200161 - Ext. 2931"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        HEC Approved Supervisor?
                      </label>
                      <select
                        value={formHecSupervisor}
                        onChange={(e) => setFormHecSupervisor(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      >
                        <option value="Yes">Yes (HEC Approved)</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Academic Specialization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Machine Learning, Plant Pathology, Weed Control"
                        value={formSpecialization}
                        onChange={(e) => setFormSpecialization(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Profile Image URL (or choose below)
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Research Narrative / Biography
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Summary of research areas, projects, and academic background..."
                      value={formResearchAreas}
                      onChange={(e) => setFormResearchAreas(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                    />
                  </div>

                  {/* Quick Portrait Suggestion Selector */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-stone-500">
                      Or pick from sample faculty portraits:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {FACULTY_PORTRAIT_POOL.map((pUrl, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setFormImage(pUrl)}
                          className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-transform cursor-pointer ${
                            formImage === pUrl
                              ? 'border-[#163887] scale-105 ring-2 ring-blue-300'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <img src={pUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    {isEditingMember && (
                      <button
                        type="button"
                        onClick={resetMemberForm}
                        className="px-4 py-2 rounded-lg border border-stone-300 bg-white text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isEditingMember ? 'Update Faculty Member' : 'Save & Add Faculty Member'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Members List Header & Search */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    Faculty & Staff in {currentDept?.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Total: {currentDept?.staffList.length || 0} members • Instant live sync
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163887]"
                  />
                </div>
              </div>

              {/* Members Cards / Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredStaff.map((staff, idx) => (
                  <div
                    key={staff.name + idx}
                    className="bg-white border border-stone-200 rounded-xl p-3.5 flex items-start gap-3.5 hover:shadow-md transition-shadow group relative"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <img
                        src={staff.image || FACULTY_PORTRAIT_POOL[0]}
                        alt={staff.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-black truncate">
                          {staff.name}
                        </h4>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(staff, idx)}
                            className="p-1 rounded hover:bg-stone-100 text-stone-600 hover:text-blue-700 transition-colors cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(idx, staff.name)}
                            className="p-1 rounded hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-stone-700 truncate">
                        {staff.designation} • <span className="font-normal text-stone-500">{staff.qualification}</span>
                      </p>

                      <div className="text-[11px] text-stone-500 space-y-0.5 pt-0.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{staff.email}</span>
                        </div>
                        {staff.phone && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                            <span className="truncate">{staff.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredStaff.length === 0 && (
                  <div className="col-span-full py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                    No faculty members found matching your search.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ====================================================
              TAB 2: DEPARTMENT OVERVIEW & RESEARCH LABS
          ==================================================== */}
          {activeTab === 'overview' && currentDept && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                <h3 className="font-bold text-sm text-stone-900 border-b border-stone-200 pb-2">
                  Department Narrative & Overview
                </h3>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Department Title
                  </label>
                  <input
                    type="text"
                    value={currentDept.name}
                    onChange={(e) =>
                      updateDepartment(selectedDeptId, { name: e.target.value })
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Primary Overview Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={overviewTopPara}
                    onChange={(e) => setOverviewTopPara(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleSaveDepartmentOverview}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Paragraph</span>
                    </button>
                  </div>
                </div>

                {/* Research Labs & Specialized Units */}
                <div className="pt-3 border-t border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800">
                    Research Laboratories & Specialized Societies
                  </h4>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new research laboratory or specialized cell..."
                      value={newLabName}
                      onChange={(e) => setNewLabName(e.target.value)}
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#163887] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddLab}
                      className="px-4 py-1.5 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lab</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {(currentDept.societiesOrLabs || []).map((lab, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-800"
                      >
                        <div className="flex items-center gap-2">
                          <FlaskConical className="w-3.5 h-3.5 text-black" />
                          <span>{lab}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLab(lIdx)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remove Lab"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ====================================================
              TAB 3: BACKUP / IMPORT & EXPORT JSON (NO CODE)
          ==================================================== */}
          {activeTab === 'import-export' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">
                      No-Code Data Management & Backups
                    </h3>
                    <p className="text-xs text-amber-800 leading-relaxed mt-1">
                      Instead of writing code, you can export all your current faculty and department data to a simple JSON file, edit it in any text editor, or upload a JSON file to update everything in 1 second!
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={exportFacultyDataJSON}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Faculty Data JSON File</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-bold text-xs shadow-xs transition-all cursor-pointer">
                    <Upload className="w-4 h-4 text-black" />
                    <span>Upload JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {hasCustomModifications && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset all faculty and department data back to original UAF defaults?')) {
                          resetFacultyDataToDefaults();
                          showToast('Faculty data reset to defaults.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-all cursor-pointer ml-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Paste JSON Manually Box */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-stone-800">
                  Paste Custom JSON Directly:
                </h4>
                <textarea
                  rows={6}
                  placeholder="Paste JSON content here..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-mono text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163887]"
                />

                {importStatus && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      importStatus.type === 'success'
                        ? 'bg-blue-50 text-black border border-blue-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {importStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{importStatus.text}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleImportJson}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#163887] hover:bg-[#102a6b] text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Apply JSON Data</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Changes persist automatically across browser visits.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done & Return to Portal
          </button>
        </div>

      </div>
    </div>
  );
};
