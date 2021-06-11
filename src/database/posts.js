

export const PostData = [
  {
    _id: "p124",
    created: new Date(2021,6,10),
    description: "My first post within this media. It feels nice to be here.",
    likes: [],
    comments: [{
      _id:"c1",
      comment:"Welcome Supminn, happy to see you here",
      user:"supminn",
      created: new Date(2021,4,1)
    }],
    user: "u125",
  },
  {
    _id: "p125",
    created: new Date(2021,11,10),
    description:
      "Learning redux toolkit today. Let's see how it turns out to be",
    likes: ["u126"],
    comments: [],
    user: "u125",
  },
  {
    _id: "p126",
    created: new Date(2021,10,9),
    description:
      "This is a post from Admin. This is a social media application",
    likes: [],
    comments: [],
    user: "u127",
  },
  {
    _id: "p127",
    created: new Date(2019,2,2),
    description:
      "Hello world, supriya here 😁",
    likes: [],
    comments: [],
    user: "u126",
  },
];
