
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Users, TrendingUp, Star, ArrowRight, CheckCircle } from "lucide-react";
import { AreaCode } from "@/entities/AreaCode";
import LeadCaptureForm from "../components/LeadCaptureForm";
import TerritoryRequestForm from "../components/TerritoryRequestForm";
import AreaCodeSelector from "../components/AreaCodeSelector"; // New import

export default function Home() {
  const [areaCodes, setAreaCodes] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedState, setSelectedState] = useState(null); // New state
  const [showStateAreaCodes, setShowStateAreaCodes] = useState(false); // New state

  useEffect(() => {
    loadAreaCodes();
  }, []);

  const loadAreaCodes = async () => {
    const data = await AreaCode.list();
    setAreaCodes(data);
  };

  const benefits = [
  {
    icon: Phone,
    title: "Memorable Number",
    description: "Customers instantly remember 844-PLUMBER. No more lost calls to forgettable numbers."
  },
  {
    icon: MapPin,
    title: "Exclusive Territory",
    description: "Lock in your local market before competitors do. One business per territory."
  },
  {
    icon: TrendingUp,
    title: "Increase Call Volume",
    description: "Our partners report 40-70% increase in inbound calls within 6 months."
  },
  {
    icon: Users,
    title: "National Brand Recognition",
    description: "Leverage the power of a national brand while keeping your local business identity."
  }];


  const usStates = [// New array
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'];


  const handleStateSelect = (stateName) => {// New function
    setSelectedState(stateName);
    setShowStateAreaCodes(true);
  };

  const getUniqueAreaCodesForState = (stateName) => {
    const stateAreaCodes = areaCodes.filter((ac) => ac.state === stateName);
    const uniqueAreaCodes = [];
    const seenAreaCodes = new Set();

    for (const areaCode of stateAreaCodes) {
      if (!seenAreaCodes.has(areaCode.area_code)) {
        uniqueAreaCodes.push(areaCode);
        seenAreaCodes.add(areaCode.area_code);
      }
    }

    return uniqueAreaCodes;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dark gradient background for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Simple pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                {/* High contrast white text on dark background */}
                <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-white">
                  Own Your Market with
                  <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text whitespace-nowrap">
                    844-PLUMBER
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed font-medium">A powerful, unforgettable toll-free number you can license exclusively for your business
                </p>
              </div>

              <div className="space-y-6">
                {[
                "Increase inbound calls with a number customers remember",
                "Lock in your territory before your competitors do",
                "Shared-use system — you own your market exclusively"].
                map((benefit, index) =>
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <CheckCircle className="w-7 h-7 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-lg text-white font-medium">{benefit}</p>
                    </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-xl px-10 py-8 shadow-2xl transform hover:scale-105 transition-all duration-300">

                  <Link to={createPageUrl("Availability")}>
                    View Available Territories
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowRequestForm(true)} className="bg-background text-slate-950 px-10 py-8 text-xl font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md border-2 border-white hover:bg-white hover:text-gray-900 shadow-xl transform hover:scale-105 transition-all duration-300">
                  Request Your Market
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Enhanced stats card with better contrast */}
              <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-yellow-400">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Phone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Getting More Calls Today</h3>
                  <p className="text-gray-600 font-medium">The smart way for plumbing businesses to grow with exclusive territorial rights to one of the best numbers</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="text-4xl font-black text-blue-600 mb-2">72%</div> {/* Updated stat */}
                    <div className="text-sm font-semibold text-gray-700">Recall Rate</div> {/* Updated stat */}
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-4xl font-black text-green-600 mb-2">85%</div>
                    <div className="text-sm font-semibold text-gray-700">Call Increase</div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) =>
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <span className="font-semibold">4.9/5 Partner Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Why Choose 844-PLUMBER?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">Elevate your business with one of the industry's most brandable vanity numbers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) =>
            <Card key={index} className="text-center border-0 shadow-xl hover:shadow-2xl smooth-transition transform hover:-translate-y-2 bg-white">
                <CardContent className="p-8">
                  <div className="w-18 h-18 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <benefit.icon className="w-9 h-9 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{benefit.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Find Your Territory Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Find Your Territory
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Select your state to view available area codes and reserve your exclusive territory
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {usStates.map((state) =>
                  <button
                    key={state}
                    onClick={() => handleStateSelect(state)}
                    className="p-4 text-left bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 transform hover:scale-105 hover:shadow-md">

                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{state}</span>
                      </div>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-lg px-8 py-6 shadow-xl">
              <Link to={createPageUrl("Availability")}>
                View Full Availability
                <MapPin className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
                Ready to Dominate Your Market?
              </h2>
              <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">Don't let your competitors have the advantage. Reserve your territory now and start growing your plumbing business with one of the most memorable numbers in the industry.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                  <span className="text-gray-800 font-semibold">No hidden costs</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-7 h-7 text-blue-600" />
                  <span className="text-gray-800 font-semibold">Exclusive territorial rights</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <CheckCircle className="w-7 h-7 text-purple-600" />
                  <span className="text-gray-800 font-semibold">Marketing support included</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="shadow-2xl border-2 border-yellow-400 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Reserve Your Territory
                  </h3>
                  <LeadCaptureForm source="homepage" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* State Area Codes Modal */}
      {showStateAreaCodes && selectedState &&
      <AreaCodeSelector
        state={{ name: selectedState, abbr: selectedState.substring(0, 2).toUpperCase() }}
        areaCodes={getUniqueAreaCodesForState(selectedState)}
        onClose={() => setShowStateAreaCodes(false)}
        onSuccess={() => {
          setShowStateAreaCodes(false);
          setSelectedState(null);
        }} />

      }

      {showRequestForm &&
      <TerritoryRequestForm
        territory="General Inquiry"
        onClose={() => setShowRequestForm(false)}
        onSuccess={() => {
          setShowRequestForm(false);
        }} />

      }
    </div>);
}