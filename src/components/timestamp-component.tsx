import { LucideIcon } from "lucide-react";

export default function TimestampComponent({
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-2 text-center shadow-sm">
      <Icon className="hidden size-5 md:block" />
      <p className="font-semibold">{label}</p>
    </div>
  );
}
