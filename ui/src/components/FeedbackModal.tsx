import { useState, useEffect } from 'react';

interface FeedbackModalProps { open: boolean; onClose: () => void; }

const STORAGE_KEY = 'btl-feedback-benefit-choice';
const APP_NAME = 'בחירת גמלה';
const NAME_KEY = 'btl-feedback-user-name';

type Category = '🐛 באג' | '💡 שיפור' | '📊 נתונים' | '🎨 עיצוב';
type Severity = 'קריטי' | 'שיפור' | 'קטן';

interface FeedbackEntry {
  id: number; name: string; category: Category | ''; severity: Severity | '';
  text: string; timestamp: string; sent: boolean;
}

const sevColor = (s: Severity | '') =>
  s === 'קריטי' ? 'border-red-500 bg-red-50 text-red-700' :
  s === 'שיפור' ? 'border-orange-400 bg-orange-50 text-orange-700' :
  s === 'קטן' ? 'border-green-500 bg-green-50 text-green-700' : '';

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || '');
  const [category, setCategory] = useState<Category | ''>('');
  const [severity, setSeverity] = useState<Severity | ''>('');
  const [text, setText] = useState('');
  const [items, setItems] = useState<FeedbackEntry[]>([]);

  useEffect(() => { const s = localStorage.getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); }, [open]);

  const save = (u: FeedbackEntry[]) => { setItems(u); localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); };

  const handleSubmit = () => {
    if (!text.trim() || !name.trim()) return;
    localStorage.setItem(NAME_KEY, name.trim());
    const entry: FeedbackEntry = {
      id: Date.now(), name: name.trim(), category, severity,
      text: text.trim(), timestamp: new Date().toISOString(), sent: false,
    };
    save([entry, ...items]);
    setCategory(''); setSeverity(''); setText('');
  };

  const handleExport = () => {
    if (!items.length) return;
    const lines = items.map(fb =>
      `[${new Date(fb.timestamp).toLocaleString('he-IL')}] [${fb.name}] [${fb.category || '—'}] [${fb.severity || '—'}] ${fb.text}`
    );
    navigator.clipboard.writeText(`משובי פיילוט — ${APP_NAME}\n${'='.repeat(50)}\n\n${lines.join('\n\n')}`);
  };

  const handleClear = () => { save([]); };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900 text-base">💬 משוב פיילוט</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2 text-right">שם</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="השם שלך"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-right" dir="rtl" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-right">קטגוריה</p>
            <div className="flex gap-2 flex-wrap justify-end">
              {(['🐛 באג', '💡 שיפור', '📊 נתונים', '🎨 עיצוב'] as Category[]).map(c => (
                <button key={c} onClick={() => setCategory(category === c ? '' : c)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${category === c ? 'border-[#1B3A5C] bg-[#1B3A5C] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#1B3A5C]'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-right">חומרה</p>
            <div className="flex gap-2 flex-wrap justify-end">
              {(['קריטי', 'שיפור', 'קטן'] as Severity[]).map(s => (
                <button key={s} onClick={() => setSeverity(severity === s ? '' : s)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${severity === s ? `${sevColor(s)} border-2` : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-right">תיאור</p>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="תאר את המשוב..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-right min-h-[80px] resize-none" dir="rtl" />
          </div>
          <button onClick={handleSubmit} disabled={!text.trim() || !name.trim()}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            style={{ backgroundColor: text.trim() && name.trim() ? '#1B3A5C' : undefined }}>
            שלח משוב
          </button>
          {items.length > 0 && (
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <button onClick={handleClear} className="text-xs text-red-500 hover:underline">מחק הכל</button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{items.length} משובים</span>
                  <button onClick={handleExport} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">📋 ייצוא ללוח</button>
                </div>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map(fb => (
                  <div key={fb.id} className="bg-gray-50 rounded-lg p-3 text-right border border-gray-200">
                    <div className="flex items-center gap-2 mb-1 flex-wrap justify-end">
                      {fb.category && <span className="text-xs px-2 py-0.5 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] font-medium">{fb.category}</span>}
                      {fb.severity && <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sevColor(fb.severity as Severity)}`}>{fb.severity}</span>}
                      <span className="text-xs text-gray-400">{fb.name} · {new Date(fb.timestamp).toLocaleString('he-IL')}</span>
                    </div>
                    <p className="text-sm text-gray-800">{fb.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
