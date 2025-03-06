import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicineSchedule = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');

  const handleSchedule = () => {
    if (!medicineName || !dosage || !time || !email) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Schedule the email using setTimeout
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    const delay = scheduledTime - now;

    if (delay < 0) {
      toast.error('Please select a future time.');
      return;
    }

    setTimeout(() => {
      const templateParams = {
        to_name: email, // Use the user's email as the recipient
        medicine_name: medicineName,
        dosage,
        time,
      };

      emailjs
        .send(
          'service_gj158ss', // Replace with your EmailJS service ID
          'template_plj7h87', // Replace with your EmailJS template ID
          templateParams,
          'SG4LSlMOGht6LE1f4' // Replace with your EmailJS user ID
        )
        .then((response) => {
          console.log('Email sent successfully!', response);
          toast.success('Reminder email sent!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          toast.error('Failed to send reminder email.');
        });
    }, delay);
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Medicine Schedule</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your medicine details to set a reminder.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSchedule}
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Schedule Medicine
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MedicineSchedule;