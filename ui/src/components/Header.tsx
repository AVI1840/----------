export function Header() {
  return (
    <header style={{ background: 'linear-gradient(135deg, #1B3A5C, #2A5A8C)' }} className="text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold">⚖️</div>
          <div>
            <h1 className="text-xl font-bold">בחירת גמלה — סעיף 320</h1>
            <p className="text-xs opacity-80">אביעד יצחקי, מינהלי גמלאות, ביטוח לאומי</p>
          </div>
        </div>
      </div>
    </header>
  );
}
