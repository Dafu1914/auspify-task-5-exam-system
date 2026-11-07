'use client';

import { useEffect, useState } from 'react';
import { getExams, getResults, submitExam, Exam, Result } from '@/lib/api';

export default function Dashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    getExams().then(setExams);
    getResults(username).then(setResults);
  }, [username]);

  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setAnswers(new Array(exam.questions.length).fill(''));
  };

  const handleAnswer = (qIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!activeExam) return;
    if (answers.includes('')) {
      if (!confirm('You have unanswered questions. Submit anyway?')) return;
    }
    const result = await submitExam(username, activeExam._id!, answers);
    alert(`Exam Submitted! Your score: ${result.score} / ${result.totalQuestions}`);
    setActiveExam(null);
    getResults(username).then(setResults);
  };

  return (
    <main className="min-h-screen bg-slate-900 p-8 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
            Welcome, {username} 👋
          </h1>
          <button 
            onClick={onLogout} 
            className="bg-rose-500/10 text-rose-400 px-4 py-2 rounded-lg font-bold hover:bg-rose-500/20 transition"
          >
            Logout
          </button>
        </div>

        {activeExam ? (
          /* EXAM TAKING UI */
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">{activeExam.title}</h2>
            
            {activeExam.questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-8 p-5 bg-slate-900 rounded-xl border border-slate-700">
                <p className="font-semibold text-lg mb-4 text-white">
                  {qIndex + 1}. {q.questionText}
                </p>
                
                {/* INLINE STYLES FOR PERFECT STACKING */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((option, oIndex) => (
                    <label 
                      key={oIndex} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: answers[qIndex] === option ? 'rgba(20, 184, 166, 0.1)' : '#1e293b',
                        border: answers[qIndex] === option ? '1px solid #14b8a6' : '1px solid #475569',
                        color: '#e2e8f0',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={option}
                        checked={answers[qIndex] === option}
                        onChange={() => handleAnswer(qIndex, option)}
                        style={{ width: '18px', height: '18px', accentColor: '#14b8a6', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '16px' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              onClick={handleSubmit} 
              className="w-full bg-teal-600 hover:bg-teal-500 py-4 rounded-lg font-bold text-lg text-white transition shadow-lg shadow-teal-500/20"
            >
              Submit Exam
            </button>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AVAILABLE EXAMS */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Available Exams</h2>
              {exams.length === 0 ? (
                <p className="text-slate-500">No exams available. Please wait for the admin to add one.</p>
              ) : (
                exams.map((exam) => (
                  <div key={exam._id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 flex justify-between items-center shadow-md">
                    <div>
                      <p className="font-bold text-white text-lg">{exam.title}</p>
                      <p className="text-sm text-slate-400">{exam.questions.length} Questions</p>
                    </div>
                    <button 
                      onClick={() => startExam(exam)} 
                      className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-bold text-white transition"
                    >
                      Start
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* RESULTS HISTORY */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Your Results</h2>
              {results.length === 0 ? (
                <p className="text-slate-500">No results yet. Take an exam to see your scores.</p>
              ) : (
                results.map((res) => (
                  <div key={res._id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4 shadow-md">
                    <p className="font-bold text-white text-lg">{res.examTitle}</p>
                    <p className="text-emerald-400 font-semibold mt-1">
                      {res.score} / {res.totalQuestions} Correct
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(res.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}