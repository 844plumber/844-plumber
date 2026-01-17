import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We believe in direct communication. We're here to help you secure your exclusive territory and start growing your plumbing business with 844-PLUMBER.

            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Jim's Cell */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jim McCluskey's Cell</h3>
                <p className="text-gray-600 mb-4">Direct line for immediate assistance</p>
                <a
                  href="tel:904-865-7149"
                  className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">

                  904-865-7149
                </a>
              </CardContent>
            </Card>

            {/* Office Line */}
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Line</h3>
                <p className="text-gray-600 mb-4">Main business number</p>
                <a
                  href="tel:858-858-2255"
                  className="text-2xl font-bold text-green-600 hover:text-green-800 transition-colors">

                  858-858-CALL
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>);

}