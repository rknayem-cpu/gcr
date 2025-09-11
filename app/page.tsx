'use client';

import { useState } from 'react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const [father, setFather] = useState('');

  const [mother, setMother] = useState('');

  const [center, setCenter] = useState('');


  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!name || !course) {
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
        body: JSON.stringify({ name, course,father,mother,center }),
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
    <main style={{ padding: '2rem' }}>
      <h1>🎓 Generate Your Certificate</h1>

      <div style={{ margin: '1rem 0' }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ marginLeft: '1rem', padding: '8px', width: '300px' }}
          />
        </label>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <label>
          Course:
          <input
            type="text"
            value={course}
            onChange={e => setCourse(e.target.value)}
            style={{ marginLeft: '1rem', padding: '8px', width: '300px' }}
          />
        </label>
      </div>



<div style={{ margin: '1rem 0' }}>
        <label>
          father:
          <input
            type="text"
            value={father}
            onChange={e => setFather(e.target.value)}
            style={{ marginLeft: '1rem', padding: '8px', width: '300px' }}
          />
        </label>
      </div>

<div style={{ margin: '1rem 0' }}>
        <label>
          Mother:
          <input
            type="text"
            value={mother}
            onChange={e => setMother(e.target.value)}
            style={{ marginLeft: '1rem', padding: '8px', width: '300px' }}
          />
        </label>
      </div>


<div style={{ margin: '1rem 0' }}>
        <label>
          center:
          <input
            type="text"
            value={center}
            onChange={e => setCenter(e.target.value)}
            style={{ marginLeft: '1rem', padding: '8px', width: '300px' }}
          />
        </label>
      </div>


      <button
        onClick={handleDownload}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Download Certificate'}
      </button>
    </main>
  );
}
