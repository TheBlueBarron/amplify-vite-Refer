import { generateClient } from "@aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

// Generate the Amplify API client
const client = generateClient<Schema>();

// Function to create a new service
export async function createService(title: string, description: string) {
  try {
    const newService = await client.models.Service.create({
      title,
      description,
    });

    console.log("Service created:", newService);
    return newService;
  } catch (error) {
    console.error("Error creating service:", error);
    return null;
  }
}

// Function to delete a service
export async function deleteService(serviceId: string) {
  try {
    await client.models.Service.delete({ id: serviceId }); // ✅ Use `id` instead of `serviceId`
    console.log(`Service with ID ${serviceId} deleted.`);
    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    return false;
  }
}

// Function to fetch all services
export async function getAllServices() {
  try {
    const response = await client.models.Service.list();
    
    if (!response || !response.data) {
      console.error("Error: Unexpected response format", response);
      return [];
    }

    console.log("Fetched Services:", response.data);
    return response.data; // ✅ Extract the correct array of services
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Function to fetch a service by ID
export async function getServiceById(serviceId: string) {
  try {
    const service = await client.models.Service.get({ id: serviceId }); // ✅ Use `id`
    console.log("Service:", service);
    return service;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}