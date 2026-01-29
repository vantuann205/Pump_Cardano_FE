import React from 'react';

interface BondingCurveProps {
  progress: number;
  showLabel?: boolean;
}

const BondingCurve: React.FC<BondingCurveProps> = ({ progress, showLabel = true }) => {
  // Assuming 42,000 ADA is the graduation target based on CoinDetail info
  const amountInCurve = (42000 * (progress / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1.5 items-end">
            <span className="text-xs font-bold text-pump-text uppercase">Bonding Curve Progress</span>
            <span className="text-xs font-bold text-pump-text">{progress}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-gray-800 border border-gray-700 overflow-hidden relative">
        <div
          className="h-full rounded-full bg-pump-green transition-all duration-500 shadow-[0_0_10px_rgba(74,222,128,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
         <p className="mt-1.5 text-[11px] text-gray-400 font-medium">
            There are {amountInCurve} ₳ in the bonding curve
         </p>
      )}
    </div>
  );
};

export default BondingCurve;