import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, Zap, Lock, TrendingUp, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function ProtectionTools() {
  const [enabledProtections, setEnabledProtections] = useState({
    flashbots: true,
    autoDetect: true,
    privateRelay: false,
    gasOptimization: true,
  });

  const toggleProtection = (key: keyof typeof enabledProtections) => {
    setEnabledProtections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const protectionMethods = [
    {
      name: 'Flashbots Protect',
      description: 'Send transactions privately to miners, bypassing the public mempool',
      icon: Shield,
      status: 'Recommended',
      statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
      features: [
        'Zero mempool exposure',
        'No failed transaction fees',
        'Direct validator submission',
        'MEV-Share rebates available',
      ],
      stats: {
        successRate: '99.2%',
        avgSavings: '2.3 ETH',
        txProcessed: '1.2M+',
      },
    },
    {
      name: 'Eden Network',
      description: 'Priority block space with front-running protection',
      icon: Zap,
      status: 'Available',
      statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      features: [
        'Priority transaction ordering',
        'Staking rewards for EDEN holders',
        'Faster execution',
        'MEV protection guarantees',
      ],
      stats: {
        successRate: '97.8%',
        avgSavings: '1.8 ETH',
        txProcessed: '850K+',
      },
    },
    {
      name: 'MEV Blocker',
      description: 'Returns MEV profits back to users through rebates',
      icon: TrendingUp,
      status: 'Beta',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      features: [
        'User profit sharing',
        'CoW Protocol integration',
        'Transparent rebate system',
        'Multi-protocol support',
      ],
      stats: {
        successRate: '96.5%',
        avgSavings: '1.5 ETH',
        txProcessed: '420K+',
      },
    },
    {
      name: 'Private Transaction Pool',
      description: 'Custom RPC endpoint for private transaction submission',
      icon: Lock,
      status: 'Enterprise',
      statusColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      features: [
        'Dedicated infrastructure',
        'Custom protection rules',
        'API integration',
        'Advanced analytics',
      ],
      stats: {
        successRate: '98.5%',
        avgSavings: '2.1 ETH',
        txProcessed: '300K+',
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Active Protection Status */}
      <Card className="bg-gradient-to-br from-green-950/30 to-green-900/10 border-green-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Protection Status</CardTitle>
              <CardDescription className="text-slate-400">Your current MEV protection configuration</CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <div>
                  <Label htmlFor="flashbots" className="text-slate-300">Flashbots Protect</Label>
                  <p className="text-slate-500 text-xs">Private relay enabled</p>
                </div>
              </div>
              <Switch
                id="flashbots"
                checked={enabledProtections.flashbots}
                onCheckedChange={() => toggleProtection('flashbots')}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div>
                  <Label htmlFor="autoDetect" className="text-slate-300">Auto-Detection</Label>
                  <p className="text-slate-500 text-xs">Real-time monitoring</p>
                </div>
              </div>
              <Switch
                id="autoDetect"
                checked={enabledProtections.autoDetect}
                onCheckedChange={() => toggleProtection('autoDetect')}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-purple-400" />
                <div>
                  <Label htmlFor="privateRelay" className="text-slate-300">Private Relay</Label>
                  <p className="text-slate-500 text-xs">Direct submission</p>
                </div>
              </div>
              <Switch
                id="privateRelay"
                checked={enabledProtections.privateRelay}
                onCheckedChange={() => toggleProtection('privateRelay')}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-green-400" />
                <div>
                  <Label htmlFor="gasOptimization" className="text-slate-300">Gas Optimization</Label>
                  <p className="text-slate-500 text-xs">Smart pricing</p>
                </div>
              </div>
              <Switch
                id="gasOptimization"
                checked={enabledProtections.gasOptimization}
                onCheckedChange={() => toggleProtection('gasOptimization')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protection Methods */}
      <div className="space-y-4">
        <div>
          <h2 className="text-white mb-2">Available Protection Methods</h2>
          <p className="text-slate-400 text-sm">Choose the best protection strategy for your transactions</p>
        </div>

        {protectionMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{method.name}</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {method.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={method.statusColor}>
                    {method.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <p className="text-slate-300 mb-3">Key Features</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {method.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Success Rate</p>
                    <p className="text-white">{method.stats.successRate}</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Avg Savings</p>
                    <p className="text-green-400">{method.stats.avgSavings}</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Tx Processed</p>
                    <p className="text-white">{method.stats.txProcessed}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Configure {method.name}
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RPC Configuration */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">RPC Endpoint Configuration</CardTitle>
          <CardDescription className="text-slate-400">
            Connect your wallet to protected RPC endpoints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-300">Flashbots Protect RPC</p>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                  Active
                </Badge>
              </div>
              <code className="text-xs text-slate-400 bg-slate-900 p-2 rounded block">
                https://rpc.flashbots.net
              </code>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-300">Eden Network RPC</p>
                <Badge variant="outline" className="text-slate-400 border-slate-600">
                  Available
                </Badge>
              </div>
              <code className="text-xs text-slate-400 bg-slate-900 p-2 rounded block">
                https://api.edennetwork.io/v1/rpc
              </code>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-300">MEV Blocker RPC</p>
                <Badge variant="outline" className="text-slate-400 border-slate-600">
                  Available
                </Badge>
              </div>
              <code className="text-xs text-slate-400 bg-slate-900 p-2 rounded block">
                https://rpc.mevblocker.io
              </code>
            </div>
          </div>

          <Alert className="border-blue-500/30 bg-blue-500/10">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-400 text-sm">
              <span className="font-semibold">Setup Guide:</span> Add these RPC endpoints to your wallet (MetaMask, WalletConnect) to automatically route transactions through protected channels.
            </AlertDescription>
          </Alert>

          <Button className="w-full" variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Integration Documentation
          </Button>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card className="bg-gradient-to-br from-blue-950/30 to-purple-900/10 border-blue-900/50">
        <CardHeader>
          <CardTitle className="text-white">Your Protection Impact</CardTitle>
          <CardDescription className="text-slate-400">
            Estimated savings from enabled protections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 mb-2">Protected Transactions</p>
              <p className="text-3xl text-white mb-1">342</p>
              <p className="text-green-400 text-sm">Last 30 days</p>
            </div>
            <div className="text-center p-6 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 mb-2">Total Savings</p>
              <p className="text-3xl text-green-400 mb-1">8.7 ETH</p>
              <p className="text-slate-400 text-sm">≈ $26,100</p>
            </div>
            <div className="text-center p-6 bg-slate-900/50 rounded-lg">
              <p className="text-slate-400 mb-2">Attacks Prevented</p>
              <p className="text-3xl text-white mb-1">47</p>
              <p className="text-red-400 text-sm">High-risk blocked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
