interface DeploymentFailedProps {
  deploymentStatus?: any;
  onRetryClick: () => void;
}

const DeploymentFailed: React.FC<DeploymentFailedProps> = ({
  deploymentStatus,
  onRetryClick,
}) => {
  return (
    <div className="flex w-full flex-col gap-[20px] text-[14px] leading-[20px]">
      <div className="flex w-full flex-col gap-[16px]">
        {Object.entries(deploymentStatus).map((entry) => {
          const [key, value] = entry;
          return value === 'failed' ? (
            <div
              key={key}
              className="flex flex-row justify-between rounded-[12px] border-1 border-[#343434] p-[16px] text-[14px] leading-[20px]"
            >
              <div>
                {key} : <span className="text-[#FF3B30]">{value}</span>
              </div>
            </div>
          ) : null;
        })}
      </div>
      <div className="flex w-full flex-col gap-[10px]">
        <button
          onClick={onRetryClick}
          className="text-medium h-[32px] w-full rounded-[8px] bg-[#2D2305] text-[#F5E147]"
        >
          Retry deployment
        </button>
        <a
          href="/support/"
          className="text-medium h-[32px] w-full rounded-[8px] border-1 border-[#606060] text-center leading-[30px]"
        >
          Contact support
        </a>
      </div>
    </div>
  );
};

export default DeploymentFailed;
