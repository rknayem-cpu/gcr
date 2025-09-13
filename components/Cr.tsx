// app/CertificateForm.tsx
'use client';

import { useState } from 'react';
import {
  FaDownload,
  FaCertificate,
  FaUser,
  FaBook,
  FaMale,
  FaFemale,
  FaBuilding,
} from 'react-icons/fa';

export default function CertificateForm() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [center, setCenter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!name || !course || !father || !mother || !center) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gcr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, course, father, mother, center }),
      });

      if (!res.ok) throw new Error('Failed to generate certificate');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Error generating certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-[rgb(0,0,0,0.1)] bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-800 text-center mb-8 flex items-center justify-center gap-3">
          <FaCertificate className="text-5xl" />
          Generate Your Certificate
        </h1>
        <img src="/cr.png" alt="" className="mx-auto mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All input fields — same as your version */}
          {[
            {
              label: 'Name',
              icon: <FaUser />,
              value: name,
              setValue: setName,
              placeholder: 'Enter your full name',
            },
            {
              label: 'Course',
              icon: <FaBook />,
              value: course,
              setValue: setCourse,
              placeholder: 'Enter the course name',
            },
            {
              label: "Father's Name",
              icon: <FaMale />,
              value: father,
              setValue: setFather,
              placeholder: "Enter your father's name",
            },
            {
              label: "Mother's Name",
              icon: <FaFemale />,
              value: mother,
              setValue: setMother,
              placeholder: "Enter your mother's name",
            },
            {
              label: 'Center',
              icon: <FaBuilding />,
              value: center,
              setValue: setCenter,
              placeholder: 'Enter the center name',
              colSpan: 'md:col-span-2',
            },
          ].map((field, i) => (
            <div
              className={`relative group ${field.colSpan || ''}`}
              key={i}
            >
              <label className="text-gray-700 font-semibold flex items-center gap-2 mb-2">
                {field.icon}
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 transform group-hover:shadow-lg"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`
              w-full md:w-auto px-8 py-4 text-white font-bold rounded-full text-lg shadow-lg
              bg-gradient-to-r from-purple-600 to-indigo-800
              hover:from-purple-700 hover:to-indigo-900
              transform transition-all duration-300
              ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105 active:scale-95'}
              flex items-center justify-center gap-3
            `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FaDownload />
                Download Certificate
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
