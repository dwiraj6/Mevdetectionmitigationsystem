import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertTriangle, CheckCircle, Info, Play, Shield } from 'lucide-react';

interface SimulationResult {
  riskScore: number;
  expectedLoss: string;
  priceImpact: string;
  sandwichProbability: number;
  recommendation: string;
  optimalGas: string;
  estimatedSlippage: string;
  alternatives: Array<{ action: string; benefit: string }>;
}

export function TransactionSimulator() {
  const [formData, setFormData] = useState({
    amount: '',
    tokenFrom: 'ETH',
    tokenTo: 'USDC',
    protocol: 'uniswap-v3',
    slippage: '0.5',
    gasPrice: '',
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async () => {
    setIsSimulating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock simulation results
    const amount = parseFloat(formData.amount) || 1;
    const isMediumRisk = amount > 10;
    const isHighRisk = amount > 50;

    const riskScore = isHighRisk ? 75 + Math.random() * 20 : isMediumRisk ? 40 + Math.random() * 30 : 10 + Math.random() * 25;
    
    const simulationResult: SimulationResult = {
      riskScore: Math.round(riskScore),
      expectedLoss: isHighRisk ? (amount * 0.04).toFixed(3) + ' ETH' : isMediumRisk ? (amount * 0.02).toFixed(3) + ' ETH' : (amount * 0.005).toFixed(3) + ' ETH',
      priceImpact: isHighRisk ? '3.2%' : isMediumRisk ? '1.5%' : '0.3%',
      sandwichProbability: Math.round(riskScore),
      recommendation: isHighRisk 
        ? 'Use Flashbots Protect - High sandwich attack risk detected'
        : isMediumRisk 
        ? 'Consider private relay or split transaction'
        : 'Safe to proceed with standard transaction',
      optimalGas: (35 + Math.random() * 20).toFixed(1) + ' Gwei',
      estimatedSlippage: isHighRisk ? '2.8%' : isMediumRisk ? '1.2%' : '0.4%',
      alternatives: isHighRisk ? [
        { action: 'Use Flashbots Protect RPC', benefit: 'Eliminate sandwich attack risk' },
        { action: 'Split into 3 smaller trades', benefit: 'Reduce to ~25 ETH each, lower impact' },
        { action: 'Wait 5-10 minutes', benefit: 'Mempool activity may decrease' },
      ] : isMediumRisk ? [
        { action: 'Use private relay', benefit: 'Reduce MEV exposure by 80%' },
        { action: 'Increase slippage to 1%', benefit: 'Improve execution certainty' },
      ] : [
        { action: 'Proceed with transaction', benefit: 'Low risk detected' },
      ],
    };

    setResult(simulationResult);
    setIsSimulating(false);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Transaction Simulator</CardTitle>
          <CardDescription className="text-slate-400">
            Test your transaction before submitting to detect MEV vulnerability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1.0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenFrom" className="text-slate-300">From Token</Label>
              <Select value={formData.tokenFrom} onValueChange={(value) => setFormData({ ...formData, tokenFrom: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="WBTC">WBTC</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenTo" className="text-slate-300">To Token</Label>
              <Select value={formData.tokenTo} onValueChange={(value) => setFormData({ ...formData, tokenTo: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="protocol" className="text-slate-300">Protocol</Label>
              <Select value={formData.protocol} onValueChange={(value) => setFormData({ ...formData, protocol: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uniswap-v3">Uniswap V3</SelectItem>
                  <SelectItem value="uniswap-v2">Uniswap V2</SelectItem>
                  <SelectItem value="sushiswap">SushiSwap</SelectItem>
                  <SelectItem value="curve">Curve</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slippage" className="text-slate-300">Slippage Tolerance (%)</Label>
              <Input
                id="slippage"
                type="number"
                step="0.1"
                placeholder="0.5"
                value={formData.slippage}
                onChange={(e) => setFormData({ ...formData, slippage: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gasPrice" className="text-slate-300">Gas Price (Gwei) - Optional</Label>
              <Input
                id="gasPrice"
                type="number"
                placeholder="Auto"
                value={formData.gasPrice}
                onChange={(e) => setFormData({ ...formData, gasPrice: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <Button
            onClick={handleSimulate}
            disabled={isSimulating || !formData.amount}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </Button>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {isSimulating && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto animate-pulse">
                <Play className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-slate-300">Analyzing mempool state and simulating transaction...</p>
              <Progress value={66} className="w-full max-w-md mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && !isSimulating && (
        <>
          {/* Risk Assessment */}
          <Card className={`border-2 ${
            result.riskScore >= 70 ? 'bg-red-950/20 border-red-900/50' :
            result.riskScore >= 40 ? 'bg-yellow-950/20 border-yellow-900/50' :
            'bg-green-950/20 border-green-900/50'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Risk Assessment</CardTitle>
                <Badge className={`${
                  result.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  result.riskScore >= 40 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {getRiskLabel(result.riskScore)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">MEV Risk Score</span>
                  <span className={`text-2xl ${getRiskColor(result.riskScore)}`}>
                    {result.riskScore}/100
                  </span>
                </div>
                <Progress value={result.riskScore} className="h-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Expected Loss</p>
                  <p className="text-red-400">{result.expectedLoss}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Price Impact</p>
                  <p className="text-white">{result.priceImpact}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Sandwich Probability</p>
                  <p className="text-white">{result.sandwichProbability}%</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-1">Est. Slippage</p>
                  <p className="text-white">{result.estimatedSlippage}</p>
                </div>
              </div>

              <Alert className={`${
                result.riskScore >= 70 ? 'border-red-500/30 bg-red-500/10' :
                result.riskScore >= 40 ? 'border-yellow-500/30 bg-yellow-500/10' :
                'border-green-500/30 bg-green-500/10'
              }`}>
                {result.riskScore >= 70 ? (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                ) : result.riskScore >= 40 ? (
                  <Info className="h-4 w-4 text-yellow-400" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                )}
                <AlertDescription className={`${
                  result.riskScore >= 70 ? 'text-red-400' :
                  result.riskScore >= 40 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  <span className="font-semibold">Recommendation:</span> {result.recommendation}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Protection Strategies */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Protection Strategies</CardTitle>
              <CardDescription className="text-slate-400">
                Recommended actions to minimize MEV exposure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.alternatives.map((alt, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{alt.action}</h4>
                      <p className="text-slate-400 text-sm">{alt.benefit}</p>
                    </div>
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-950/20 border border-blue-900/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-blue-400">Optimal Gas Price: <span className="font-semibold">{result.optimalGas}</span></p>
                    <p className="text-slate-300 text-sm">
                      Setting gas price too high may attract front-runners. The recommended gas price balances speed and MEV risk.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <Shield className="w-4 h-4 mr-2" />
              Submit via Flashbots Protect
            </Button>
            <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
              Submit Standard Transaction
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
