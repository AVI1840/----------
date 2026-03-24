export function Footer() {
  const today = new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-200 mt-10">
      בחירת גמלה — סעיף 320 | אביעד יצחקי, מוביל פיתוח, שותפויות ו-AI, מינהלי גמלאות, ביטוח לאומי | {today}
      <div className="mt-1 opacity-50">עדכון אחרון: 24.03.2026</div>
    </footer>
  );
}
