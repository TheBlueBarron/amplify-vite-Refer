/*import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

// Generate Amplify API client
const client = generateClient<Schema>();

  const currentUserId = "user123"; // 🔹 Replace with real authenticated user ID
  
  // 🔹 Add a friend by searching for their email
  async function addFriend(friendId: string, userId: string, searchEmail: string) {
    if (!searchEmail) return;

    const friend = users.find((user) => user.email === searchEmail);
    if (!friend) {
      alert("User not found!");
      return;
    }

    const newFriend = await client.models.Friend.create({
      friendId,
      userId,
    });

    setFriends((prev) => [...prev, friend.id]);
    setSearchEmail("");
    fetchFriends(); // Refresh friends list
  };

  const fetchUsers = async () => {
    const response = await client.models.User.list();
    setUsers(response.data || []);
  };

  // 🔹 Fetch user's friends
  const fetchFriends = async () => {
    const response = await client.models.Friend.list({
      filter: { id: { eq: currentUserId } }, // ✅ Use `userId` directly
    });
  
    if (response.data) {
      const friendIds = response.data.map((f: any) => f.friendId); // ✅ Extract friendId
      setFriends(friendIds);
    }
  };

  // 🔹 Fetch services of the selected friend
  const fetchFriendServices = async (friendId: string) => {
    setSelectedFriend(friendId);

    const response = await client.models.Service.list({
      filter: { owner: { eq: friendId } },
    });

    setFriendServices(response.data || []);
  };*/