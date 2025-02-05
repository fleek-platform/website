import { Button } from '@components/Button';
import { ArrowLeft } from '@components/Icons';
import { useAuthStore } from '@fleek-platform/login-button';

interface TopActionsProps {
  fleekDeploymentUrl: string;
}

const appUrl = import.meta.env.PUBLIC_UI_APP_URL;
if (!appUrl) {
  throw new Error('App url is required to generate template deployment link');
}

export const TopActions: React.FC<TopActionsProps> = ({
  fleekDeploymentUrl,
}) => {
  const { projectId } = useAuthStore();

  const deploymentUrl = `${appUrl}projects/${projectId}/sites/new/?templateId=${fleekDeploymentUrl}`;

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
