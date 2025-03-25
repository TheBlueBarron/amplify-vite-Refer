/*import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function Friends() {
  const { user } = useAuthenticator(); // Get the authenticated user
  const [friendId, setFriendId] = useState(""); // Input for adding a friend
  const [friends, setFriends] = useState<Array<Schema["Friend"]["type"]>>([]); // List of friends
  const [showFriends, setShowFriends] = useState(false); // Toggle for showing friends

  // Fetch friends when the component mounts or when the user changes
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await client.models.Friend.list({
          filter: { userId: { eq: user?.signInDetails?.loginId } }, // Filter by the authenticated user's ID
        });
        setFriends(data || []); // Set the friends list
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [user]);

  // Function to add a new friend
  async function addFriend() {
    if (!friendId.trim()) {
      alert("Friend ID cannot be empty!");
      return;
    }

    try {
      // Create two records: one for each direction of the friendship
      await client.models.Friend.create({
        userId: user?.signInDetails?.loginId,
        friendId,
      });
      await client.models.Friend.create({
        userId: friendId,
        friendId: user?.signInDetails?.loginId,
      });

      // Fetch friends again to update the list
      const { data } = await client.models.Friend.list({
        filter: { userId: { eq: user?.signInDetails?.loginId } },
      });
      setFriends(data || []);
      setFriendId(""); // Clear the input field
      alert("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Please try again.");
    }
  }

  return (
    <main>
      <h1>Friends</h1>
      
      <div>
        <h2>Add a Friend</h2>
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          placeholder="Enter Friend ID"
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div>
        <h2>Friend Count: {friends.length}</h2>
        <button onClick={() => setShowFriends(!showFriends)}>
          {showFriends ? "Hide Friends" : "Show Friends"}
        </button>
        {showFriends && (
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>{friend.friendId}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Friends;*/