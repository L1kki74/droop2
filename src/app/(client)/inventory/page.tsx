import Button from "@/components/ui/Button";
import Link from "next/link";

export default function InventoryPage() {
  const items: any[] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Инвентарь</h1>
          <p className="text-text-secondary">Твои скины. Можешь продать или вывести на Steam.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Продать всё</Button>
          <Button size="sm">Вывести</Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-background-secondary flex items-center justify-center mx-auto mb-4 text-3xl">📦</div>
          <h3 className="text-lg font-semibold mb-2">Инвентарь пуст</h3>
          <p className="text-text-secondary text-sm mb-6">Открой кейсы, чтобы получить скины</p>
          <Link href="/cases"><Button>Перейти к кейсам</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" />
      )}
    </div>
  );
}
