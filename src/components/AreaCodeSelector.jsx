import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, MapPin, Phone } from "lucide-react";
import TerritoryRequestForm from "./TerritoryRequestForm";

export default function AreaCodeSelector({ state, areaCodes, onClose, onSuccess }) {
  const [selectedAreaCodes, setSelectedAreaCodes] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleAreaCodeToggle = (areaCode) => {
    setSelectedAreaCodes(prev => 
      prev.includes(areaCode) 
        ? prev.filter(ac => ac !== areaCode)
        : [...prev, areaCode]
    );
  };

  const handleRequestTerritory = () => {
    if (selectedAreaCodes.length > 0) {
      setShowRequestForm(true);
    }
  };

  const territoryString = selectedAreaCodes.length > 0 
    ? `${state.name} (Area Codes: ${selectedAreaCodes.join(', ')})`
    : `${state.name}`;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{state.name} Area Codes</CardTitle>
                <p className="text-gray-600 mt-1">Select the area codes you want to reserve</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Multiple Area Code Selection:</strong> You can select multiple area codes 
                within {state.name} for maximum coverage. Each area code gives you exclusive 
                rights to 844-PLUMBER in that region.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {areaCodes.map((areaCodeData, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={areaCodeData.area_code}
                      checked={selectedAreaCodes.includes(areaCodeData.area_code)}
                      onCheckedChange={() => handleAreaCodeToggle(areaCodeData.area_code)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <label 
                          htmlFor={areaCodeData.area_code}
                          className="text-lg font-semibold cursor-pointer"
                        >
                          {areaCodeData.area_code}
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">{areaCodeData.primary_city}</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedAreaCodes.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Selected Area Codes:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAreaCodes.map(ac => (
                    <span key={ac} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      {ac}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-green-700 mt-2">
                  You've selected {selectedAreaCodes.length} area code{selectedAreaCodes.length > 1 ? 's' : ''} in {state.name}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestTerritory}
                disabled={selectedAreaCodes.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Reserve Selected Area Codes ({selectedAreaCodes.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showRequestForm && (
        <TerritoryRequestForm
          territory={territoryString}
          onClose={() => setShowRequestForm(false)}
          onSuccess={() => {
            setShowRequestForm(false);
            onSuccess();
          }}
        />
      )}
    </>
  );
}