
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TerritoryRequestForm from "@/components/TerritoryRequestForm";
import {
  Phone,
  Briefcase } from
"lucide-react";

export default function About() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const notableClients = [
  { name: "State Farm", number: "800-STATE-FARM" },
  { name: "Nationwide", number: "877-NATIONWIDE" },
  { name: "The General", number: "800-GENERAL" },
  { name: "Integrity Insurance", number: "800-INTEGRITY" },
  { name: "Guardian Insurance", number: "800-GUARDIAN" },
  { name: "5500+ More Businesses", number: "" }];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              A <span className="text-blue-600">Legacy</span> of Memorable Numbers
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              With over 45 years of combined experience, our family-run business has been connecting companies with powerful vanity numbers that build brands and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Over 20 Years of Vanity Number Expertise
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="">844-PLUMBER is a family-run business founded on a simple principle: a great phone number is a powerful business tool. Partners Zachary Fontaine and Jim McCluskey have been at the forefront of the vanity number industry for the past 20 years.

              </p>
              <p>
                Our passion is helping businesses of all sizes, from local service providers to national corporations, establish a strong brand presence and connect more effectively with their customers. We understand the value of a memorable, industry-specific number, and our track record speaks for itself.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notable Clients Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We've helped over 5,500 companies, including some of the most recognized brands in the country, secure their signature vanity numbers.

            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notableClients.map((client, index) =>
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                  {client.number && <p className="text-gray-600 leading-relaxed font-mono mt-2">{client.number}</p>}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl">
            <CardContent className="p-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Have Questions? Contact Us Directly.</h2>
              <p className="text-blue-100 text-lg mb-8">We believe in direct communication. If you have questions, please don't hesitate to reach out.</p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-200">Jim McCluskey's Cell</h3>
                  <a href="tel:904-865-7149" className="text-2xl font-bold text-white flex items-center gap-2 mt-1 hover:text-yellow-300">
                    <Phone />
                    904-865-7149
                  </a>
                </div>
                <div className="w-px h-12 bg-blue-400 hidden md:block"></div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-200">Office Line</h3>
                  <a href="tel:858-858-2255" className="text-2xl font-bold text-white flex items-center gap-2 mt-1 hover:text-yellow-300">
                    <Phone />
                    858-858-CALL
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Territory Request Form Modal */}
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
