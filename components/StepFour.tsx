// Bảng ghi nội dung thông điệp — sửa nội dung trực tiếp ở đây
const MESSAGE_ROWS = [
  { label: "Người gửi", content: "..." },
  { label: "Người nhận", content: "..." },
  { label: "Thông điệp", content: "..." },
];

export default function StepFour() {
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-nebula-soft/80">
          Trạm vũ trụ // Khoang mật mã
        </p>
        <h2 className="mt-3 font-display text-lg font-bold text-ice sm:text-xl">
          Toàn bộ thông điệp dành cho em 💌
        </h2>
      </div>

      <div className="glass-panel w-full max-w-2xl overflow-x-auto rounded-2xl p-4 sm:p-6">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-nebula-soft/30">
              <th className="py-2 pr-4 font-mono text-[11px] uppercase tracking-[0.25em] text-nebula-soft">
                Mục
              </th>
              <th className="py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-nebula-soft">
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody>
            {MESSAGE_ROWS.map((row) => (
              <tr
                key={row.label}
                className="border-b border-nebula-soft/15 last:border-0"
              >
                <td className="py-3 pr-4 align-top font-mono text-sm text-stardust">
                  {row.label}
                </td>
                <td className="py-3 align-top font-body text-sm leading-relaxed text-ice">
                  {row.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
