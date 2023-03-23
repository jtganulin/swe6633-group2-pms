const mongoose = require('mongoose');
const userSchema = require('../User/UserModel').userSchema;

// create schema for effort
const effortSchema = mongoose.Schema({
  effortType: {
    type: String,
    required: [true, 'Please indicate which type of effort this is']
  },
  timeCost: {
    type: Number,
    required: [true, 'Please input the time costed for this effort']
  }
})

// create schema for requirements
const requirementSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please indicate whether this is a functional requirement or non-functional requirement']
  },
  name: {
    type: String,
    required: [true, 'Please add a name for the Requirement']
  },
  content: {
    type: String,
    required: [true, 'Please add Content for the Requirement']
  },
  effort: [effortSchema]

})

// create schema for risks
const riskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name for the Risk']
  },
  content: {
    type: String
  },
  status: {
    type: String
  }
})

// create schema for totalTime and Effort
const totalTimeEffort = mongoose.Schema({
  reqAnalysis: Number,
  design: Number,
  coding: Number,
  testing: Number,
  projectManagement: Number
})

// create schema for overall project
const projectSchema = mongoose.Schema({

  // give owner the user schema imported from '../User/UserModel.js'
  owner: userSchema, 
  
  // give project a title
  title: {
    type: String,
    required: [true, 'Please add a project title']
  },

  // give project a description
  desc: {
    type: String,
  },

  // give project a list of members with array of userSchema
  members: [userSchema],

  // give project a list of risks with arra of riskSchema
  risk: [riskSchema],

  // give project a list of functional requirements with array of requirementSchema
  funcReq: [requirementSchema],

  // give project a list of non-functional requirements with array of requirementSchema
  nonFuncReq: [requirementSchema]

})
