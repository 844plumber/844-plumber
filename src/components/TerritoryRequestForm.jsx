
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, MapPin, CheckCircle } from "lucide-react";
import { Lead } from "@/entities/Lead";
import { SendEmail } from "@/integrations/Core";

export default function TerritoryRequestForm({ territory, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData = {
        ...formData,
        desired_territory: territory,
        source_page: "map_interaction"
      };
      await Lead.create(leadData);

      await SendEmail({
        to: "jimmymccluskey@gmail.com",
        subject: `New Territory Request from 844-PLUMBER Website`,
        body: `
          <h3>A new territory request has been submitted:</h3>
          <ul>
            <li><strong>Requested Territory:</strong> ${leadData.desired_territory}</li>
            <li><strong>Full Name:</strong> ${leadData.full_name}</li>
            <li><strong>Company Name:</strong> ${leadData.company_name || 'N/A'}</li>
            <li><strong>Phone:</strong> ${leadData.phone}</li>
            <li><strong>Email:</strong> ${leadData.email}</li>
            <li><strong>Message:</strong> ${leadData.message || 'N/A'}</li>
          </ul>
        `
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error("Error submitting lead or sending email:", error);
      // Optionally handle error display to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your request has been submitted. Our team will contact you within one business day 
              to confirm your territory reservation.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Reserve Your Territory</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{territory}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Exclusive Territory Rights:</strong> Once approved, you'll have exclusive 
              rights to use 844-PLUMBER in your market area. No other plumbing business 
              in your territory can use this number.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange("company_name", e.target.value)}
                  placeholder="Your plumbing company"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Tell us about your plumbing business and why you're interested in this territory..."
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Request This Territory"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
