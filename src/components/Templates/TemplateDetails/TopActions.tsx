import { Button } from '@components/Button';
import { ArrowLeft } from '@components/Icons';
import { useAuthStore } from '@fleek-platform/login-button';
import { getDeploymentUrl } from '@utils/url';

interface TopActionsProps {
  templateId: string;
}

export const TopActions: React.FC<TopActionsProps> = ({ templateId }) => {
  const { projectId } = useAuthStore();

  const deploymentUrl = getDeploymentUrl(projectId, templateId);

  return (
    <div className="mb-20 flex w-full justify-between">
      <Button size="sm" variant="ghost" href="/templates/">
        <ArrowLeft />
        Go back
      </Button>

      <Button size="sm" variant="app-primary" href={deploymentUrl}>
        Deploy template
      </Button>
    </div>
  );
};
