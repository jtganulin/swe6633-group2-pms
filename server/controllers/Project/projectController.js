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

const getProjects = async (req, res) => {

  try {

    const user = req.user; 

    const projects = await Project.find();

    if (projects) {
      return res.json(projects.filter( project => new ObjectId(project.owner.ownerId).equals(user._id)));
    } else {
      return res.status(404).json({ message: 'Unable to find projects' });
    }

  } catch(err) {

    console.log(err);

  }

}

const updateProjects = async (req, res) => {

  try {

    const project = await Project.findByIdAndUpdate(new ObjectId(req.params.id), req.body, { new: true });
    await project.save();

    if (project) {
      return res.json(project);
    } else {
      return res.status(500).json({ message: 'Unable to update project' });
    }
  } catch (err) {

    console.log(err);

  }

}


const deleteProjects = async (req, res) => {

  try {

    const project = await Project.findById(new ObjectId(req.params.id))
    
    if (project) {
      await Project.findByIdAndDelete(project.id); 
      res.status(200).json({ project_id: project.id });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }

  } catch (err) {

    console.log(err);

  }

}

module.exports = {
  setProject,
  getProjects,
  deleteProjects,
  updateProjects
}
