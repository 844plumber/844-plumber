
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, Search, ArrowLeft } from "lucide-react";
import { AreaCode } from "@/entities/AreaCode";
import TerritoryRequestForm from "../components/TerritoryRequestForm";

export default function Availability() {
  const [areaCodes, setAreaCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAreaCodes, setSelectedAreaCodes] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    loadAreaCodes();
  }, []);

  const loadAreaCodes = async () => {
    const data = await AreaCode.list();
    setAreaCodes(data);
  };

  // Group area codes by state and remove duplicates
  const areaCodesByState = areaCodes.reduce((acc, areaCode) => {
    const state = areaCode.state;
    if (!acc[state]) {
      acc[state] = [];
    }
    // Check if this area code already exists for this state
    const exists = acc[state].some(ac => ac.area_code === areaCode.area_code);
    if (!exists) {
      acc[state].push(areaCode);
    }
    return acc;
  }, {});

  // Filter states and area codes based on search term
  const filteredStates = Object.keys(areaCodesByState)
    .filter(state => {
      if (searchTerm) {
        return (
          state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          areaCodesByState[state].some(ac => 
            ac.area_code.includes(searchTerm) ||
            ac.primary_city?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      return true; // If no search term, show all states
    })
    .sort();

  const handleAreaCodeSelect = (areaCode) => {
    setSelectedAreaCodes(prev => 
      prev.includes(areaCode) 
        ? prev.filter(ac => ac !== areaCode)
        : [...prev, areaCode]
    );
  };

  const handleRequestSelected = () => {
    if (selectedAreaCodes.length > 0) {
      setShowRequestForm(true);
    }
  };

  const territoryString = selectedAreaCodes.length > 0 
    ? `Selected Area Codes: ${selectedAreaCodes.join(', ')}`
    : "General Inquiry";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" asChild className="text-white hover:bg-white/20">
              <Link to={createPageUrl("Home")}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Available Area Codes
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Browse all available area codes across the United States. Select multiple 
              area codes to maximize your territory coverage.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by state, area code, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Area Codes Bar */}
      {selectedAreaCodes.length > 0 && (
        <div className="bg-green-50 border-b border-green-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-green-800">
                  Selected: {selectedAreaCodes.length} area code{selectedAreaCodes.length > 1 ? 's' : ''}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedAreaCodes.slice(0, 5).map(ac => (
                    <span key={ac} className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
                      {ac}
                    </span>
                  ))}
                  {selectedAreaCodes.length > 5 && (
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
                      +{selectedAreaCodes.length - 5} more
                    </span>
                  )}
                </div>
              </div>
              <Button onClick={handleRequestSelected} className="bg-green-600 hover:bg-green-700">
                Request Selected Area Codes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Area Codes List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredStates.map(state => {
              // Filter area codes within this state based on the search term
              const stateAreaCodes = areaCodesByState[state].filter(ac => 
                !searchTerm || 
                ac.area_code.includes(searchTerm) ||
                ac.primary_city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                state.toLowerCase().includes(searchTerm.toLowerCase()) // Include state name in search for its children
              );

              // If no area codes match the search term in this state, don't render the state card
              if (stateAreaCodes.length === 0) return null;

              return (
                <Card key={state} className="shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold">{state}</span>
                      <span className="text-sm font-normal text-gray-500 ml-auto">
                        {stateAreaCodes.length} area codes available
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {stateAreaCodes.map((areaCode, index) => (
                        <div 
                          key={`${state}-${areaCode.area_code}-${index}`} // More robust key
                          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            selectedAreaCodes.includes(areaCode.area_code)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                          }`}
                          onClick={() => handleAreaCodeSelect(areaCode.area_code)}
                        >
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <div className="flex-1">
                              <div className="text-lg font-semibold text-gray-900">
                                {areaCode.area_code}
                              </div>
                              <p className="text-sm text-gray-600">{areaCode.primary_city}</p>
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
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Secure Your Territory?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Select the area codes that matter most to your business and start dominating 
            your local market with 1-844-PLUMBER.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to={createPageUrl("Contact")}>
                Get Started Today
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to={createPageUrl("HowItWorks")}>
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {showRequestForm && (
        <TerritoryRequestForm
          territory={territoryString}
          onClose={() => setShowRequestForm(false)}
          onSuccess={() => {
            setShowRequestForm(false);
            setSelectedAreaCodes([]);
          }}
        />
      )}
    </div>
  );
}
