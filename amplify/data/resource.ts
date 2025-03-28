import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
//can't use 'owner' because of authorization stuff



const schema = a.schema({
  // User model
  User: a
    .model({
      userId: a.id().required(), // Unique identifier for the user
      information: a.customType({
        name: a.string(), // User's name
        age: a.integer(), // User's age
        email: a.email(), // User's email address
        phone: a.phone(), // User's phone number
      }), // User's information
      friends: a.hasMany('Friend', 'friendshipId'), // Users this user has added as friends
      services: a.hasMany('Service', 'posterId'), // Services created by this user
    })
    .authorization((allow) => [allow.owner()]),

  //Friend model
  Friend: a
    .model({
      friendshipId: a.id(), // Unique identifier for the friendship
      friend: a.belongsTo('User', 'friendshipId'), // Relationship to the User model (friend)
      friendId: a.id(), // Relationship to the User model (friend)
    })
    .authorization((allow) => [allow.owner()]),

  // Service model
  Service: a
    .model({
      serviceId: a.id(), // Unique identifier
      posterId: a.id(), // Unique identifier for the service
      title: a.string(), // Title of the service
      description: a.string(), // Description of the service
      poster: a.belongsTo('User', 'posterId'), // The user who referred the service
      leads: a.hasMany('Lead', 'serviceId'), // Leads submitted for this service
    })
    .authorization((allow) => [allow.owner()]),

  // Lead model

  Lead: a
    .model({
      leadId: a.id(), // Unique identifier for the lead
      serviceId: a.id(),//which service it was submitted too
      service: a.belongsTo('Service', 'serviceId'), // Unique identifier for the lead
      referrerId: a.id(), // Unique identifier for the referrer
      information: a.customType({
        name: a.string(), // Lead's name
        age: a.integer(), // Lead's age
        email: a.email(), // Lead's email address
        phone: a.phone(), // Lead's phone number
      }), // Lead's information
      leadMessage: a.string(), // Message from the lead

      status: a.enum(["Prospect", "Purchased", "Rejecteed"]), // Status of the lead 
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",


    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
