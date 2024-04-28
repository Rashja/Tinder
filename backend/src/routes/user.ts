import express, { Request, Response } from "express";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();
router.post(
  "/update",
  verifyToken,
  check("username", "Username is required"),
  check("university", "Username is required"),
  check("gender", "Gender is required"),
  check("interests", "interests is required"),
  check("image", "image is required"),
  check("distance", "distance is required"),
  check("genderInterested", "genderInterested is required"),
  async (req: Request, res: Response) => {
    try {
      await User.updateOne(
        { _id: req.userId.toString() },
        {
          username: req.body.username,
          interests: req.body.interests,
          university: req.body.university,
          gender: req.body.gender.toUpperCase(),
          image: req.body.image,
          completeProfile: true,
          genderInterested: req.body.genderInterested.toUpperCase(),
          distance: parseInt(req.body.distance),
          limit: {
            count: 10,
          },
        }
      );
      return res.status(200).send({ message: "User has been updated" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get(
  "/recommendations",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
      const user = await User.findOne({
        _id: userId.toString(),
      });
      if (user?.limit?.date) {
        const givenTime = new Date(user.limit.date);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - givenTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference >= 24) {
          await User.updateOne(
            { _id: userId.toString() },
            { $unset: { "limit.date": "" }, "limit.count": 10 }
          );
        } else {
          return res
            .status(200)
            .send({ message: "You are out of likes for today" });
        }
      }
      const search = `${user?.genderInterested} ${user?.interests.join(" ")}`;

      const users = await User.aggregate([
        {
          $match: {
            $text: { $search: search },
            location: { $lte: user?.distance },
            gender: user?.genderInterested,
            liked: { $nin: [userId] },
            disliked: { $nin: [userId] },
          },
        },
        {
          $project: {
            _id: 1,
            liked: 1,
            disliked: 1,
            username: 1,
            email: 1,
            interests: 1,
            location: 1,
            gender: 1,
            university: 1,
            image: 1,
            score: { $meta: "textScore" },
          },
        },
        { $sort: { score: 1 } },
      ]);

      return res.status(200).send({ users });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get(
  "/like/:like/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const params = req.params;
    try {
      const user = await User.findOne({ _id: userId.toString() });

      if (user?.limit?.count == 0) {
        await User.updateOne(
          { _id: userId.toString() },
          {
            "limit.date": new Date().toISOString(),
          }
        );
        return res.status(200).send({ limited: true });
      }

      if (params.like === "true") {
        await User.updateOne(
          { _id: params.id.toString() },
          { $push: { liked: { $each: [userId] } } }
        );
        await User.updateOne(
          { _id: userId.toString() },
          {
            $inc: {
              "limit.count": -1,
            },
          }
        );
      } else if (params.like === "false") {
        await User.updateOne(
          { _id: params.id.toString() },
          { $push: { disLiked: { $each: [userId] } } }
        );
      }

      return res.status(200).send({});
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get("/profile-complete", async (req: Request, res: Response) => {
  try {
    const tokenWithBearer = req.headers["authorization"] || "";
    const [_, token] = tokenWithBearer!.split(" ");
    let userId;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      userId = (decoded as JwtPayload).userId;
    }
    const user = await User.findOne({ _id: userId?.toString() });

    return res.status(200).send({ completeProfile: user?.completeProfile });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
