const stats = [
  { label: "Пользователи", value: "0", change: "+0%" },
  { label: "Открыто кейсов", value: "0", change: "+0%" },
  { label: "Депозиты (сегодня)", value: "0 ₽", change: "+0%" },
  { label: "Выводы (ожидают)", value: "0", change: "" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Дашборд</h1>
        <p className="text-text-secondary text-sm">Обзор статистики сайта</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary font-bold">
                {s.label[0]}
              </div>
              {s.change && <span className="text-xs text-success">{s.change}</span>}
            </div>
            <p className="text-2xl font-bold mb-1">{s.value}</p>
            <p className="text-sm text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-semibold mb-4">Быстрые действия</h2>
          <div className="space-y-2">
            {[
              { href: "/admin/cases", label: "Добавить кейс" },
              { href: "/admin/skins", label: "Добавить скин" },
              { href: "/admin/promocodes", label: "Создать промокод" },
              { href: "/admin/withdrawals", label: "Проверить выводы" },
            ].map((a) => (
              <a key={a.href} href={a.href} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary hover:bg-background-hover transition text-sm">
                {a.label}
                <span className="text-text-muted">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold mb-4">Последние открытия</h2>
          <div className="text-center py-10 text-text-muted text-sm">Пока нет данных</div>
        </div>
      </div>
    </div>
  );
}
