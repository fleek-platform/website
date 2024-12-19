import toast from 'react-hot-toast';
import { ClipboardCopy } from './Icons';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
interface FieldWithCopyButtonProps {
  value: string;
  label?: string;
}

const FieldWithCopyButton: React.FC<FieldWithCopyButtonProps> = ({
  value,
  label,
}) => {
  const handleCopyToClipboard = () => {
    if (value) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          toast.success(`"${value}" copied to clipboard!`);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    }
  };
  return (
    <div className="flex flex-col">
      {label && (
        <label className="pb-[6px] text-[12px] leading-[16px]">{label}</label>
      )}
      <div className="flex h-[32px] flex-row justify-between rounded-[8px] border-1 border-[#484848] bg-[#222222] px-[8px] py-[4px] text-[14px] leading-[24px]">
        {value}
        <button
          onClick={handleCopyToClipboard}
          className="clipboard-btn text-[#606060] hover:text-[#b4b4b4]"
        >
          <ClipboardCopy />
        </button>
      </div>

      <Tooltip
        place="bottom"
        anchorSelect=".clipboard-btn"
        content="Copy to clipboard"
      />
    </div>
  );
};

export default FieldWithCopyButton;
