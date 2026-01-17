
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { Lead } from "@/entities/Lead";
import { SendEmail } from "@/integrations/Core"; // Added import for SendEmail

export default function LeadCaptureForm({ source = "general" }) {
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    phone: "",
    email: "",
    desired_territory: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData = { // Extracted leadData for reusability
        ...formData,
        source_page: source
      };
      await Lead.create(leadData);

      // Send email after successful lead creation
      await SendEmail({
        to: "jimmymccluskey@gmail.com",
        subject: `New Lead from 844-PLUMBER Website (${source})`,
        body: `
          <h3>A new lead has been submitted:</h3>
          <ul>
            <li><strong>Full Name:</strong> ${leadData.full_name}</li>
            <li><strong>Company Name:</strong> ${leadData.company_name || 'N/A'}</li>
            <li><strong>Phone:</strong> ${leadData.phone}</li>
            <li><strong>Email:</strong> ${leadData.email}</li>
            <li><strong>Desired Territory:</strong> ${leadData.desired_territory || 'N/A'}</li>
            <li><strong>Message:</strong> ${leadData.message || 'N/A'}</li>
            <li><strong>Source:</strong> ${leadData.source_page}</li>
          </ul>
        `
      });
      
      setIsSuccess(true);
      setFormData({
        full_name: "",
        company_name: "",
        phone: "",
        email: "",
        desired_territory: "",
        message: ""
      });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Optionally, add a state for error message to display to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your request has been submitted. Our team will contact you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Label htmlFor="desired_territory">Desired Territory</Label>
        <Input
          id="desired_territory"
          value={formData.desired_territory}
          onChange={(e) => handleInputChange("desired_territory", e.target.value)}
          placeholder="City, State or Market Area"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Tell us about your plumbing business..."
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
      >
        {isSubmitting ? "Submitting..." : "Request Your Territory"}
      </Button>
    </form>
  );
}
