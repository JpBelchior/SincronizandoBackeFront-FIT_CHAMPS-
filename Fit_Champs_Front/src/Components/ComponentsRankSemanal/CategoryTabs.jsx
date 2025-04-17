import React from "react";

const CategoryTabs = ({
  categories,
  activeTab,
  setActiveTab,
  renderCategoryIcon,
}) => {
  return (
    <div className="flex flex-wrap justify-center mb-6 gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-2.5 px-5 rounded-xl flex items-center transition-all duration-300 ${
            activeTab === category
              ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-lg transform scale-105"
              : "bg-slate-800/50 text-white hover:bg-slate-700/50 hover:scale-105"
          } border ${
            activeTab === category
              ? "border-blue-500/50"
              : "border-slate-700/30"
          }`}
          onClick={() => setActiveTab(category)}
        >
          <div className="bg-indigo-900/50 p-1 rounded-lg mr-2">
            {renderCategoryIcon(category)}
          </div>
          <span className="font-medium">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
