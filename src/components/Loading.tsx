export default ({ size }: { size: number }) => (
  <svg className={`h-${size} w-${size} animate-spin`} viewBox="0 0 100 100">
    <circle
      fill="none"
      stroke-width="10"
      className="stroke-current opacity-40"
      cx="50"
      cy="50"
      r="40"
    />
    <circle
      fill="none"
      stroke-width="10"
      className="stroke-current"
      stroke-dasharray="250"
      stroke-dashoffset="210"
      cx="50"
      cy="50"
      r="40"
    />
  </svg>
);
