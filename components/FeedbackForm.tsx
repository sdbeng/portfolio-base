'use client';

import { useRef, useState } from 'react';

export default function FeedbackForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const feedback = formData.get('feedback');

    // Here you would typically send this data to your backend
    console.log({ name, email, feedback });

    // Clear the form
    formRef.current?.reset();

    // Show a success message
    setMessage('Thank you for your feedback!');
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Feedback</h2>
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-blue-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-blue-700">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
}