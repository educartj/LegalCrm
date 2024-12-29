import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import StatisticsGrid from "./dashboard/StatisticsGrid";
import CaseManagement from "./dashboard/CaseManagement";
import ActivityFeed from "./dashboard/ActivityFeed";
import DeadlineCalendar from "./dashboard/DeadlineCalendar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Statistics Section */}
          <section>
            <StatisticsGrid />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Case Management Section - Takes up 3 columns on xl screens */}
            <div className="xl:col-span-3">
              <CaseManagement />
            </div>

            {/* Sidebar - Takes up 1 column on xl screens */}
            <div className="space-y-6">
              <ActivityFeed />
              <DeadlineCalendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
