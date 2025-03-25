import React, { useEffect, useState } from "react";
import { createService, deleteService, getAllServices } from "../components/PostService";

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const serviceList = await getAllServices();
    setServices(serviceList);
    if (Array.isArray(serviceList)) {
      setServices(serviceList); // ✅ Now correctly setting the state
    } else {
      console.error("Unexpected data format received:", serviceList);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newService = await createService(title, description);
    if (newService) {
      setServices((prev) => [...prev, newService]);
      setTitle("");
      setDescription("");
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    const isDeleted = await deleteService(serviceId);
    if (isDeleted) {
      setServices((prev) => prev.filter((s) => s.id !== serviceId)); // ✅ Use `id` instead of `serviceId`
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {/* Form to create a new service */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Post a Service</h2>
        <form onSubmit={handleCreateService} className="space-y-3">
          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Service Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Service
          </button>
        </form>
      </div>

      {/* List of Services */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Available Services</h2>
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.id} className="bg-white shadow-md p-3 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteService(service.id)} // ✅ Use `id`
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Services;
