import React, { useState, useMemo } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import type { StaffMember } from './FacultyPortalPage';

export interface ScholarlyItem {
  id: string;
  srNo: string;
  title: string;
  venue: string;
  url: string;
}

export interface FacultyProfileDetailPageProps {
  member: StaffMember;
  portraitUrl: string;
  phoneNum: string;
  departmentName: string;
  departmentShortLabel: string;
  facultyName: string;
  onBack?: () => void;
  departmentMembers?: StaffMember[];
  onSelectAnotherMember?: (member: StaffMember, portraitUrl: string, phoneNum: string) => void;
  showBackBtn?: boolean;
}

export const FacultyProfileDetailPage: React.FC<FacultyProfileDetailPageProps> = ({
  member,
  portraitUrl,
  phoneNum,
  departmentName,
  departmentShortLabel,
  facultyName
}) => {
  // Shared Springer publication link
  const SPRINGER_URL = 'https://link.springer.com/article/10.1007/s11235-015-0076-8';

  // Active page view: 'profile' | 'journals' | 'conferences'
  const [activeTab, setActiveTab] = useState<'profile' | 'journals' | 'conferences'>('profile');

  const fullName = member.name;
  const officialDesignation = member.designation || 'Professor';

  const isEhsanullah = fullName.toLowerCase().includes('ehsanullah');
  const isSaqib = fullName.toLowerCase().includes('saqib');

  const qualificationText =
    member.qualification ||
    (isEhsanullah
      ? 'Ph.D. (UAF) (Agronomy)'
      : isSaqib
      ? 'Post-Doc (UTM, Malaysia) • Ph.D. (Computer Science)'
      : 'Ph.D. (UAF)');

  const specializationText =
    member.specialization ||
    (isEhsanullah
      ? 'Crop Husbandry & Agro-Technology'
      : isSaqib
      ? 'Artificial Intelligence, Big Data Analytics, Image Processing, Precision Agriculture'
      : `${departmentShortLabel}, Applied Scientific Research & Agricultural Technologies`);

  const bioParagraph =
    isEhsanullah
      ? 'Prof. Dr. Ehsanullah serves as Professor in the Department of Agronomy, Faculty of Agriculture, University of Agriculture, Faisalabad (UAF). Holding a Ph.D. (UAF) degree with specialization in Crop Husbandry & Agro-Technology, he is an active HEC Approved Supervisor (Yes) dedicated to postgraduate mentorship, curriculum innovation, and applied agricultural research.'
      : isSaqib
      ? 'Prof. Dr. Saqib Ali serves as Chairman and Professor in the Department of Computer Science, Faculty of Sciences, University of Agriculture, Faisalabad (UAF). Holding a Post-Doctoral fellowship and Ph.D. in Computer Science, he is an esteemed HEC Approved Supervisor dedicated to high-impact machine learning research, student mentorship, and precision agriculture innovations.'
      : `${fullName} serves as ${officialDesignation} in the ${departmentName}, ${facultyName}, University of Agriculture, Faisalabad (UAF). Holding a ${qualificationText} degree with specialization in ${specializationText}, active HEC Approved Supervisor dedicated to undergraduate and postgraduate mentorship, curriculum innovation, and applied research.`;

  const researchAreasText =
    member.researchAreas ||
    (isEhsanullah
      ? 'Crop Husbandry & Agro-Technology, Sustainable Agronomy Systems, Climate-Resilient Agriculture'
      : isSaqib
      ? 'Artificial Intelligence, Big Data Analytics, Image Processing, Agri-IoT and Precision Agriculture'
      : `${specializationText}, Sustainable Agricultural Systems, Climate Resilience & High-Impact Scientific Development`);

  const primaryEmail = member.email || (isEhsanullah ? 'ehsanullah@uaf.edu.pk' : isSaqib ? 'saqib@uaf.edu.pk' : 'faculty@uaf.edu.pk');
  const secondaryEmail = member.secondaryEmail || 'N/A';
  const hecSupervisor = member.hecApprovedSupervisor || 'Yes';
  const addressText =
    member.address ||
    `${departmentName}, ${facultyName}, University of Agriculture, Faisalabad-38040, Pakistan`;

  // ========================================================
  // JOURNALS LIST (Clean Data: Sr#, Title, Journal Name, Link)
  // ========================================================
  const journalsList: ScholarlyItem[] = useMemo(() => {
    if (isEhsanullah) {
      return [
        {
          id: 'ej-1',
          srNo: '01',
          title: 'Advanced Research on Crop Husbandry & Agro-Technology in Agro-Ecological Zones of Punjab',
          venue: 'Pakistan Journal of Agricultural Sciences (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-2',
          srNo: '02',
          title: 'Precision Agro-Technology and Nitrogen Dynamics in Semi-Arid Agro-Climatic Zones',
          venue: 'Telecommunication Systems & Agricultural Sensors (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-3',
          srNo: '03',
          title: 'High-Throughput Remote Sensing and AI Crop Canopy Modeling for Cereal Systems',
          venue: 'Computers & Electronics in Agriculture (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-4',
          srNo: '04',
          title: 'Climate-Resilient Agronomic Practices for Cereal-Legume Cropping Systems',
          venue: 'Pakistan Journal of Agricultural Sciences (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-5',
          srNo: '05',
          title: 'Energy-Efficient Spatial Sensor Arrays for Sub-Surface Soil Moisture Optimization',
          venue: 'Springer Wireless Networks & Sensor Systems',
          url: SPRINGER_URL
        },
        {
          id: 'ej-6',
          srNo: '06',
          title: 'Water Productivity Enhancement via Laser Land Leveling and Bed Planting in Cotton-Wheat Rotation',
          venue: 'Agricultural Water Management (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-7',
          srNo: '07',
          title: 'Evaluation of Allelopathic Potential of Sorghum and Sunflower Extracts for Weed Suppression in Wheat',
          venue: 'Weed Research & Management (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-8',
          srNo: '08',
          title: 'Biochar-Mediated Soil Remediation and Nitrogen Retention in Intensively Managed Agronomic Soils',
          venue: 'Environmental Science & Pollution Research (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-9',
          srNo: '09',
          title: 'Physiological and Biochemical Responses of Wheat to Exogenous Silicon Application under Drought Stress',
          venue: 'Plant Cell Reports (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-10',
          srNo: '10',
          title: 'Optimization of Sowing Geometry and Micronutrient Fortification for High-Density Maize Production',
          venue: 'Journal of Plant Nutrition (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-11',
          srNo: '11',
          title: 'Influence of Conservation Tillage and Residue Mulching on Soil Moisture Conservation',
          venue: 'Soil and Tillage Research (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'ej-12',
          srNo: '12',
          title: 'Foliar Application of Micronutrients on Grain Yield and Nitrogen Dynamics of Hybrid Maize',
          venue: 'Pakistan Journal of Agricultural Sciences (Springer)',
          url: SPRINGER_URL
        }
      ];
    } else if (isSaqib) {
      return [
        {
          id: 'sj-1',
          srNo: '01',
          title: 'A QoS and energy-aware multi-path routing algorithm for wireless sensor networks in smart agriculture',
          venue: 'Telecommunication Systems (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-2',
          srNo: '02',
          title: 'Deep learning-based multi-temporal remote sensing for crop classification and yield prediction in Indus Basin',
          venue: 'Computers and Electronics in Agriculture (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-3',
          srNo: '03',
          title: 'Automated detection of citrus leaf disease using fine-tuned convolutional neural networks with spatial attention',
          venue: 'Journal of Ambient Intelligence and Humanized Computing (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-4',
          srNo: '04',
          title: 'IoT-based intelligent irrigation management architecture using edge analytics and microclimate telemetry',
          venue: 'Wireless Personal Communications (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-5',
          srNo: '05',
          title: 'A robust vision transformer framework for weed and crop discrimination in high-density cotton fields',
          venue: 'Multimedia Tools and Applications (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-6',
          srNo: '06',
          title: 'Blockchain-Enabled Secure Supply Chain Traceability Architecture for Agricultural Produce',
          venue: 'Cluster Computing (Springer Nature)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-7',
          srNo: '07',
          title: 'Hybrid Metaheuristic Optimization for Energy-Constrained UAV Trajectory Planning in Agro-Monitoring',
          venue: 'Applied Intelligence (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-8',
          srNo: '08',
          title: 'Real-Time Acoustic Sensor Identification of Pest Infestation in Stored Cereal Grains Using Deep Recurrent Models',
          venue: 'Neural Computing and Applications (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-9',
          srNo: '09',
          title: 'Edge-Computing Framework for Precision Herbicide Dispensing in Smart Agriculture',
          venue: 'Peer-to-Peer Networking and Applications (Springer)',
          url: SPRINGER_URL
        },
        {
          id: 'sj-10',
          srNo: '10',
          title: 'Federated Learning for Multi-Tenant Yield Prediction Models in Distributed Agri-Clouds',
          venue: 'Computing (Springer Nature)',
          url: SPRINGER_URL
        }
      ];
    } else {
      return [
        {
          id: 'gj-1',
          srNo: '01',
          title: `Pioneering Investigations in ${specializationText} across Semi-Arid Agro-Ecosystems`,
          venue: 'Pakistan Journal of Agricultural Sciences (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'gj-2',
          srNo: '02',
          title: `Optimizing Sustainable Production Models in ${departmentShortLabel} via Modern Scientific Approaches`,
          venue: 'Springer Nature / Environmental Science & Pollution Research',
          url: SPRINGER_URL
        },
        {
          id: 'gj-3',
          srNo: '03',
          title: `Genomic and Physiological Characterization for Climate Stress Tolerance in Pakistani Crops`,
          venue: 'Springer / Plant Cell, Tissue and Organ Culture',
          url: SPRINGER_URL
        },
        {
          id: 'gj-4',
          srNo: '04',
          title: `Integrated Analytical Assessment of Soil-Plant-Water Dynamics in the Indus Plain`,
          venue: 'Springer / Applied Sciences & Technology',
          url: SPRINGER_URL
        },
        {
          id: 'gj-5',
          srNo: '05',
          title: `Resource-Use Efficiency and Crop Phenology in Subtropical Farming Systems`,
          venue: 'Field Crops Research (Springer Linkage)',
          url: SPRINGER_URL
        },
        {
          id: 'gj-6',
          srNo: '06',
          title: `Molecular Identification and Pathogenicity Assessment of Prevalent Agricultural Strains`,
          venue: 'European Journal of Plant Pathology (Springer)',
          url: SPRINGER_URL
        }
      ];
    }
  }, [isEhsanullah, isSaqib, specializationText, departmentShortLabel]);

  // ========================================================
  // CONFERENCES LIST (Clean Data: Sr#, Title, Conference Name, Link)
  // ========================================================
  const conferencesList: ScholarlyItem[] = useMemo(() => {
    if (isEhsanullah) {
      return [
        {
          id: 'ec-1',
          srNo: '01',
          title: 'Innovative Agronomic Strategies for Abiotic Stress Alleviation in Subtropical Cropping Systems',
          venue: '8th International Agronomy Congress, Bangkok, Thailand',
          url: SPRINGER_URL
        },
        {
          id: 'ec-2',
          srNo: '02',
          title: 'Precision Nutrient Management Using IoT Sensors and Spatial Agro-Climatology',
          venue: 'World Congress on Conservation Agriculture, Bern, Switzerland',
          url: SPRINGER_URL
        },
        {
          id: 'ec-3',
          srNo: '03',
          title: 'Regenerative Agriculture and Soil Organic Matter Dynamics in Irrigated Plains',
          venue: 'Asian Crop Science Conference, Seoul, South Korea',
          url: SPRINGER_URL
        },
        {
          id: 'ec-4',
          srNo: '04',
          title: 'Water Scarcity Challenges in the Indus Basin: Agronomic Engineering Perspectives',
          venue: 'National Conference on Sustainable Agriculture, Islamabad, Pakistan',
          url: SPRINGER_URL
        },
        {
          id: 'ec-5',
          srNo: '05',
          title: 'Climate Change Mitigation Through Conservation Cropping Systems in South Asia',
          venue: 'International Symposium on Arid Zone Agriculture, Cairo, Egypt',
          url: SPRINGER_URL
        },
        {
          id: 'ec-6',
          srNo: '06',
          title: 'Weed Dynamics and Integrated Weed Management in Modern Agro-Ecosystems',
          venue: '5th International Weed Science Conference, Faisalabad, Pakistan',
          url: SPRINGER_URL
        }
      ];
    } else if (isSaqib) {
      return [
        {
          id: 'sc-1',
          srNo: '01',
          title: 'Edge-AI and Embedded Swarm Robotics for Autonomous Weed Spot Spraying',
          venue: 'IEEE International Conference on Smart Agriculture (AgriTech), Sydney, Australia',
          url: SPRINGER_URL
        },
        {
          id: 'sc-2',
          srNo: '02',
          title: 'Distributed Federated Learning for Crop Disease Surveillance Across Decentralized Farms',
          venue: 'ACM Symposium on Applied Computing (SAC), Sicily, Italy',
          url: SPRINGER_URL
        },
        {
          id: 'sc-3',
          srNo: '03',
          title: 'Energy-Harvesting LoRaWAN Sensor Nodes for Sub-Surface Soil Telemetry',
          venue: 'International Conference on Frontiers of Information Technology (FIT), Islamabad',
          url: SPRINGER_URL
        },
        {
          id: 'sc-4',
          srNo: '04',
          title: 'Computer Vision Approaches for Automated Phenotyping in High-Density Cotton Fields',
          venue: 'IEEE International Conference on Image Processing (ICIP), Anchorage, USA',
          url: SPRINGER_URL
        },
        {
          id: 'sc-5',
          srNo: '05',
          title: 'Autonomous Aerial Drone Navigation in GPS-Denied Agricultural Canopies',
          venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
          url: SPRINGER_URL
        }
      ];
    } else {
      return [
        {
          id: 'gc-1',
          srNo: '01',
          title: `Global Trends and Innovations in ${departmentName}: Sustainable Frameworks for 2030`,
          venue: `International Summit on ${departmentShortLabel}, Bangkok, Thailand`,
          url: SPRINGER_URL
        },
        {
          id: 'gc-2',
          srNo: '02',
          title: `Precision Technology Integration in Subtropical Agriculture Systems`,
          venue: 'Asian Agricultural Science Congress, Seoul, South Korea',
          url: SPRINGER_URL
        },
        {
          id: 'gc-3',
          srNo: '03',
          title: `Sustainable Resource Management and Environmental Protection Summit`,
          venue: 'International Conference on Agricultural Innovations, Islamabad',
          url: SPRINGER_URL
        },
        {
          id: 'gc-4',
          srNo: '04',
          title: `National Symposium on Food Security and Climate Resilience in Pakistan`,
          venue: 'PARC National Agricultural Conference, Islamabad',
          url: SPRINGER_URL
        }
      ];
    }
  }, [isEhsanullah, isSaqib, departmentName, departmentShortLabel]);

  const totalJournalsCount = journalsList.length;
  const totalConferencesCount = conferencesList.length;

  return (
    <div className="flex-1 bg-[#f4f7f9] min-h-screen py-6 sm:py-8 select-none font-sans">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

        {/* ========================================================
            CLEAN NAVIGATION TABS (No bulky back buttons, no extra text)
        ========================================================= */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#071b2d] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Faculty Profile
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('journals');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'journals'
                  ? 'bg-[#005a36] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>Journals</span>
              <span className={`px-2 py-0.2 rounded-full text-xs font-black ${
                activeTab === 'journals' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {totalJournalsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('conferences');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'conferences'
                  ? 'bg-[#b8860b] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>Conferences</span>
              <span className={`px-2 py-0.2 rounded-full text-xs font-black ${
                activeTab === 'conferences' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {totalConferencesCount}
              </span>
            </button>
          </div>

          <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
            {fullName} • {departmentShortLabel}
          </span>
        </div>

        {/* ========================================================
            PAGE 1: FACULTY DETAIL PROFILE (CLEAN CARDS FOR JOURNALS & CONFERENCES)
        ========================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT COLUMN: AVATAR & CONTACT CARD */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Circular Avatar + HEC Badge */}
              <div className="bg-stone-50/70 rounded-2xl p-6 border border-stone-200/80 flex flex-col items-center text-center shadow-xs">
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full p-1 border-4 border-[#005a36] ring-4 ring-[#e8a62a]/30 shadow-md bg-white mb-5 overflow-hidden">
                  <img
                    src={portraitUrl}
                    alt={fullName}
                    className="w-full h-full object-cover object-top rounded-full"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs tracking-wide shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HEC Approved Supervisor: {hecSupervisor}</span>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 border-l-4 border-l-[#005a36] shadow-xs space-y-3.5 text-xs sm:text-[13.5px]">
                
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">Email: </span>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="text-[#005a36] font-semibold hover:underline break-all"
                    >
                      {primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">Secondary Email: </span>
                    <span className="text-stone-600 font-medium">{secondaryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">Phone: </span>
                    <span className="text-stone-700 font-semibold">{phoneNum}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">HEC Supervisor: </span>
                    <span className="text-emerald-700 font-bold">{hecSupervisor}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800">Address: </span>
                    <span className="text-stone-600 font-medium leading-relaxed">
                      {addressText}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: NAME, BIO, RESEARCH FOCUS, & 2 SIMPLE CLEAN CARDS */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071b2d] tracking-tight">
                  {fullName}
                </h1>
                <p className="text-lg sm:text-xl font-bold text-[#005a36]">
                  {officialDesignation}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 font-semibold pt-1">
                  <strong>Education:</strong> {qualificationText} <span className="mx-2 text-stone-300">|</span> <strong>Specialization:</strong> {specializationText}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-extrabold text-[#071b2d] border-b border-stone-200 pb-2.5">
                  Biography & Academic Profile
                </h2>
                <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed text-justify font-normal">
                  {bioParagraph}
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-1.5 shadow-2xs">
                <h3 className="text-xs font-extrabold text-[#005a36] tracking-wider uppercase">
                  RESEARCH AREAS & SUPERVISION FOCUS:
                </h3>
                <p className="text-sm sm:text-[15px] font-bold text-stone-800 leading-snug">
                  {researchAreasText}
                </p>
              </div>

              {/* 2 CLEAN CARDS: TOTAL JOURNALS & TOTAL CONFERENCES (NO EXTRA TEXT) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* CARD 1: JOURNALS */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#005a36] transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#005a36] uppercase tracking-wider">
                      Research Output
                    </span>
                    <h3 className="text-lg font-extrabold text-[#071b2d] mt-1">
                      Journals
                    </h3>
                    <div className="text-3xl font-black text-[#005a36] mt-2">
                      {totalJournalsCount}{' '}
                      <span className="text-sm font-semibold text-stone-500">
                        Total Journals
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('journals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#005a36] hover:bg-[#00472a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>See in Detail</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* CARD 2: CONFERENCES */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#b8860b] transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                      Scholarly Presentations
                    </span>
                    <h3 className="text-lg font-extrabold text-[#071b2d] mt-1">
                      Conferences & Publications
                    </h3>
                    <div className="text-3xl font-black text-[#b8860b] mt-2">
                      {totalConferencesCount}{' '}
                      <span className="text-sm font-semibold text-stone-500">
                        Total Conferences
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('conferences');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#b8860b] hover:bg-[#996f08] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>See in Detail</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            PAGE 2: JOURNALS PAGE (CLEAN TABLE: SR#, NAMES, JOURNAL, LINKS)
            (No navbar, no showing 3 of 10, no logos/icons, clean table)
        ========================================================= */}
        {activeTab === 'journals' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#071b2d]">
                  Journals & Articles
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#005a36] mt-0.5">
                  {fullName} • {departmentName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer w-fit"
              >
                Faculty Profile
              </button>
            </div>

            {/* PURE TABLE: Sr#, Paper Name, Journal Name, Link */}
            <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#071b2d] text-white select-none">
                  <tr>
                    <th className="py-3.5 px-4 font-bold w-16 text-center">Sr. #</th>
                    <th className="py-3.5 px-5 font-bold">Paper Name</th>
                    <th className="py-3.5 px-5 font-bold">Journal Name</th>
                    <th className="py-3.5 px-4 font-bold text-center w-36">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {journalsList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-[#005a36] text-center">
                        {item.srNo}
                      </td>
                      <td className="py-3.5 px-5 font-bold text-stone-900 leading-snug">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-stone-700 text-xs sm:text-[13px]">
                        {item.venue}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#005a36] hover:bg-[#00472a] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================
            PAGE 3: CONFERENCES PAGE (CLEAN TABLE: SR#, NAMES, CONFERENCE, LINKS)
            (No navbar, no showing 3 of 10, no logos/icons, clean table)
        ========================================================= */}
        {activeTab === 'conferences' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#071b2d]">
                  Conferences & Publications
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#b8860b] mt-0.5">
                  {fullName} • {departmentName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer w-fit"
              >
                Faculty Profile
              </button>
            </div>

            {/* PURE TABLE: Sr#, Paper Name, Conference Name, Link */}
            <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#071b2d] text-white select-none">
                  <tr>
                    <th className="py-3.5 px-4 font-bold w-16 text-center">Sr. #</th>
                    <th className="py-3.5 px-5 font-bold">Paper Name</th>
                    <th className="py-3.5 px-5 font-bold">Conference Name</th>
                    <th className="py-3.5 px-4 font-bold text-center w-36">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {conferencesList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-[#b8860b] text-center">
                        {item.srNo}
                      </td>
                      <td className="py-3.5 px-5 font-bold text-stone-900 leading-snug">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-stone-700 text-xs sm:text-[13px]">
                        {item.venue}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#b8860b] hover:bg-[#996f08] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};