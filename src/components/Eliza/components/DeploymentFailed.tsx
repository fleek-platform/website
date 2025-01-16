import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';

interface DeploymentFailedProps {
  deploymentStatus?: any;
  onRetryClick: () => void;
}

const DeploymentFailed: React.FC<DeploymentFailedProps> = ({
  deploymentStatus,
  onRetryClick,
}) => {
  return (
    <Box className="gap-16">
      {deploymentStatus &&
        Object.entries(deploymentStatus).map((entry) => {
          const [key, value] = entry;
          return value === 'failed' ? (
            <Box
              key={key}
              className="flex-row justify-between rounded-12 border border-elz-neutral-6 p-16"
            >
              <Text variant="secondary">
                {key} : <span className="text-elz-danger-11">{value}</span>
              </Text>
            </Box>
          ) : null;
        })}
      <Button variant="primary" onClick={onRetryClick}>
        Retry deployment
      </Button>
      <Button
        variant="ghost"
        href="/support/"
        className="border border-elz-neutral-6"
      >
        Contact support
      </Button>
    </Box>
  );
};

export default DeploymentFailed;
