const Project = require('../../models/Project/ProjectModel');
const ObjectId = require('mongoose').Types.ObjectId;
const {
  setRequirement,
  setRisks
} = require('./projectService');

const setProject = async (req, res) => {

  try {

    // destructure object from auth middleware / cookie
    const { _id, name, email } = req.user;

    // destructure data from user/client
    const { title, desc, risk, funcReq, nonFuncReq } = req.body;

    // create project in db
    const project = await Project.create({
      // assign owner with data from auth middleware / cookie
      owner: {
        ownerId: _id,
        name: name,
        email: email
      },
      title: title,
      desc: desc,
      risk: setRisks(risk),
      funcReq: setRequirement(funcReq),
      nonFuncReq: setRequirement(nonFuncReq)
    });

    await project.save();

    if (project) {
      return res.status(201).json(project);
    } else {
      return res.status(500).json({ message: 'Unable to save project' });
    }

  } catch (err) {
    console.log(err);
  }

}

// Get a single project based on its ID
const getProject = async (req, res) => {
  try {
    /* const project = await Project.create({
      // assign owner with data from auth middleware / cookie
      owner: {
        ownerId: _id,
        name: name,
        email: email
      },
      title: title,
      desc: desc,
      risk: setRisks(risk),
      funcReq: setRequirement(funcReq),
      nonFuncReq: setRequirement(nonFuncReq)
    }); */
    const project = await Project.findById(req.params.id);
    if (project) {
      return res.json(project);
    } else {
      return res.status(404).json({ message: 'Unable to find project' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// Get all of a user's projects
const getProjects = async (req, res) => {

  try {

    const user = req.user;

    // TODO: Extend to get project's a user's a part of but doesn't own
    const projects = await Project.find({ 'owner.ownerId': user._id });

    if (projects) {
      console.log("Projects found: " + projects.length);
      return res.json(projects);
    } else {
      console.log("Projects not found");
      return res.status(404).json({ message: 'Unable to find projects' });
    }

  } catch (err) {

    console.log(err);

  }

}

const updateProject = async (req, res) => {

  try {

    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await project.save();

    if (project) {
      return res.json(project);
    } else {
      return res.status(500).json({ message: 'Unable to update project' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        general: 'Couldn\'t update project, please try again later'
      }
    });
  }

}


const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (project) {
      await Project.findByIdAndDelete(project.id);
      return res.status(200).json({ project_id: project.id });
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        general: 'Couldn\'t delete project, try again later'
      }
    });
  }

}

module.exports = {
  getProject,
  setProject,
  getProjects,
  deleteProject,
  updateProject
}
