import { Box } from './Box';
import FieldWithCopyButton from './FieldWithCopyButton';
import { GreenCheck, RedCross } from './Icons';
import Link, { Target } from './Link';
import { Text } from './Text';
// import { getDefined } from '../defined';
import { routes } from '../settings';

// TODO: It'll be replaced by the standalone version
// which distribution will replace the `process.env`
// due to `process.env` not working in astro
// and that the Eliza encapsulation shouldn't use the
// host application features, e.g. astro `import.meta.env`
// for this reason, it's hard-typed but will change shortly
// once ported to the agents-ui repo
// const publicDashboardUrl = getDefined('PUBLIC_UI_APP_URL');
const publicDashboardUrl = typeof process.env.PUBLIC_UI_APP_URL === 'undefined'
  ? import.meta.env.PUBLIC_UI_APP_URL
  : '';

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
    ? `${publicDashboardUrl}/${routes.agentsDashboardPage.replace('[projectId]', projectId)}`
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
