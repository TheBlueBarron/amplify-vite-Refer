import { useState, FormEvent } from "react";
import { generateClient } from "aws-amplify/api";
import { createEmailSignup } from "../graphql/mutations";

const client = generateClient();

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    } catch (err) {
      alert("Failed to submit. Try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Refer App</h1>
      <p className="mb-6 text-gray-300">Launching soon. Join the waitlist.</p>

      {submitted ? (
        <p className="text-green-400">Thanks! You’re on the list. 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="p-3 rounded text-black"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded text-white font-semibold"
          >
            Notify Me
          </button>
        </form>
      )}
    </div>
  );
}
