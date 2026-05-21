import { CHAINS, type ChainId } from "../lib/bridge-config";

interface Props {
  label: string;
  value: ChainId;
  options: ChainId[];
  onChange: (id: ChainId) => void;
}

export function ChainPicker({ label, value, options, onChange }: Props) {
  return (
    <label className="block">
      <span className="block text-[10px] font-bold tracking-widest uppercase text-kite-fg/55 mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as ChainId)}
        className="w-full px-3 py-2.5 rounded-md border border-kite-border bg-kite-bg font-mono text-sm focus:outline-none focus:border-kite-primary"
      >
        {options.map((id) => (
          <option key={id} value={id}>
            {CHAINS[id].name}
          </option>
        ))}
      </select>
    </label>
  );
}
