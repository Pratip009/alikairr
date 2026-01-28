import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, Book, Briefcase, Users, ArrowRight, X, Loader2 } from 'lucide-react';

export default function CareerGuide() {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [careerGuide, setCareerGuide] = useState(null);
  const [error, setError] = useState(null);
  // Get API key from environment variable - using Groq now
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const addSkill = () => {
    if (currentSkill.trim() && skills.length < 10) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const generateCareerGuide = async () => {
    if (skills.length === 0) {
      setError('Please add at least one skill');
      return;
    }

    if (!apiKey) {
      setError('API key not found. Make sure VITE_GROQ_API_KEY is set in your .env file and restart your dev server.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Using Groq API with Llama 3 model
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile", // Fast and powerful Llama 3 model
            messages: [{
              role: "user",
              content: `You are a career advisor AI. Given these skills: ${skills.join(', ')}, provide a comprehensive career guide.

Return your response as ONLY a valid JSON object with this exact structure (no markdown, no backticks, no explanatory text):
{
  "careerPaths": [
    {"title": "Career Path 1", "match": 90, "description": "Why this fits"},
    {"title": "Career Path 2", "match": 85, "description": "Why this fits"},
    {"title": "Career Path 3", "match": 80, "description": "Why this fits"}
  ],
  "topRecommendation": {
    "title": "Best Career Match",
    "why": "Detailed explanation of why this is the best match",
    "nextSteps": ["Concrete step 1", "Concrete step 2", "Concrete step 3"]
  },
  "skillGaps": [
    {"skill": "Missing Skill 1", "importance": "Why you need it", "resources": ["Resource 1", "Resource 2"]},
    {"skill": "Missing Skill 2", "importance": "Why you need it", "resources": ["Resource 1", "Resource 2"]}
  ],
  "industries": ["Industry 1", "Industry 2", "Industry 3", "Industry 4"]
}`
            }],
            temperature: 0.7,
            max_tokens: 2048
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || `API returned ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Extract text from Groq response (OpenAI-compatible format)
      let textContent = data.choices?.[0]?.message?.content;
      
      if (!textContent) {
        throw new Error('No response generated from API');
      }
      
      // Clean the response - remove markdown code blocks if present
      textContent = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Parse JSON
      const parsedData = JSON.parse(textContent);
      
      setCareerGuide(parsedData);
    } catch (err) {
      console.error('Full error:', err);
      if (err instanceof SyntaxError) {
        setError('Failed to parse AI response. Please try again.');
      } else {
        setError(err.message || 'Failed to generate career guide. Please check your API key.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-3 sm:p-4 md:p-6 lg:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .skill-tag {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-tag:hover {
          transform: translateY(-2px) scale(1.05);
        }
        
        .career-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .career-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        
        .career-card:hover::before {
          left: 100%;
        }
        
        .career-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
        }
        
        .glass-morphism {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* Mobile optimization */
        @media (max-width: 640px) {
          .float-animation {
            animation: none;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 float-animation">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-blue-400 font-mono text-xs sm:text-sm tracking-wider">AI-POWERED CAREER INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 text-white px-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>
            CAREER
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              NAVIGATOR
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg font-mono max-w-2xl mx-auto px-4">
            Input your skills. Unlock your potential. Let AI chart your path forward.
          </p>
        </div>

        {/* Skills Input Section */}
        <div className="glass-morphism rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 slide-up">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              YOUR SKILLS
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a skill (e.g., JavaScript)"
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              maxLength={50}
            />
            <button
              onClick={addSkill}
              disabled={!currentSkill.trim() || skills.length >= 10}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>ADD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skills Display */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[60px]">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-tag px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full text-white flex items-center gap-2 group"
              >
                <span className="font-mono text-xs sm:text-sm">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500/20 hover:bg-red-500 transition-all flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-slate-500 font-mono text-xs sm:text-sm">No skills added yet. Start typing above.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <span className="text-slate-400 font-mono text-xs sm:text-sm">
              {skills.length}/10 skills added
            </span>
            <button
              onClick={generateCareerGuide}
              disabled={skills.length === 0 || loading}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black rounded-lg hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all pulse-glow flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>GENERATE GUIDE</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-xs sm:text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Career Guide Results */}
        {careerGuide && (
          <div className="space-y-4 sm:space-y-6 slide-up">
            {/* Top Recommendation */}
            <div className="glass-morphism rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-cyan-500/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-400" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TOP RECOMMENDATION
                </h2>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">{careerGuide.topRecommendation.title}</h3>
              <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{careerGuide.topRecommendation.why}</p>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-mono">NEXT STEPS:</h4>
                <div className="space-y-2">
                  {careerGuide.topRecommendation.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-900/50 rounded-lg">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-300 text-sm sm:text-base">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Paths */}
            <div className="glass-morphism rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  CAREER PATHS
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {careerGuide.careerPaths.map((career, idx) => (
                  <div key={idx} className="career-card p-4 sm:p-5 md:p-6 bg-slate-900/50 rounded-lg sm:rounded-xl border border-slate-700/50">
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white flex-1">{career.title}</h3>
                      <div className="px-2.5 sm:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full flex-shrink-0">
                        <span className="text-blue-400 font-bold text-xs sm:text-sm">{career.match}%</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm">{career.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="glass-morphism rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Book className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SKILL DEVELOPMENT
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {careerGuide.skillGaps.map((gap, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-slate-900/50 rounded-lg sm:rounded-xl border border-slate-700/50">
                    <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">{gap.skill}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{gap.importance}</p>
                    <div className="flex flex-wrap gap-2">
                      {gap.resources.map((resource, ridx) => (
                        <span key={ridx} className="px-2.5 sm:px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm font-mono">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="glass-morphism rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TARGET INDUSTRIES
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {careerGuide.industries.map((industry, idx) => (
                  <div key={idx} className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-teal-600/20 to-blue-600/20 border border-teal-500/30 rounded-lg">
                    <span className="text-teal-300 font-bold font-mono text-xs sm:text-sm md:text-base">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}