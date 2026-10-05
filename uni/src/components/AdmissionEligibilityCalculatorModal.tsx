import React, { useState, useMemo } from 'react';
import {
  X,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Download,
  Sparkles
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../data/uafData';

interface AdmissionEligibilityCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor: () => void;
  initialProgramId?: string;
}

export const AdmissionEligibilityCalculatorModal: React.FC<AdmissionEligibilityCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenAdvisor,
  initialProgramId
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgramId || 'prog-bsc-agri');
  const [matricMarks, setMatricMarks] = useState<number>(950);
  const [matricTotal, setMatricTotal] = useState<number>(1100);
  const [interMarks, setInterMarks] = useState<number>(920);
  const [interTotal, setInterTotal] = useState<number>(1100);
  const [testMarks, setTestMarks] = useState<number>(75);
  const [testTotal, setTestTotal] = useState<number>(100);
  const [isHafiz, setIsHafiz] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync if initialProgramId changes
  React.useEffect(() => {
    if (initialProgramId) {
      setSelectedProgramId(initialProgramId);
    }
  }, [initialProgramId]);

  const selectedProgram = useMemo(() => {
    return ACADEMIC_PROGRAMS.find((p) => p.id === selectedProgramId) || ACADEMIC_PROGRAMS[0];
  }, [selectedProgramId]);

  const calculation = useMemo(() => {
    const matricPct = matricTotal > 0 ? (matricMarks / matricTotal) * 30 : 0;
    const effectiveInterMarks = interMarks + (isHafiz ? 20 : 0);
    const interPct = interTotal > 0 ? (Math.min(effectiveInterMarks, interTotal) / interTotal) * 30 : 0;
    const testPct = testTotal > 0 ? (testMarks / testTotal) * 40 : 0;

    const totalAggregate = Math.min(100, Math.max(0, matricPct + interPct + testPct));

    const cutoffs: Record<string, number> = {
      'prog-dvm': 84.5,
      'prog-bs-cs': 78.4,
      'prog-bs-biotech': 74.8,
      'prog-bs-food-tech': 73.2,
      'prog-bsc-agri-engg': 71.0,
      'prog-bsc-agri': 68.2,
      'prog-bba-agri': 64.5
    };

    const targetCutoff = cutoffs[selectedProgramId] || 68.0;
    const isEligible = totalAggregate >= targetCutoff;
    const difference = totalAggregate - targetCutoff;

    let scholarshipEligibility = 'Standard Aid Eligible';
    if (totalAggregate >= 88) {
      scholarshipEligibility = '100% Merit Tuition Waiver + Monthly Stipend';
    } else if (totalAggregate >= 80) {
      scholarshipEligibility = '50% Merit Scholarship / PEEF Eligible';
    } else if (totalAggregate >= 70) {
      scholarshipEligibility = 'HEC Need-Based & Ehsaas Eligible';
    }

    return {
      matricPct: matricPct.toFixed(2),
      interPct: interPct.toFixed(2),
      testPct: testPct.toFixed(2),
      totalAggregate: totalAggregate.toFixed(2),
      targetCutoff,
      isEligible,
      difference: difference.toFixed(2),
      scholarshipEligibility
    };
  }, [matricMarks, matricTotal, interMarks, interTotal, testMarks, testTotal, isHafiz, selectedProgramId]);

  const handleDownloadChallan = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071b2d]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#e5eaee] relative flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#071b2d] text-white p-6 sm:p-7 flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2 text-[#e8a62a] text-xs font-bold uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>Official 2026-27 Formula</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
              UAF Merit Aggregate Calculator
            </h2>
            <p className="text-white/70 text-xs sm:text-sm">
              Compute your exact aggregate percentage based on Matric (30%), Intermediate (30%), and Entry Test (40%).
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7 flex-1">
          
          {/* Program Selection */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#18212b]">
              Select Desired Degree Program:
            </label>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full p-3.5 bg-[#f5f8fa] border border-[#e5eaee] rounded-lg text-sm font-semibold text-[#18212b] focus:ring-2 focus:ring-[#0f766e] focus:outline-none cursor-pointer"
            >
              {ACADEMIC_PROGRAMS.map((prog) => (
                <option key={prog.id} value={prog.id}>
                  {prog.title} — ({prog.facultyName})
                </option>
              ))}
            </select>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Matric Block (30%) */}
            <div className="bg-[#f7f5f0] p-4.5 rounded-xl border border-[#e5eaee] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#18212b]">1. Matriculation</span>
                <span className="text-[11px] font-bold bg-[#0f766e]/10 text-[#0f766e] px-2 py-0.5 rounded">30%</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Obtained Marks:</span>
                  <input
                    type="number"
                    value={matricMarks}
                    onChange={(e) => setMatricMarks(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm font-bold text-[#18212b]"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Total Marks:</span>
                  <input
                    type="number"
                    value={matricTotal}
                    onChange={(e) => setMatricTotal(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm text-[#46505a]"
                  />
                </div>
              </div>
              <div className="text-[11px] font-bold text-[#0f766e] text-right">
                Weightage: {calculation.matricPct}%
              </div>
            </div>

            {/* Intermediate Block (30%) */}
            <div className="bg-[#f7f5f0] p-4.5 rounded-xl border border-[#e5eaee] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#18212b]">2. Intermediate (F.Sc)</span>
                <span className="text-[11px] font-bold bg-[#0f766e]/10 text-[#0f766e] px-2 py-0.5 rounded">30%</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Obtained Marks:</span>
                  <input
                    type="number"
                    value={interMarks}
                    onChange={(e) => setInterMarks(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm font-bold text-[#18212b]"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Total Marks:</span>
                  <input
                    type="number"
                    value={interTotal}
                    onChange={(e) => setInterTotal(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm text-[#46505a]"
                  />
                </div>
              </div>
              <div className="text-[11px] font-bold text-[#0f766e] text-right">
                Weightage: {calculation.interPct}%
              </div>
            </div>

            {/* Entry Test Block (40%) */}
            <div className="bg-[#f7f5f0] p-4.5 rounded-xl border border-[#e5eaee] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#18212b]">3. Entry Test</span>
                <span className="text-[11px] font-bold bg-[#e8a62a]/20 text-[#071b2d] px-2 py-0.5 rounded">40%</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Test Score:</span>
                  <input
                    type="number"
                    value={testMarks}
                    onChange={(e) => setTestMarks(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm font-bold text-[#18212b]"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#46505a] font-medium">Total Test Marks:</span>
                  <input
                    type="number"
                    value={testTotal}
                    onChange={(e) => setTestTotal(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#e5eaee] rounded text-sm text-[#46505a]"
                  />
                </div>
              </div>
              <div className="text-[11px] font-bold text-[#0f766e] text-right">
                Weightage: {calculation.testPct}%
              </div>
            </div>

          </div>

          {/* Hafiz-e-Quran Checkbox */}
          <div className="flex items-center gap-3 p-3.5 bg-[#dff5f1]/60 rounded-lg border border-[#0f766e]/20">
            <input
              type="checkbox"
              id="hafizCheck"
              checked={isHafiz}
              onChange={(e) => setIsHafiz(e.target.checked)}
              className="w-4 h-4 text-[#0f766e] rounded focus:ring-[#0f766e] cursor-pointer"
            />
            <label htmlFor="hafizCheck" className="text-xs sm:text-sm font-semibold text-[#18212b] cursor-pointer">
              Hafiz-e-Quran (+20 marks added to Intermediate score upon verification test)
            </label>
          </div>

          {/* Real-Time Aggregate Score Card */}
          <div className="bg-gradient-to-r from-[#071b2d] via-[#102a43] to-[#0f766e] text-white p-6 rounded-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-[#e8a62a] font-bold uppercase tracking-wider">
                Calculated Final Merit
              </span>
              <div className="font-serif-heading text-4xl sm:text-5xl font-bold text-white">
                {calculation.totalAggregate}%
              </div>
              <p className="text-white/80 text-xs">
                Estimated Closing Cutoff for {selectedProgram.title}: ~{calculation.targetCutoff}%
              </p>
            </div>

            <div className="text-center sm:text-right space-y-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs bg-white text-[#071b2d] shadow-sm">
                {calculation.isEligible ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Strong Admission Chance ({calculation.difference > '0' ? `+${calculation.difference}%` : '0%'} above cutoff)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Competitive Margin ({calculation.difference}% from cutoff)</span>
                  </>
                )}
              </div>
              <span className="text-[11px] text-[#e8a62a] block font-medium">
                {calculation.scholarshipEligibility}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5eaee]">
            <button
              onClick={handleDownloadChallan}
              className="px-5 py-3 rounded bg-[#0f766e] hover:bg-[#102a43] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#e8a62a]" />
              <span>{downloadSuccess ? 'Challan PDF Generated!' : 'Generate Admission Fee Challan (PKR 1,000)'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAdvisor();
              }}
              className="text-xs font-bold text-[#0f766e] hover:text-[#071b2d] flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#e8a62a]" />
              <span>Ask Advisor for Hostel & Fee Details</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
