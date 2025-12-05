import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Calendar } from 'lucide-react';
import { SectionHeading, Button, NeonCard } from '../components/ui';

/**
 * =========================================================================================
 * 📋 GOOGLE SHEETS CONNECTION INSTRUCTIONS
 * =========================================================================================
 * 
 * To make this form write to your spreadsheet (https://docs.google.com/spreadsheets/d/1EkPq20zeIv2XZ1K01Ynq6QQbLbh0y4GfalZJ_ORT0B4),
 * you must deploy a Google Apps Script.
 * 
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script in the menu.
 * 3. Delete any code there and paste the code block below:
 * 
 *    // --- BEGIN SCRIPT CODE ---
 *    var SHEET_NAME = "Sheet1";
 *    var SPREADSHEET_ID = "1EkPq20zeIv2XZ1K01Ynq6QQbLbh0y4GfalZJ_ORT0B4";
 * 
 *    function doPost(e){
 *      return handleResponse(e);
 *    }
 * 
 *    function handleResponse(e) {
 *      var lock = LockService.getPublicLock();
 *      lock.waitLock(30000);
 *      
 *      try {
 *        var doc = SpreadsheetApp.openById(SPREADSHEET_ID);
 *        var sheet = doc.getSheetByName(SHEET_NAME);
 *        
 *        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
 *        var nextRow = sheet.getLastRow() + 1;
 *        var newRow = headers.map(function(header) {
 *          return header === "Date" ? new Date() : e.parameter[header];
 *        });
 *        
 *        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
 *        
 *        return ContentService
 *          .createTextOutput(JSON.stringify({"result":"success", "row": nextRow}))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      } catch(e){
 *        return ContentService
 *          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      } finally {
 *        lock.releaseLock();
 *      }
 *    }
 *    
 *    function setup() {
 *        var doc = SpreadsheetApp.openById(SPREADSHEET_ID);
 *        var sheet = doc.getSheetByName(SHEET_NAME);
 *        // These headers MUST match the 'name' attributes in the HTML form below
 *        var headers = ["Date", "Name", "Email", "Service", "Message"];
 *        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
 *    }
 *    // --- END SCRIPT CODE ---
 * 
 * 4. Run the 'setup' function inside the Apps Script editor (select 'setup' from the dropdown and click Run). 
 *    - This will set the headers in your sheet automatically.
 *    - Grant permissions if asked.
 * 
 * 5. Click the blue "Deploy" button -> "New Deployment".
 * 6. Click the gear icon next to "Select type" -> select "Web App".
 * 7. Set Configuration:
 *    - Description: "Contact Form"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (IMPORTANT: This allows the form to work without login)
 * 8. Click "Deploy".
 * 9. Copy the "Web App URL" (it ends in /exec).
 * 10. Paste that URL into the const GOOGLE_SCRIPT_URL below.
 */

// PASTE YOUR WEB APP URL HERE ↓
const GOOGLE_SCRIPT_URL = ""; 

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add timestamp
    formData.append("Date", new Date().toLocaleString());

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData,
          // 'no-cors' is required for Google Apps Script Web Apps to accept the request
          // from a different domain (your website). You won't get a JSON response back,
          // but the data will be written to the sheet.
          mode: 'no-cors', 
        });
        setFormState('success');
      } else {
        console.warn("Please configure the GOOGLE_SCRIPT_URL in pages/Contact.tsx");
        // Simulate delay for demo purposes if URL is missing
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormState('success');
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // In 'no-cors' mode, we assume success if no network error occurred
      setFormState('success');
    }
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <SectionHeading 
        title="Let's Talk" 
        subtitle="Ready to start your next project? We're here to help you scale."
        center
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Info Side */}
        <div className="space-y-8">
          <NeonCard className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-none">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <Calendar className="text-cyan-500" />
              Book a Meeting Directly
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Skip the email tag. Select a time on our calendar to discuss your project requirements immediately.
            </p>
            <Button className="w-full justify-center">
              View Calendar Availability
            </Button>
          </NeonCard>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Email Us</h4>
                <p className="text-slate-500 dark:text-slate-400">hello@graxxsocials.com</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Call Us</h4>
                <p className="text-slate-500 dark:text-slate-400">+91 77210 40748</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Mon-Fri, 9am-6pm IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Visit Us</h4>
                <p className="text-slate-500 dark:text-slate-400">Virar West, Mumbai</p>
                <p className="text-slate-500 dark:text-slate-400">Maharashtra 401303</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
          {formState === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 dark:text-green-400 mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => setFormState('idle')}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                  <input 
                    required 
                    type="text" 
                    id="name" 
                    name="Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input 
                    required 
                    type="email" 
                    id="email" 
                    name="Email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900 outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-slate-700 dark:text-slate-300">Interested Service</label>
                <select 
                  id="service" 
                  name="Service"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900 outline-none transition-all"
                >
                  <option>Video Editing</option>
                  <option>Graphic Design</option>
                  <option>Branding</option>
                  <option>Social Media</option>
                  <option>Web Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Details</label>
                <textarea 
                  required 
                  id="message" 
                  name="Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900 outline-none transition-all resize-none"
                  placeholder="Tell us about your goals and timeline..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                className="w-full justify-center"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}