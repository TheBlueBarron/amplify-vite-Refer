import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function MarkLeadAsServiced({ leadId }: { leadId: string }) {
  function markAsServiced() {
    client.models.Lead.update({ id: leadId, status: "accepted" });
  }

  return (
    <button onClick={markAsServiced}>Mark as Serviced</button>
  );
}

export default MarkLeadAsServiced;