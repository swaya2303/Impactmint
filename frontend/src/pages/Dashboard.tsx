import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Sidebar from '../components/layout/Sidebar';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import ThemeToggle from '../components/ui/ThemeToggle';
import MetricsCards from '../components/analytics/MetricsCards';
import ImpactEquivalents from '../components/analytics/ImpactEquivalents';
import TimeSeriesChart from '../components/analytics/TimeSeriesChart';
import MethodologyChart from '../components/analytics/MethodologyChart';
import ProjectMap from '../components/analytics/ProjectMap';
import ProjectTable from '../components/analytics/ProjectTable';
import TransactionExplorer from '../components/analytics/TransactionExplorer';

const Dashboard: React.FC = () => {
    useWebSocket(); // Connect to real-time updates

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-colors">
                    <div className="px-8 py-6">
                        {/* Breadcrumb */}
                        <div className="mb-4">
                            <Breadcrumb
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Dashboard' },
                                ]}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Carbon Offset Analytics
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Real-time insights into environmental impact
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <Badge variant="success" size="md" rounded>
                                    🟢 Live
                                </Badge>
                                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md hover:shadow-lg transform hover:scale-105">
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8 space-y-8">
                    {/* Hero Metrics */}
                    <div className="animate-fadeIn">
                        <MetricsCards />
                    </div>

                    {/* Impact Equivalents */}
                    <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        <ImpactEquivalents />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <TimeSeriesChart />
                        <MethodologyChart />
                    </div>

                    {/* Map */}
                    <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                        <ProjectMap />
                    </div>

                    {/* Project Table */}
                    <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                        <ProjectTable />
                    </div>

                    {/* Transaction Explorer */}
                    <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                        <TransactionExplorer />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;