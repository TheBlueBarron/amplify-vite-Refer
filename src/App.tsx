import { useState, FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createEmailSignup } from './graphql/mutations';
import './App.css'; // optional if you use Tailwind via CDN or PostCSS

const client = generateClient();

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await client.graphql({
        query: createEmailSignup,
        variables: {
          input: {
            email,
            createdAt: new Date().toISOString(),
          },
        },
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit email:', error);
      alert('There was an error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Refer App</h1>
      <p className="mb-6 text-gray-300">We’re launching soon. Join the waitlist below!</p>

      {submitted ? (
        <p className="text-green-400 text-lg">Thanks! You’re on the list. 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded text-white font-semibold ${
              loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Notify Me'}
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
