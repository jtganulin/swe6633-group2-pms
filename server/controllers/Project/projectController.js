const Project = require('../../models/Project/ProjectModel');
const ObjectId = require('mongoose').Types.ObjectId;

const setProject = async (req, res) => {

  try {

    const { _id, name, email } = req.user;
  

    const { title, desc } = req.body;
  

    const project = await Project.create({
      owner: {
        ownerId: _id,
        name: name,
        email: email
      },
      title: title,
      desc: desc
    })
    
    if (project) {
      res.json(project);
    } else {
      res.sendStatus(400);
      throw new Error('Unable to create project');
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
      res.json(projects.filter( project => new ObjectId(project.owner.ownerId).equals(user._id)));
    } else {
      res.sendStatus(404);
      throw new Error('Not found');
    }

  } catch(err) {

    console.log(err);

  }

}

module.exports = {
  setProject,
  getProjects
}
