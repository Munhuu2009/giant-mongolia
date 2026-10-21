type LoadingSpinnerProps = {
  label?: string;
};

export default function LoadingSpinner({ label = "Loading" }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="h-24 w-24 animate-spin"
        fill="none"
      >
        <circle cx="50" cy="50" r="42" stroke="rgb(255 255 255 / 0.25)" strokeWidth="3" />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="#000099"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="68 196"
          className="drop-shadow-[0_0_8px_#000099]"
        />
        <circle cx="50" cy="50" r="30" stroke="rgb(255 255 255 / 0.5)" strokeWidth="1.5" />
        <g stroke="rgb(255 255 255 / 0.65)" strokeWidth="1.5">
          <path d="M50 20v60M20 50h60M28.8 28.8l42.4 42.4M71.2 28.8 28.8 71.2" />
          <path d="m38.5 22.2 23 55.6M22.2 61.5l55.6-23M61.5 22.2l-23 55.6M77.8 61.5l-55.6-23" />
        </g>
        <circle cx="50" cy="50" r="8" fill="#000099" />
        <circle cx="50" cy="50" r="3" fill="white" />
      </svg>
      <span
        aria-hidden="true"
        className="mt-5 animate-pulse text-xl font-black italic tracking-[0.18em] text-[#000099]"
      >
        GIANT
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
