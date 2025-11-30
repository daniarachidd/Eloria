import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
const FilterCard = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="pt-2 border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold text-gray-800 mb-3 uppercase">{title}</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                </div>
                {isOpen && (
                    <div className="mt-2">
                        {children}
                    </div>
                )}
                
                
                </div>
    );
} 
export default FilterCard;