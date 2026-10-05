import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User
} from 'lucide-react';

interface UAFVirtualAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: () => void;
  onOpenAppointment: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

export const UAFVirtualAdvisorModal: React.FC<UAFVirtualAdvisorModalProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
  onOpenAppointment
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Assalam-o-Alaikum! Welcome to the Ask UAF Virtual Guide. I am here to provide instant official information regarding Undergraduate Admissions 2026, Merit Aggregate Calculations, Degree Programs, Hostel Accommodation, Scholarships, Fee Structure, and Campus Life. How can I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  const PRESET_TOPICS = [
    { label: '📊 How is Merit Calculated?', prompt: 'Explain the UAF merit calculation formula for 2026.' },
    { label: '🐾 DVM Admission Eligibility', prompt: 'What is the eligibility criteria and merit for DVM?' },
    { label: '💰 Scholarships (PEEF & Ehsaas)', prompt: 'What scholarships are available and how to apply?' },
    { label: '🏡 Hostel Allotment Process', prompt: 'How can newly admitted students apply for hostel accommodation?' },
    { label: '👨‍💼 Meet the Vice Chancellor', prompt: 'How do I book a meeting with the VC Secretariat?' }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessages: Message[] = [...messages, { sender: 'user', text: query, time }];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      let reply = "Thank you for reaching out. The University of Agriculture Faisalabad (established 1906) provides comprehensive academic and student support. Please consult our official admissions desk or use the merit calculator.";
      let action: { label: string; action: () => void } | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('merit') || lower.includes('calculate') || lower.includes('aggregate') || lower.includes('formula')) {
        reply = "UAF calculates undergraduate admission merit using the official 30:30:40 formula:\n• Matriculation: 30% Weightage\n• Intermediate (F.Sc/ICS/DAE): 30% Weightage\n• UAF Entry Test: 40% Weightage\n• Hafiz-e-Quran candidates receive +20 marks added to their Intermediate score upon passing the oral test.";
        action = {
          label: 'Open Merit Calculator',
          action: () => {
            onClose();
            onOpenCalculator();
          }
        };
      } else if (lower.includes('dvm') || lower.includes('veterinary')) {
        reply = "Doctor of Veterinary Medicine (DVM) is a 5-year (10 semesters + clinical internship) program accredited by PVMC. Minimum eligibility is 60% in F.Sc (Pre-Medical) plus valid UAF Entry Test score. The closing merit typically ranges around 82% to 88%.";
        action = {
          label: 'Calculate DVM Merit',
          action: () => {
            onClose();
            onOpenCalculator();
          }
        };
      } else if (lower.includes('hostel') || lower.includes('boarding') || lower.includes('room')) {
        reply = "UAF maintains 22 resident halls housing over 18,000 male and female students on campus. Hostels provide 24/7 security, subsidized mess, high-speed Wi-Fi, and RO water filtration. Allotment opens through the Hall Warden Portal after securing admission confirmation.";
      } else if (lower.includes('scholarship') || lower.includes('fee') || lower.includes('financial') || lower.includes('peef') || lower.includes('ehsaas')) {
        reply = "UAF distributes over PKR 450 Million annually via HEC Need-Based Scholarships, PEEF, Ehsaas Undergraduate Scheme, Alumni Endowments, and Merit Scholarships for semester top-graders. You can apply at the Directorate of Financial Aid (STC Building 1st Floor).";
      } else if (lower.includes('vc') || lower.includes('vice chancellor') || lower.includes('appointment') || lower.includes('zulfiqar')) {
        reply = "Vice Chancellor Prof. Dr. Zulfiqar Ali warmly welcomes research collaboration, student delegations, and public inquiries. You can schedule a personal meeting through the online Secretariat portal.";
        action = {
          label: 'Schedule VC Appointment',
          action: () => {
            onClose();
            onOpenAppointment();
          }
        };
      } else if (lower.includes('cs') || lower.includes('computer') || lower.includes('engineering')) {
        reply = "UAF offers BS Computer Science (4-year NCEAC accredited) and B.Sc. Agricultural Engineering (4-year PEC accredited). Both programs offer evening and morning shifts with state-of-the-art AI, IoT, and Robotics research laboratories.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply, time, actionButton: action }]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071b2d]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[620px] max-h-[90vh] border border-[#e5eaee] relative flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#071b2d] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0f766e] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-[#e8a62a]" />
            </div>
            <div>
              <h3 className="font-serif-heading font-bold text-lg text-white leading-tight">
                Ask UAF Virtual Guide
              </h3>
              <span className="text-[11px] text-[#e8a62a] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Official Knowledge Base 2026
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#f5f8fa]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                  <Bot className="w-4 h-4 text-[#e8a62a]" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-[#102a43] text-white rounded-tr-none'
                    : 'bg-white text-[#18212b] rounded-tl-none border border-[#e5eaee] shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.actionButton && (
                  <div className="pt-1">
                    <button
                      onClick={msg.actionButton.action}
                      className="px-3.5 py-1.5 bg-[#e8a62a] hover:bg-amber-400 text-[#071b2d] font-bold text-xs rounded shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{msg.actionButton.label}</span>
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] text-right font-medium ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-[#8b95a1]'
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#e8a62a] text-[#071b2d] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-2.5 bg-white border-t border-[#e5eaee] flex gap-2 overflow-x-auto scrollbar-none">
          {PRESET_TOPICS.map((topic, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(topic.prompt)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#f5f8fa] hover:bg-[#dff5f1] text-[#0f766e] text-[11px] font-semibold border border-[#e5eaee] hover:border-[#0f766e]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-[#e5eaee] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your inquiry (e.g. DVM merit, hostel, scholarship)..."
            className="flex-1 px-4 py-2.5 bg-[#f5f8fa] border border-[#e5eaee] rounded-xl text-xs sm:text-sm text-[#18212b] focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-[#0f766e] hover:bg-[#102a43] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shrink-0"
          >
            <Send className="w-4 h-4 text-[#e8a62a]" />
          </button>
        </form>

      </div>
    </div>
  );
};
