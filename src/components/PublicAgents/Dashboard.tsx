import { Sidebar } from './Sidebar';
import { AsideProfile } from './AsideProfile';
import { Content } from './Content';
import type { PublicAgent } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export const queryClient = new QueryClient();

type DashboardProps = {
  agent: PublicAgent;
};

export const Dashboard: React.FC<DashboardProps> = ({ agent }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-[240px_minmax(0,1fr)_320px] font-inter">
        <Sidebar agent={agent} />
        <Content agent={agent} />
        <AsideProfile agent={agent} />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#222222',
            color: '#fff',
            fontSize: '12px',
          },
        }}
      />
    </QueryClientProvider>
  );
};
