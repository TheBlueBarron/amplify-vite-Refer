/*import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react'; // Import useAuthenticator


const client = generateClient<Schema>();


function RespondToReferral({ referralId }: { referralId: string }) {
  const { user } = useAuthenticator(); // Get the authenticated user
  const [leadDetails, setLeadDetails] = useState("");

  async function createLead() {
    try{
      client.models.Lead.create({ referralId, leadDetails, responderId: user?.signInDetails?.loginId });
    } catch (error) {
      alert("Error creating lead:");
    }
  }

  return (
    <div>
      <h2>Respond to Referral</h2>
      <textarea value={leadDetails} onChange={(e) => setLeadDetails(e.target.value)} placeholder="Lead Details"></textarea>
      <button onClick={createLead}>Submit Lead</button>
    </div>
  );
}

export default RespondToReferral;*/