import React from 'react';
import { SortOption } from '../types';

interface FilterBarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center text-sm">
      <div className="flex bg-pump-card rounded border border-gray-800 p-1">
        <button className="px-4 py-1 bg-gray-700 text-white rounded shadow text-xs font-bold">Following</button>
        <button className="px-4 py-1 text-gray-400 hover:text-white text-xs font-bold">Terminal</button>
      </div>

      <div className="flex gap-4 sm:ml-auto">
        <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-blue-500" />
            <span className="text-gray-400">Animations</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-blue-500" defaultChecked />
            <span className="text-gray-400">Include NSFW</span>
        </label>
      </div>
      
      <select 
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-pump-card border border-gray-800 text-white text-xs rounded p-2 outline-none w-full sm:w-auto focus:border-blue-500"
      >
        <option value="featured">Sort: Featured</option>
        <option value="marketCap">Sort: Market Cap</option>
        <option value="lastReply">Sort: Last Reply</option>
        <option value="creationTime">Sort: Creation Time</option>
      </select>
    </div>
  );
};

export default FilterBar;