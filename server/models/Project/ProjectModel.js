const mongoose = require('mongoose');
// create schema for effort
const effortSchema = mongoose.Schema({
  effortType: {
    type: String,
    enum: {
      values: ['reqAnalysis', 'design', 'coding', 'testing', 'projectManagement'],
      message: 'Please indicate which type of effort this is'
    },
    required: [true, 'Please indicate which type of effort this is']
  },
  timeCost: {
    type: Number,
    required: [true, 'Please input the time costed for this effort']
  },
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
});

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
const totalTimeEffortSchema = mongoose.Schema({
  reqAnalysis: Number,
  design: Number,
  coding: Number,
  testing: Number,
  projectManagement: Number
})

// create schema for project owner
const ownerSchema = mongoose.Schema({
  ownerId: mongoose.Types.ObjectId,
  email: String,
  name: String
})

const memberSchema = mongoose.Schema({
  memberId: mongoose.Types.ObjectId,
  name: String,
  email: String,
  role: String
})

// create schema for overall project
const projectSchema = mongoose.Schema({

  // use owner schema above, complications with actual User Schema so do this instead
  owner: ownerSchema, 
  
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
  members: [memberSchema],

  // give project a list of risks with arra of riskSchema
  risk: [riskSchema],

  // give project a list of functional requirements with array of requirementSchema
  funcReq: [requirementSchema],

  // give project a list of non-functional requirements with array of requirementSchema
  nonFuncReq: [requirementSchema],

  totalEffort: totalTimeEffortSchema

})

module.exports = mongoose.model('Project', projectSchema);
