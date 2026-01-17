
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AreaCodeSelector from "./AreaCodeSelector";

export default function InteractiveMap({ areaCodes = [] }) {
  const [selectedState, setSelectedState] = useState(null);
  const [showAreaCodes, setShowAreaCodes] = useState(false);

  const handleStateClick = (stateName, stateAbbr) => {
    setSelectedState({ name: stateName, abbr: stateAbbr });
    setShowAreaCodes(true);
  };

  const states = [
    // Main Map States (adjusted for percentage-based positioning)
    { name: 'Washington', abbr: 'WA', pos: { top: '8%', left: '8%', width: '8%', height: '12%' } }, // Adjusted from example
    { name: 'Oregon', abbr: 'OR', pos: { top: '18%', left: '7%', width: '6%', height: '10%' } },
    { name: 'California', abbr: 'CA', pos: { top: '35%', left: '2%', width: '8%', height: '20%' } }, // Adjusted from example
    { name: 'Idaho', abbr: 'ID', pos: { top: '12%', left: '14%', width: '6%', height: '15%' } },
    { name: 'Nevada', abbr: 'NV', pos: { top: '25%', left: '10%', width: '6%', height: '15%' } },
    { name: 'Utah', abbr: 'UT', pos: { top: '26%', left: '19%', width: '6%', height: '15%' } },
    { name: 'Arizona', abbr: 'AZ', pos: { top: '42%', left: '17%', width: '6%', height: '15%' } },
    { name: 'Montana', abbr: 'MT', pos: { top: '8%', left: '20%', width: '8%', height: '10%' } },
    { name: 'Wyoming', abbr: 'WY', pos: { top: '18%', left: '23%', width: '6%', height: '10%' } },
    { name: 'Colorado', abbr: 'CO', pos: { top: '28%', left: '25%', width: '6%', height: '12%' } },
    { name: 'New Mexico', abbr: 'NM', pos: { top: '40%', left: '25%', width: '6%', height: '15%' } },
    { name: 'North Dakota', abbr: 'ND', pos: { top: '8%', left: '29%', width: '8%', height: '8%' } },
    { name: 'South Dakota', abbr: 'SD', pos: { top: '18%', left: '30%', width: '8%', height: '8%' } },
    { name: 'Nebraska', abbr: 'NE', pos: { top: '26%', left: '31%', width: '8%', height: '10%' } },
    { name: 'Kansas', abbr: 'KS', pos: { top: '35%', left: '32%', width: '6%', height: '10%' } },
    { name: 'Oklahoma', abbr: 'OK', pos: { top: '45%', left: '33%', width: '6%', height: '10%' } },
    { name: 'Texas', abbr: 'TX', pos: { top: '55%', left: '32%', width: '12%', height: '15%' } }, // Adjusted from example
    { name: 'Minnesota', abbr: 'MN', pos: { top: '8%', left: '38%', width: '8%', height: '15%' } },
    { name: 'Iowa', abbr: 'IA', pos: { top: '25%', left: '39%', width: '6%', height: '10%' } },
    { name: 'Missouri', abbr: 'MO', pos: { top: '35%', left: '40%', width: '6%', height: '10%' } },
    { name: 'Arkansas', abbr: 'AR', pos: { top: '45%', left: '42%', width: '6%', height: '10%' } },
    { name: 'Louisiana', abbr: 'LA', pos: { top: '57%', left: '43%', width: '6%', height: '10%' } },
    { name: 'Wisconsin', abbr: 'WI', pos: { top: '18%', left: '45%', width: '6%', height: '12%' } },
    { name: 'Illinois', abbr: 'IL', pos: { top: '30%', left: '47%', width: '6%', height: '12%' } }, // Adjusted from example
    { name: 'Michigan', abbr: 'MI', pos: { top: '18%', left: '50%', width: '8%', height: '12%' } },
    { name: 'Indiana', abbr: 'IN', pos: { top: '32%', left: '50%', width: '4%', height: '10%' } },
    { name: 'Kentucky', abbr: 'KY', pos: { top: '38%', left: '51%', width: '6%', height: '10%' } },
    { name: 'Tennessee', abbr: 'TN', pos: { top: '45%', left: '50%', width: '6%', height: '10%' } },
    { name: 'Mississippi', abbr: 'MS', pos: { top: '52%', left: '47%', width: '6%', height: '10%' } },
    { name: 'Alabama', abbr: 'AL', pos: { top: '52%', left: '51%', width: '5%', height: '10%' } },
    { name: 'Georgia', abbr: 'GA', pos: { top: '52%', left: '55%', width: '6%', height: '10%' } },
    { name: 'Florida', abbr: 'FL', pos: { top: '65%', left: '58%', width: '10%', height: '8%' } }, // Adjusted from example
    { name: 'Ohio', abbr: 'OH', pos: { top: '30%', left: '54%', width: '6%', height: '10%' } },
    { name: 'West Virginia', abbr: 'WV', pos: { top: '35%', left: '57%', width: '4%', height: '8%' } },
    { name: 'Virginia', abbr: 'VA', pos: { top: '38%', left: '60%', width: '5%', height: '8%' } },
    { name: 'North Carolina', abbr: 'NC', pos: { top: '45%', left: '59%', width: '6%', height: '10%' } },
    { name: 'South Carolina', abbr: 'SC', pos: { top: '50%', left: '58%', width: '5%', height: '8%' } },
    { name: 'Pennsylvania', abbr: 'PA', pos: { top: '28%', left: '60%', width: '6%', height: '10%' } },
    { name: 'New York', abbr: 'NY', pos: { top: '23%', left: '63%', width: '8%', height: '10%' } }, // Adjusted from example
    { name: 'Maine', abbr: 'ME', pos: { top: '10%', left: '68%', width: '6%', height: '8%' } },
    { name: 'New Hampshire', abbr: 'NH', pos: { top: '15%', left: '66%', width: '3%', height: '5%' } },
    { name: 'Vermont', abbr: 'VT', pos: { top: '15%', left: '64%', width: '3%', height: '5%' } },
    { name: 'Massachusetts', abbr: 'MA', pos: { top: '20%', left: '67%', width: '3%', height: '5%' } },
    { name: 'Connecticut', abbr: 'CT', pos: { top: '23%', left: '66%', width: '2%', height: '4%' } },
    { name: 'Rhode Island', abbr: 'RI', pos: { top: '24%', left: '68%', width: '2%', height: '3%' } },
    { name: 'New Jersey', abbr: 'NJ', pos: { top: '28%', left: '63%', width: '2%', height: '5%' } },
    { name: 'Delaware', abbr: 'DE', pos: { top: '30%', left: '62%', width: '1.5%', height: '3%' } },
    { name: 'Maryland', abbr: 'MD', pos: { top: '32%', left: '61%', width: '3%', height: '5%' } },
    { name: 'District of Columbia', abbr: 'DC', pos: { top: '34%', left: '61.5%', width: '0.8%', height: '1.5%' } },
    { name: 'Alaska', abbr: 'AK', pos: { top: '75%', left: '10%', width: '8%', height: '12%' } },
    { name: 'Hawaii', abbr: 'HI', pos: { top: '80%', left: '20%', width: '5%', height: '5%' } }
  ];

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
            {/* US Map with clickable states */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c5fcc8f03f9142ba7d79ba/f48395927_USMapExample.png"
                alt="US Map"
                className="w-full h-auto"
              />
              
              {/* Clickable overlay divs positioned absolutely for better state selection */}
              <div className="absolute inset-0">
                {states.map(state => (
                  <div
                    key={state.abbr}
                    className="absolute cursor-pointer pointer-events-auto hover:bg-yellow-400 hover:bg-opacity-40 transition-all duration-200 rounded-md"
                    style={state.pos}
                    onClick={() => handleStateClick(state.name, state.abbr)}
                    title={`${state.name} - Click to view area codes`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-lg text-gray-600 font-medium">
          Click on any state to view available area codes in that region
        </p>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span className="text-sm font-medium text-green-800">All Area Codes Available</span>
          </div>
        </div>
      </div>

      {/* Area Code Selection Modal */}
      {showAreaCodes && selectedState && (
        <AreaCodeSelector
          state={selectedState}
          areaCodes={areaCodes.filter(ac => ac.state === selectedState.name)}
          onClose={() => setShowAreaCodes(false)}
          onSuccess={() => {
            setShowAreaCodes(false);
            setSelectedState(null);
          }}
        />
      )}
    </div>
  );
}
