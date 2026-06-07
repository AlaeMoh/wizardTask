import StatCards from "@/components/dashboard/StatCard";
import SpecialtyDonutChart from "@/components/dashboard/SpecialtyDonutChart";
import WizardTable from "@/components/wizards/WizardTable";
import Registry from "@/components/dashboard/Registry";

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
