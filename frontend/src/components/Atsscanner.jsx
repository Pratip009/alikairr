import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, TrendingUp, Lightbulb, Target, Zap, Loader2, Trash2 } from 'lucide-react';

export default function ATSScanner() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [atsResult, setAtsResult] = useState(null);
  const [error, setError] = useState(null);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);
  
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  // Load PDF.js library
  useEffect(() => {
    const loadPdfJs = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        setPdfLibLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          setPdfLibLoaded(true);
        }
      };
      document.body.appendChild(script);
    };

    loadPdfJs();
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedResult = localStorage.getItem('ats_result');
    const savedText = localStorage.getItem('resume_text');
    const savedFileName = localStorage.getItem('resume_file_name');
    
    if (savedResult && savedText) {
      setAtsResult(JSON.parse(savedResult));
      setResumeText(savedText);
      setFile({ name: savedFileName || 'Uploaded Resume' });
    }
  }, []);

  // Clear localStorage on page unload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('ats_result');
      localStorage.removeItem('resume_text');
      localStorage.removeItem('resume_file_name');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    // Check file type - only PDF
    if (uploadedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Check if PDF library is loaded
    if (!pdfLibLoaded) {
      setError('PDF library is still loading. Please wait a moment and try again.');
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setAtsResult(null);
    setLoading(true);

    // Extract text from PDF
    try {
      await extractPDFText(uploadedFile);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to read PDF file. Please try again.');
      console.error('PDF extraction error:', err);
      setLoading(false);
    }
  };

  const extractPDFText = async (file) => {
    return new Promise((resolve, reject) => {
      if (!pdfLibLoaded || !window.pdfjsLib) {
        reject(new Error('PDF library not loaded yet. Please try again in a moment.'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdfjsLib = window.pdfjsLib;

          const loadingTask = pdfjsLib.getDocument({ data: typedarray });
          const pdf = await loadingTask.promise;
          
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }
          
          if (!fullText.trim()) {
            reject(new Error('No text found in PDF. The PDF might be an image or scanned document.'));
            return;
          }
          
          setResumeText(fullText);
          localStorage.setItem('resume_text', fullText);
          localStorage.setItem('resume_file_name', file.name);
          resolve();
        } catch (err) {
          console.error('PDF parsing error:', err);
          reject(new Error(`Failed to parse PDF: ${err.message}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file. Please ensure it is a valid PDF.'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError('No text found in the resume. Please upload a valid PDF file.');
      return;
    }

    if (!apiKey) {
      setError('API key not found. Make sure VITE_GROQ_API_KEY is set in your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'user',
            content: `You are an ATS (Applicant Tracking System) expert. Analyze this resume and provide a comprehensive ATS score and feedback.

Resume Text:
${resumeText}

Return ONLY a valid JSON object (no markdown, no backticks) with this structure:
{
  "atsScore": 75,
  "overallFeedback": "Brief overall assessment",
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],
  "improvements": [
    {
      "category": "Keywords",
      "issue": "What's wrong",
      "suggestion": "How to fix it",
      "priority": "High"
    },
    {
      "category": "Formatting",
      "issue": "What's wrong",
      "suggestion": "How to fix it",
      "priority": "Medium"
    },
    {
      "category": "Content",
      "issue": "What's wrong",
      "suggestion": "How to fix it",
      "priority": "High"
    }
  ],
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "sections": {
    "contact": "Good/Missing/Needs Improvement",
    "summary": "Good/Missing/Needs Improvement",
    "experience": "Good/Missing/Needs Improvement",
    "education": "Good/Missing/Needs Improvement",
    "skills": "Good/Missing/Needs Improvement"
  }
}`
          }],
          temperature: 0.5,
          max_tokens: 2048
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      let content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No response from API');
      }

      // Clean and parse JSON
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsedResult = JSON.parse(content);

      setAtsResult(parsedResult);
      localStorage.setItem('ats_result', JSON.stringify(parsedResult));
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearResume = () => {
    setFile(null);
    setResumeText('');
    setAtsResult(null);
    setError(null);
    localStorage.removeItem('ats_result');
    localStorage.removeItem('resume_text');
    localStorage.removeItem('resume_file_name');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-50 border-red-200 text-red-700';
    if (priority === 'Medium') return 'bg-amber-50 border-amber-200 text-amber-700';
    return 'bg-blue-50 border-blue-200 text-blue-700';
  };

  const getSectionIcon = (status) => {
    if (status === 'Good') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'Missing') return <XCircle className="w-5 h-5 text-red-600" />;
    return <AlertCircle className="w-5 h-5 text-amber-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .fade-in {
          animation: fade-in 0.4s ease-out;
        }
        
        .card {
          background: white;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        .upload-zone {
          transition: all 0.3s ease;
        }
        
        .upload-zone:hover {
          border-color: #6366f1;
          background: #eef2ff;
        }
        
        .improvement-card {
          transition: all 0.3s ease;
        }
        
        .improvement-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        * {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-indigo-100 border border-indigo-200">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-700 font-semibold text-sm tracking-wide">AI-POWERED ATS ANALYSIS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-slate-900">
            Resume ATS Scanner
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Upload your resume and get instant ATS compatibility score with actionable improvement suggestions
          </p>
        </div>

        {/* Upload Section */}
        <div className="card rounded-2xl p-8 mb-8 slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Upload className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-900">Upload Resume</h2>
            </div>
            {file && (
              <button
                onClick={clearResume}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Clear</span>
              </button>
            )}
          </div>

          <div className="upload-zone border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-slate-50">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf"
              className="hidden"
              id="file-upload"
              disabled={!pdfLibLoaded}
            />
            <label htmlFor="file-upload" className={pdfLibLoaded ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
              <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <p className="text-slate-900 font-semibold text-lg mb-2">
                {file ? file.name : pdfLibLoaded ? 'Click to upload your resume' : 'Loading PDF reader...'}
              </p>
              <p className="text-slate-500 text-sm">
                {pdfLibLoaded ? 'PDF format only' : 'Please wait...'}
              </p>
            </label>
          </div>

          {file && !loading && !atsResult && resumeText && (
            <button
              onClick={analyzeResume}
              className="w-full mt-6 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-indigo-200"
            >
              <Zap className="w-5 h-5" />
              <span>Analyze Resume</span>
            </button>
          )}

          {loading && (
            <div className="mt-6 flex items-center justify-center gap-3 text-indigo-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-medium">{resumeText ? 'Analyzing your resume...' : 'Extracting text from PDF...'}</span>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {atsResult && (
          <div className="space-y-6 slide-up">
            {/* ATS Score */}
            <div className="card rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={atsResult.atsScore >= 80 ? '#10b981' : atsResult.atsScore >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(atsResult.atsScore / 100) * 552.92} 552.92`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-5xl font-black ${getScoreColor(atsResult.atsScore)}`}>
                        {atsResult.atsScore}
                      </span>
                      <span className="text-slate-500 text-sm font-medium">ATS Score</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Overall Assessment</h3>
                  <p className="text-slate-700 leading-relaxed mb-4">{atsResult.overallFeedback}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-700">Strengths</span>
                      </div>
                      <p className="text-sm text-slate-600">{atsResult.strengths.length} identified</p>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <span className="font-bold text-amber-700">Areas to Improve</span>
                      </div>
                      <p className="text-sm text-slate-600">{atsResult.improvements.length} suggestions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-slate-900">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {atsResult.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900">Weaknesses</h3>
                </div>
                <ul className="space-y-3">
                  {atsResult.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improvements */}
            <div className="card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-indigo-600" />
                <h3 className="text-2xl font-bold text-slate-900">Improvement Suggestions</h3>
              </div>
              <div className="space-y-4">
                {atsResult.improvements.map((improvement, idx) => (
                  <div key={idx} className="improvement-card p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-bold text-slate-900">{improvement.category}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(improvement.priority)}`}>
                        {improvement.priority}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">
                      <span className="font-semibold text-red-600">Issue:</span> {improvement.issue}
                    </p>
                    <p className="text-slate-700 text-sm">
                      <span className="font-semibold text-green-600">Solution:</span> {improvement.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            {atsResult.missingKeywords && atsResult.missingKeywords.length > 0 && (
              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-slate-900">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missingKeywords.map((keyword, idx) => (
                    <span key={idx} className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-full text-orange-700 text-sm font-medium">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section Analysis */}
            <div className="card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Section Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(atsResult.sections).map(([section, status]) => (
                  <div key={section} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      {getSectionIcon(status)}
                      <span className="font-semibold text-slate-900 capitalize">{section}</span>
                    </div>
                    <p className="text-xs text-slate-600">{status}</p>
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