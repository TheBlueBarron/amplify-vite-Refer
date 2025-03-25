import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

async function testCreateUser() {
    const {data: user} = await client.models.User.create({
      userId: "exampleUserId",
      information: {
        name: "John Doe",
        age: 30,
        email: "johndoe@example.com",
        phone: "1234567890",
      },
    });
    console.log("User created:", user);

    const {data: service} = await client.models.Service.create({
        serviceId: "exampleServiceId",
        title: "Web Development",
        description: "I will build a website for you.",
        posterId: user?.userId ?? "",
      });
      console.log("Service created:", service);

      const lead = await client.models.Lead.create({
        leadId: "exampleLeadId",
        referrerId: user?.userId ?? "",
        serviceId: service?.serviceId ?? "",
        information: {
          name: "Jane Doe",
          age: 25,
          email: "janedoe@example.com",
          phone: "0987654321",
        },
        leadMessage: "I think this person would be interested in your service.",
        status: "Prospect",
      });
      console.log("Lead created:", lead);
  }
