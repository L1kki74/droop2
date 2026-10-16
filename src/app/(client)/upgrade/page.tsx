import Button from "@/components/ui/Button";

export default function UpgradePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Апгрейд</h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          Выбери скин из инвентаря и попробуй улучшить его до более дорогого.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="card p-6 text-center min-h-[280px] flex flex-col items-center justify-center">
          <p className="text-text-muted text-sm mb-4">Твой скин</p>
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
            <span className="text-text-muted text-sm">Выбери скин</span>
          </div>
          <Button variant="outline" size="sm">Выбрать из инвентаря</Button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-3xl">⬆</div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">0%</p>
            <p className="text-sm text-text-muted">Шанс успеха</p>
          </div>
          <Button size="lg" disabled>Апгрейд</Button>
        </div>

        <div className="card p-6 text-center min-h-[280px] flex flex-col items-center justify-center">
          <p className="text-text-muted text-sm mb-4">Желаемый скин</p>
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
            <span className="text-text-muted text-sm">Выбери цель</span>
          </div>
          <Button variant="outline" size="sm">Выбрать скин</Button>
        </div>
      </div>
    </div>
  );
}
