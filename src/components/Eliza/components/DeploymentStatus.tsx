import FieldWithCopyButton from './FieldWithCopyButton';
import { GreenCheck, PendingDots, RedCross } from './Icons';

interface DeploymentStatusProps {
  deploymentStatus?: any;
  fleekMachineUrl?: string;
  isDeploymentComplete: boolean;
  className?: string;
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  deploymentStatus,
  fleekMachineUrl,
  isDeploymentComplete,
}) => {
  return (
    <div className="flex w-full flex-col gap-[20px]">
      {isDeploymentComplete && (
        <>
          {fleekMachineUrl && (
            <div className="flex w-full flex-col gap-[16px] rounded-[12px] border-1 border-[#343434] p-[16px]">
              <h3 className="text-[14px] font-medium text-[#fff]">URL</h3>
              <FieldWithCopyButton value={fleekMachineUrl} />
            </div>
          )}

          <div className="flex w-full flex-col gap-[16px] rounded-[12px] border-1 border-[#343434] p-[16px]">
            <h3 className="text-[14px] font-medium text-[#fff]">
              Useful CLI commands
            </h3>
            <FieldWithCopyButton
              label="View bot usage"
              value={'fleek usage bot'}
            />
            <FieldWithCopyButton label="Stop bot" value={'fleek kill bot'} />
            <FieldWithCopyButton
              label="Refresh bot"
              value={'fleek refresh bot'}
            />
            <p className="text-[14px] leading-[20px]">
              Need more help?{' '}
              <a href="https://fleek.xyz/docs/" className="text-[#F5E147]">
                Read our docs.
              </a>
            </p>
          </div>
        </>
      )}
      {!isDeploymentComplete && deploymentStatus && (
        <div className="flex w-full flex-col gap-[16px] rounded-[12px] border-1 border-[#343434] p-[16px]">
          {Object.entries(deploymentStatus).map((entry) => {
            const [key, value] = entry;
            return (
              <div
                key={key}
                className="flex flex-row justify-between text-[14px] leading-[20px]"
              >
                <div>{key}</div>
                <div>
                  {value === 'success' && <GreenCheck />}
                  {value === 'pending' && <PendingDots />}
                  {value === 'failed' && <RedCross />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeploymentStatus;
