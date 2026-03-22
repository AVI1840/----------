import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FeedbackModal } from './components/FeedbackModal';

export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-3">בחירת גמלה — סעיף 320</h2>
          <p className="text-gray-600 mb-6">כלי להשוואה בין גמלת שאירים לנכות כללית במצב של כפל זכאות</p>
          <p className="text-sm text-gray-400">הפרויקט בפיתוח — תוכן יתווסף בקרוב</p>
        </div>

        <button
          onClick={() => setFeedbackOpen(true)}
          className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-purple-700 text-white shadow-xl hover:bg-purple-800 transition-all hover:scale-105 flex items-center justify-center text-2xl font-bold"
          title="משוב פיילוט">
          💬
        </button>
      </main>

      <Footer />
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
