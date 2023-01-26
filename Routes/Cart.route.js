const express = require("express");
const { CartModel } = require("../models/Cart.model");
const CartRouter = express.Router();

CartRouter.get("/", async (req, res) => {
  const id = req.body.userID;
  console.log(req.body);
  try {
    const allData = await CartModel.find({ userID: id });
    res.status(200).send(allData);
  } catch (error) {
    console.log(error.message);
  }
});

CartRouter.post("/add", async (req, res) => {
  const { userID, restro, deals } = req.body;
  // console.log(req.body);
  try {
    const user = await CartModel.find({ userID });
    console.log(user, "user");
    if (user.length > 0) {
      let c = await CartModel.updateOne(
        { userID: userID },
        { $push: { deals: deals } }
      );
      const data =await CartModel.find({userID});
      res.send({"msg":"product added successfully",data});
    } else {
      const c = new CartModel(req.body);
      await c.save();
      let data =await CartModel.find({userID})
      res.send({"msg":"product added successfully",data});
    }
  } catch (error) {
    console.log(error.message);
    res.send(error)
  }
});

CartRouter.post("/dec", async (req, res) => {
  const { userId, restroId, dealsId } = req.body;
  try {
    const user = await CartModel.find({ userId });
    console.log(user);
    if (user[0].count >= 1) {
      const cart = await CartModel.updateOne(
        { userId, dealsId, restroId },
        { $inc: { count: -1 } },
        { new: true }
      );
      return res.send(cart);
    } else {
      const cart = await CartModel.updateOne(
        { userId, dealsId, restroId },
        { $set: { count: 0 } },
        { new: true }
      );
      res.send(cart);
    }
  } catch (error) {
    console.log(error.message);
  }
});

CartRouter.delete("/delete", async (req, res) => {
  const userID = req.body.userID;
  try {
    await CartModel.deleteOne({ userID});
    res.status(200).send("Deleted cart successfully");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});




module.exports = { CartRouter };
