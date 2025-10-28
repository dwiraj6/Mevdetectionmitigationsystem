import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { DashboardView } from "./components/DashboardView";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { TransactionSimulator } from "./components/TransactionSimulator";
import { ProtectionTools } from "./components/ProtectionTools";
import {
  Shield,
  Activity,
  BarChart3,
  TestTube,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white">MEV Shield</h1>
                <p className="text-slate-400 text-sm">
                  Front-Running Detection & Mitigation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-green-400 text-sm">
                  Live Monitoring
                </span>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">
                  Network
                </p>
                <p className="text-white">Ethereum Mainnet</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-slate-900/50 border border-slate-800 p-1">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-slate-800"
            >
              <Activity className="w-4 h-4 mr-2" />
              Live Monitor
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-slate-800"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="simulator"
              className="data-[state=active]:bg-slate-800"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Transaction Simulator
            </TabsTrigger>
            <TabsTrigger
              value="protection"
              className="data-[state=active]:bg-slate-800"
            >
              <Shield className="w-4 h-4 mr-2" />
              Protection Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardView />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <TransactionSimulator />
          </TabsContent>

          <TabsContent value="protection" className="space-y-6">
            <ProtectionTools />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}