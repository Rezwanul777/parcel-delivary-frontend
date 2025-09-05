import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate submission
    console.log("Form submitted:", formData);
    toast.success("Your inquiry has been submitted successfully! We will contact you very soon.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Have questions or need help with your parcel? Fill out the form below, and we’ll get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="py-5"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-5"
            />
          </div>

          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="py-5"
          />

          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={10}
            className="min-h-[200px]"

          />

          <div className="text-center">
            <Button type="submit" className="w-full sm:w-auto px-8 py-3">
              Submit 
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;