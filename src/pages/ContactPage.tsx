import React from 'react';
import Layout from '../components/Layout';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-4">
          We'd love to hear from you! Please use the form below to get in touch with us, or reach out via the contact details provided.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            {/* Placeholder for a contact form */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
              </div>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
            <p className="text-lg mb-2">
              <strong>Email:</strong> support@aiieltsaceprep.com
            </p>
            <p className="text-lg mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg mb-2">
              <strong>Address:</strong> 123 IELTS Prep Lane, Suite 100, Exam City, PC 90210
            </p>
            <p className="text-lg">
              Our support team is available Monday to Friday, 9 AM - 5 PM (EST).
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
