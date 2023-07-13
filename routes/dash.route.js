const express = require("express");
const { DashModel} = require("../models/dash.model");
DashtRouter  = express.Router();
// const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticator");


DashtRouter.get("/employees", authenticate,async (req, res) => {
   
    
    try {
      const product = await DashModel.find();
      res.status(200).send(product);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });


DashtRouter.post("/employees", authenticate, async (req, res) => {
    const payload = req.body;
  
    try {
      const product = new  DashModel(payload);
      await product.save();
      res.status(200).send({ msg: "New employee has been Added in Database" });
    } catch (err) {
      res.status(404).send({ msg: "Not able to add Post" });
    }
  });


  DashtRouter.delete("/employees/:userid",authenticate, async (req, res) => {
    const { userid } = req.params;
  
    try {
      await DashModel.findByIdAndDelete({ _id: userid });
      res.status(200).send("employee has been deleted");
    } catch (err) {
      res.status(404).send({ msg: "Not able to delete" });
    }
  });


  DashtRouter.patch("/employees/:userid",authenticate, async (req, res) => {
    const { userid } = req.params;
    const payload = req.body;
    try {
      await DashModel.findByIdAndUpdate({ _id: userid }, payload);
      res.status(200).send("Employee has been updated");
    } catch (err) {
      res.status(404).send({ msg: "Not able to update" });
    }
  });

  DashtRouter.get("/page/:pageNum",authenticate, async (req, res) => {
    const PAGE_SIZE = 5;
  
    const { pageNum } = req.params
  
    try {
      const movie = await  DashModel.find({})
        .skip((pageNum - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
      res.status(200).send(movie);
    } catch (err) {}
  });



  DashtRouter.get("/filter", async (req, res) => {
    
    const searchTerm = req.query.department;
    

    try {
      const book = await DashModel.find( { department: searchTerm  } );
      res.status(200).send(book);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });






  DashtRouter.get("/sort/desc", async (req, res) => {
    
    try {
      const book = await DashModel.aggregate(
        [
          { $sort : { salary : -1 } }
        ]
     )
      res.status(200).send(book);
    } catch (err) {
      res.status(404).send({ msg: "Not able to read" });
    }
  });



  DashtRouter.get("/sort/asc", async (req, res) => {
    
    try {
        const book = await DashModel.aggregate(
          [
            { $sort : {salary : 1 } }
          ]
       )
        res.status(200).send(book);
      } catch (err) {
        res.status(404).send({ msg: "Not able to read" });
      }
  });








  module.exports={DashtRouter}