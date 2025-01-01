import { Button } from '@components/Button';
import { ArrowLeft } from '@components/Icons';

interface TopActionsProps {
  templateDeploymentUrl: string;
}

export const TopActions: React.FC<TopActionsProps> = ({
  templateDeploymentUrl,
}) => {
  return (
    <div className="mb-20 flex w-full justify-between">
      <Button size="sm" variant="ghost" href="/templates/">
        <ArrowLeft />
        Go back
      </Button>

      <Button
        size="sm"
        variant="app-primary"
        href={`${templateDeploymentUrl}?deploy=true`}
      >
        Deploy template
      </Button>
    </div>
  );
};
