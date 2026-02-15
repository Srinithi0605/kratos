import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import StatusBadge from './StatusBadge';

export default function DevicesTable({ devices }) {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const filtered = useMemo(
    () => devices.filter((d) => `${d.name} ${d.location}`.toLowerCase().includes(query.toLowerCase())),
    [devices, query]
  );

  return (
    <div className="card-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Devices</h3>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search device..." className="rounded-xl border border-emerald-100 px-3 py-2 text-sm" />
      </div>
      {message && <p className="mb-2 text-xs text-emerald-700">{message}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500"><tr><th className="py-2">Device</th><th>Location</th><th>On Time</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.name} className="border-t border-gray-100">
                <td className="py-3 font-medium">{d.name}</td><td>{d.location}</td><td>{d.onTime}</td><td><StatusBadge status={d.status} /></td>
                <td className="flex gap-2 py-3 text-gray-500">
                  <button onClick={() => setMessage(`Viewing ${d.name}`)}><Eye size={16} /></button>
                  <button onClick={() => setMessage(`Editing ${d.name}`)}><Pencil size={16} /></button>
                  <button onClick={() => setMessage(`Deleted ${d.name} (UI only)`)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
