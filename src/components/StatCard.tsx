type StatCardProps = {
  value: string
  label: string
  detail: string
}

export function StatCard({ value, label, detail }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="text-3xl font-black text-red-600 sm:text-4xl">{value}</div>
      <div className="mt-4 text-lg font-semibold text-slate-800">{label}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  )
}
