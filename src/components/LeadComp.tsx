import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function LeadComp() {
  const [leads, setLeads] = useState<Array<Schema["Lead"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Lead.observeQuery().subscribe({
      next: (data) => setLeads([...data.items]),
      error: (error) => console.error("Error fetching leads:", error),
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <main>
      {leads.length === 0 ? (
        <p>No leads available.</p>
      ) : (
        <p>Leads available: {leads.length}</p>
      )}
    </main>
  );
}

export default LeadComp;