// Mock data generator for MEV detection system

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: number;
  timestamp: number;
  type: 'normal' | 'front-run' | 'sandwich-front' | 'sandwich-back' | 'back-run';
  riskScore: number;
  tokenPair?: string;
  protocol?: string;
  attackType?: string;
  confidence?: number;
  expectedLoss?: string;
}

export interface MEVAttack {
  id: string;
  type: 'sandwich' | 'front-run' | 'back-run';
  timestamp: number;
  protocol: string;
  victimTx: string;
  attackerAddress: string;
  estimatedProfit: string;
  victimLoss: string;
  tokenPair: string;
}

const protocols = ['Uniswap V3', 'Uniswap V2', 'SushiSwap', 'Curve', 'Balancer', '1inch'];
const tokenPairs = ['ETH/USDC', 'WBTC/ETH', 'DAI/USDC', 'USDT/ETH', 'LINK/ETH', 'UNI/ETH'];
const attackTypes = ['Sandwich Attack', 'Front-Running', 'Back-Running', 'Liquidation'];

const knownMEVBots = [
  '0x00000000003b3cc22aF3aE1EAc0440BcEe416B40',
  '0xA69babEF1cA67A37Ffaf7a485DfFF3382056e78C',
  '0x000000000035B5e5ad9019092C665357240f594e',
  '0xBaDbEeFbADdeaDBEEFbaDDEAdBeEfbADDeADBEEF',
];

function randomHash(): string {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function randomAddress(): string {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockTransaction(): Transaction {
  const isMEV = Math.random() < 0.3; // 30% chance of MEV
  const types: Transaction['type'][] = ['normal', 'front-run', 'sandwich-front', 'sandwich-back', 'back-run'];
  
  let type: Transaction['type'] = 'normal';
  let riskScore = Math.floor(Math.random() * 30); // Low risk for normal
  
  if (isMEV) {
    type = randomElement(types.filter(t => t !== 'normal'));
    riskScore = type.includes('sandwich') ? Math.floor(70 + Math.random() * 30) : Math.floor(40 + Math.random() * 40);
  }
  
  const tx: Transaction = {
    hash: randomHash(),
    from: isMEV && Math.random() < 0.5 ? randomElement(knownMEVBots) : randomAddress(),
    to: randomAddress(),
    value: (Math.random() * 50).toFixed(4),
    gasPrice: isMEV ? 30 + Math.random() * 70 : 10 + Math.random() * 30,
    timestamp: Date.now(),
    type,
    riskScore,
  };
  
  if (isMEV) {
    tx.tokenPair = randomElement(tokenPairs);
    tx.protocol = randomElement(protocols);
    tx.attackType = randomElement(attackTypes);
    tx.confidence = 75 + Math.random() * 25;
    tx.expectedLoss = (Math.random() * 5).toFixed(3) + ' ETH';
  }
  
  return tx;
}

export function generateMEVAttack(): MEVAttack {
  return {
    id: randomHash().substring(0, 10),
    type: randomElement(['sandwich', 'front-run', 'back-run']),
    timestamp: Date.now() - Math.random() * 3600000,
    protocol: randomElement(protocols),
    victimTx: randomHash().substring(0, 20),
    attackerAddress: randomElement(knownMEVBots),
    estimatedProfit: (Math.random() * 10).toFixed(3) + ' ETH',
    victimLoss: (Math.random() * 5).toFixed(3) + ' ETH',
    tokenPair: randomElement(tokenPairs),
  };
}

export function generateHistoricalData(days: number) {
  const data = [];
  const now = Date.now();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      attacks: Math.floor(50 + Math.random() * 150),
      volume: Math.floor(500 + Math.random() * 2000),
      avgProfit: (2 + Math.random() * 4).toFixed(2),
    });
  }
  
  return data;
}

export function generateProtocolStats() {
  return protocols.map(protocol => ({
    name: protocol,
    attacks: Math.floor(20 + Math.random() * 200),
    volume: (Math.random() * 5000).toFixed(0),
  }));
}

export function generateTopBots() {
  return knownMEVBots.map((address, idx) => ({
    address,
    attacks: Math.floor(100 - idx * 20 + Math.random() * 50),
    profit: ((10 - idx * 2) + Math.random() * 5).toFixed(2) + ' ETH',
    success: (85 + Math.random() * 10).toFixed(1) + '%',
  }));
}
