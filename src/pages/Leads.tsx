import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function Leads() {
  const [leads, setLeads] = useState<Array<Schema["Lead"]["type"]>>([]);

  function deleteLead(id: string) {
    client.models.Lead.delete({ id });
  }
  useEffect(() => {
    const subscription = client.models.Lead.observeQuery().subscribe({
      next: (data) => setLeads([...data.items]),
      error: (error) => console.error("Error fetching leads:", error),
    });
    return () => {
      // Cleanup subscription on unmount
      subscription.unsubscribe();
    };
  }, []);

  return (
    <main>
      <h1>Leads</h1>
      {leads.length === 0 ? (
        <p>No leads available.</p>
      ) : (
      <ul className = "Leads">
        {leads.map((lead) => (
          <li className = "lead" onClick={()=>deleteLead(lead.id)} key={lead.id}>
            (Name: {lead.leadName})(Email: {lead.leadEmail})(Phone: {lead.leadPhone})(Message: {lead.leadMessage})(Status: {lead.status})
          </li>
        ))}
      </ul>
      )}
    </main>
  );
}

export default Leads;