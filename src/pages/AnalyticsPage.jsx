import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { peakUsageHours, sixMonthConsumptionData, topEnergyConsumers, weeklyEnergyCostData } from '../data/mockData';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics / Report</h1>
          <p className="text-sm text-gray-600">Weekly and long-term energy performance analysis</p>
        </div>
        <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">Export Report</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Weekly Average', '91 kWh'],
          ['Monthly Total', '2.8 MWh'],
          ['Estimated Cost', '$840'],
          ['Energy Saved So Far', '186 kWh']
        ].map(([label, val]) => (
          <div key={label} className="card-surface p-4"><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-bold">{val}</p></div>
        ))}
      </div>

      <div className="card-surface p-5">
        <h3 className="mb-1 font-semibold">Weekly Energy and Cost Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEnergyCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" /><YAxis /><Tooltip /><Legend />
              <Bar dataKey="energy" fill="#3B82F6" name="Energy (kWh)" />
              <Bar dataKey="cost" fill="#10B981" name="Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-surface p-5">
        <h3 className="mb-1 font-semibold">Six Month Consumption Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sixMonthConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-surface p-5">
          <h3 className="mb-1 font-semibold">Top Energy Consumer</h3>
          <div className="space-y-3">
            {topEnergyConsumers.map((item) => (
              <div key={item.device}>
                <div className="mb-1 flex justify-between text-sm"><span>{item.device}</span><span>{item.power} kWh</span></div>
                <div className="h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${(item.power / 42) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-5">
          <h3 className="mb-1 font-semibold">Peak Usage Hour</h3>
          <div className="space-y-3">
            {peakUsageHours.map((item) => (
              <div key={item.time}>
                <div className="mb-1 flex justify-between text-sm"><span>{item.time}</span><span>{item.power} kW</span></div>
                <div className="h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(item.power / 18) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
