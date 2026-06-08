import StatCards from "@/components/dashboard/StatCard";
import SpecialtyDonutChart from "@/components/dashboard/SpecialtyDonutChart";

import Registry from "@/components/dashboard/Registry";
import WizardTable from "@/components/wizards/WizardTable";

export default function DashboardPage() {
  return (
    <>

      {/* Stat Cards */}
      <StatCards />

      {/* Charts */}
      <div className="charts-row">
        <Registry/>
        
        <SpecialtyDonutChart /> 
      </div>

      {/* Wizard Table */}
      <WizardTable />
    </>
  );
}
