import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { generateMockTransaction, Transaction } from '../lib/mockData';
import { AlertTriangle, TrendingUp, Shield, Activity } from 'lucide-react';

export function DashboardView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalDetected: 0,
    highRisk: 0,
    avgRisk: 0,
    lastHour: 0,
  });

  useEffect(() => {
    // Initial transactions
    const initial = Array.from({ length: 20 }, generateMockTransaction);
    setTransactions(initial);

    // Add new transaction every 2-4 seconds
    const interval = setInterval(() => {
      const newTx = generateMockTransaction();
      setTransactions(prev => [newTx, ...prev.slice(0, 49)]);
    }, 2000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mevTransactions = transactions.filter(tx => tx.type !== 'normal');
    const highRisk = transactions.filter(tx => tx.riskScore > 70).length;
    const avgRisk = transactions.length > 0 
      ? transactions.reduce((sum, tx) => sum + tx.riskScore, 0) / transactions.length 
      : 0;

    setStats({
      totalDetected: mevTransactions.length,
      highRisk,
      avgRisk: Math.round(avgRisk),
      lastHour: Math.floor(mevTransactions.length * 1.8),
    });
  }, [transactions]);

  const getRiskColor = (score: number) => {
    if (score >= 71) return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (score >= 31) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    return 'text-green-400 bg-green-500/10 border-green-500/20';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 71) return 'High Risk';
    if (score >= 31) return 'Medium Risk';
    return 'Low Risk';
  };

  const getTypeLabel = (type: Transaction['type']) => {
    const labels = {
      'normal': 'Normal',
      'front-run': 'Front-Run',
      'sandwich-front': 'Sandwich (Front)',
      'sandwich-back': 'Sandwich (Back)',
      'back-run': 'Back-Run',
    };
    return labels[type];
  };

  const getTypeBadgeColor = (type: Transaction['type']) => {
    if (type === 'normal') return 'bg-slate-700 text-slate-300';
    if (type.includes('sandwich')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">MEV Attacks Detected</CardDescription>
            <CardTitle className="text-3xl text-white">{stats.totalDetected}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Activity className="w-4 h-4" />
              <span>Live monitoring active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">High Risk Transactions</CardDescription>
            <CardTitle className="text-3xl text-red-400">{stats.highRisk}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Requires attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Average Risk Score</CardDescription>
            <CardTitle className="text-3xl text-yellow-400">{stats.avgRisk}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="w-4 h-4" />
              <span>Across all transactions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardDescription className="text-slate-400">Attacks (Last Hour)</CardDescription>
            <CardTitle className="text-3xl text-purple-400">{stats.lastHour}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Shield className="w-4 h-4" />
              <span>Protected users: 24</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {transactions.slice(0, 3).some(tx => tx.riskScore > 70) && (
        <Alert className="border-red-500/30 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            <span className="font-semibold">High Risk Alert:</span> {transactions.filter(tx => tx.riskScore > 70).length} sandwich attacks detected in the last minute. Consider using private relay for transactions.
          </AlertDescription>
        </Alert>
      )}

      {/* Live Transaction Feed */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Live Transaction Feed</CardTitle>
              <CardDescription className="text-slate-400">Real-time mempool monitoring</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              {transactions.length} transactions
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {transactions.map((tx, idx) => (
                <div
                  key={tx.hash}
                  className={`p-4 rounded-lg border transition-all ${
                    tx.type !== 'normal'
                      ? 'bg-red-950/20 border-red-900/30'
                      : 'bg-slate-800/50 border-slate-700'
                  } ${idx === 0 ? 'ring-2 ring-blue-500/50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeBadgeColor(tx.type)}>
                        {getTypeLabel(tx.type)}
                      </Badge>
                      {tx.attackType && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                          {tx.attackType}
                        </Badge>
                      )}
                    </div>
                    <Badge className={getRiskColor(tx.riskScore)}>
                      Risk: {tx.riskScore}/100
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">Transaction Hash</p>
                      <p className="text-slate-200 font-mono text-xs">{tx.hash.substring(0, 20)}...</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">From Address</p>
                      <p className="text-slate-200 font-mono text-xs">{tx.from.substring(0, 20)}...</p>
                    </div>
                    {tx.protocol && (
                      <div>
                        <p className="text-slate-400 mb-1">Protocol</p>
                        <p className="text-slate-200">{tx.protocol}</p>
                      </div>
                    )}
                    {tx.tokenPair && (
                      <div>
                        <p className="text-slate-400 mb-1">Token Pair</p>
                        <p className="text-slate-200">{tx.tokenPair}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-400 mb-1">Value</p>
                      <p className="text-slate-200">{tx.value} ETH</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Gas Price</p>
                      <p className="text-slate-200">{tx.gasPrice.toFixed(2)} Gwei</p>
                    </div>
                    {tx.confidence && (
                      <div>
                        <p className="text-slate-400 mb-1">Detection Confidence</p>
                        <p className="text-slate-200">{tx.confidence.toFixed(1)}%</p>
                      </div>
                    )}
                    {tx.expectedLoss && (
                      <div>
                        <p className="text-slate-400 mb-1">Expected Loss</p>
                        <p className="text-red-400">{tx.expectedLoss}</p>
                      </div>
                    )}
                  </div>

                  {tx.riskScore > 70 && (
                    <Alert className="mt-3 border-red-500/30 bg-red-500/5">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400 text-sm">
                        <span className="font-semibold">{getRiskLabel(tx.riskScore)}:</span> This transaction shows strong indicators of MEV attack. Recommend using Flashbots Protect.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
