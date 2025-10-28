import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { generateHistoricalData, generateProtocolStats, generateTopBots } from '../lib/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Bot, DollarSign } from 'lucide-react';

export function AnalyticsPanel() {
  const historicalData = generateHistoricalData(14);
  const protocolStats = generateProtocolStats();
  const topBots = generateTopBots();

  const attackTypeData = [
    { name: 'Sandwich', value: 458, color: '#ef4444' },
    { name: 'Front-Run', value: 287, color: '#f97316' },
    { name: 'Back-Run', value: 156, color: '#eab308' },
    { name: 'Liquidation', value: 92, color: '#8b5cf6' },
  ];

  const totalMEVExtracted = '1,284.5 ETH';
  const totalAttacks = attackTypeData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Total MEV Extracted (14d)</CardDescription>
            <CardTitle className="text-2xl text-white">{totalMEVExtracted}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+23% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Total Attacks Detected</CardDescription>
            <CardTitle className="text-2xl text-white">{totalAttacks.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Target className="w-4 h-4" />
              <span>Last 14 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Active MEV Bots</CardDescription>
            <CardTitle className="text-2xl text-white">127</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Bot className="w-4 h-4" />
              <span>Tracked addresses</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Avg Attack Profit</CardDescription>
            <CardTitle className="text-2xl text-white">3.2 ETH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <DollarSign className="w-4 h-4" />
              <span>Per successful attack</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Frequency Over Time */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">MEV Attack Frequency</CardTitle>
            <CardDescription className="text-slate-400">Daily attack count (Last 14 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="attacks" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attack Type Distribution */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Attack Type Distribution</CardTitle>
            <CardDescription className="text-slate-400">Breakdown by attack category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={300}>
                <PieChart>
                  <Pie
                    data={attackTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {attackTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {attackTypeData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Stats */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Most Targeted Protocols</CardTitle>
          <CardDescription className="text-slate-400">MEV attacks by DeFi protocol</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={protocolStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="attacks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top MEV Bots */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Top MEV Bot Addresses</CardTitle>
          <CardDescription className="text-slate-400">Most active attackers by transaction count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topBots.map((bot, idx) => (
              <div key={bot.address} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-sm">#{idx + 1}</span>
                  </div>
                  <div>
                    <p className="text-slate-200 font-mono text-sm">{bot.address}</p>
                    <p className="text-slate-400 text-xs mt-1">{bot.attacks} attacks detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Total Profit</p>
                    <p className="text-green-400">{bot.profit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Success Rate</p>
                    <p className="text-white">{bot.success}</p>
                  </div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    Known Bot
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MEV Volume Over Time */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">MEV Extraction Volume</CardTitle>
          <CardDescription className="text-slate-400">Total value extracted over time (ETH)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="volume" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
