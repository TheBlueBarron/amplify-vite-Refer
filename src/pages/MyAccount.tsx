import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

function MyAccount() {
  const { user, signOut } = useAuthenticator();

  async function deleteAccount() {
    if (!user?.signInDetails?.loginId) {
      alert("User not authenticated!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      // Delete the user account
      await client.models.User.delete({ id: user.signInDetails.loginId });
      alert("Account deleted successfully.");
      signOut(); // Sign out the user after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  }

  return (
    <main>
      <h1>My Account</h1>
      <button>edit account</button>
      <button onClick={deleteAccount} style={{ color: "red" }}>
        Delete Account
      </button>
    </main>
  );
}

export default MyAccount;