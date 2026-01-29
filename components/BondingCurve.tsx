import React from 'react';

interface BondingCurveProps {
  progress: number;
  showLabel?: boolean;
}

const BondingCurve: React.FC<BondingCurveProps> = ({ progress, showLabel = true }) => {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs text-gray-400">
            <span>hydra curve progress: {progress}%</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
         <p className="mt-1 text-[10px] text-gray-500">
            graduate to minswap at 100%
         </p>
      )}
    </div>
  );
};

export default BondingCurve;