import dbConnect from "../../../../utilities/dbConnect";
import User from "../../../../models/User";

export const config = {
  api: {
    externalResolver: true,
  },
};

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) {
          res.status(400).json({ success: false });
        }

        res.status(200).end(JSON.stringify({ success: true, data: user }));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
