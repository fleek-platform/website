import { Sidebar } from './Sidebar';
import { AsideProfile } from './AsideProfile';
import { Content } from './Content';
import type { PublicAgent } from './config';

type DashboardProps = {
  agent: PublicAgent;
};

export const Dashboard: React.FC<DashboardProps> = ({ agent }) => {
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)_320px] font-inter">
      <Sidebar agent={agent} />
      <Content agent={agent} />
      <AsideProfile agent={agent} />
    </div>
  );
};
