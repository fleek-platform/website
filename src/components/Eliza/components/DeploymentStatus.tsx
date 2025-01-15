import { Box } from './Box';
import FieldWithCopyButton from './FieldWithCopyButton';
import { GreenCheck, PendingDots, RedCross } from './Icons';
import Link, { Target } from './Link';
import { Text } from './Text';
import settings from '@base/settings.json';

const UI_APP_URL = import.meta.env.PUBLIC_UI_APP_URL;

interface DeploymentStatusProps {
  deploymentStatus?: any;
  agentId?: string;
  isDeploymentComplete: boolean;
  className?: string;
  projectId?: string;
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  deploymentStatus,
  agentId,
  isDeploymentComplete,
  projectId,
}) => {
  const dashboardUrl = projectId
    ? `${UI_APP_URL}${settings.elizaPage.agentsDashboardPage.replace('[projectId]', projectId)}`
    : null;

  return (
    <Box className="gap-20">
      {isDeploymentComplete && (
        <>
          {dashboardUrl && (
            <Box variant="container" className="gap-16 bg-transparent">
              <Text as="h3" variant="primary" weight={500}>
                Link to dashboard
              </Text>
              <Link href={dashboardUrl}>{dashboardUrl}</Link>
            </Box>
          )}

          {agentId && (
            <Box variant="container" className="gap-16 bg-transparent">
              <Text as="h3" variant="primary" weight={500}>
                Agent Id
              </Text>
              <FieldWithCopyButton value={agentId} />
            </Box>
          )}

          <Box variant="container" className="gap-16 bg-transparent">
            <Text as="h3" variant="primary" weight={500}>
              Useful CLI commands
            </Text>
            <FieldWithCopyButton
              label="View bot usage"
              value={'fleek usage bot'}
            />
            <FieldWithCopyButton label="Stop bot" value={'fleek kill bot'} />
            <FieldWithCopyButton
              label="Refresh bot"
              value={'fleek refresh bot'}
            />
            <Text variant="secondary">
              Need more help?{' '}
              <Link
                target={Target.Blank}
                href="https://fleek.xyz/docs/"
                className="text-elz-accent-11 hover:text-elz-accent-12"
              >
                Read our docs.
              </Link>
            </Text>
          </Box>
        </>
      )}
      {!isDeploymentComplete && deploymentStatus && (
        <Box variant="container" className="gap-16 bg-transparent">
          {Object.entries(deploymentStatus).map((entry) => {
            const [key, value] = entry;
            return (
              <Box key={key} className="flex-row justify-between">
                <Text variant="secondary">{key}</Text>

                {value === 'true' && <GreenCheck />}
                {/* value === 'pending' && <PendingDots /> */}
                {value === 'false' && <RedCross />}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default DeploymentStatus;
