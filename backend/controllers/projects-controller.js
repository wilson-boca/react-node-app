
const Project = require('../models/project');
const Task = require('../models/task');

const postProject = async (req, res) => {
  try {
    const project = new Project({
      "name": req.body.name,
      "description": req.body.description,
      userId: req.user._id,
    });
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProject = async (req, res) => {
    try {
      // TODO Perguntar se cada user só pode ver seus próprios projetos/tarefas.
      // const project = await Project.find({ userId: req.user._id });
      const project = await Project.find();
      res.send(project);
    } catch (error) {
      res.status(400).send(error);
    }
};

const putProject = async (req, res) => {
  try{    
    const id = req.params.id;
    await Project.updateOne({ _id: id }, req.body)
    res.send({'message': 'Projeto atualizado com sucesso'});  
  } catch (error) {
    console.error('Erro ao atualizar project:', error);
  }
};

const deleteProject = async (req, res) => {
  try{
    const id = req.params.id;
    // Delete cascading
    await Task.deleteMany({ projectId: id });
    await Project.deleteOne({ _id: id })
    res.send({'message': 'Projeto e Tarefas removidos com sucesso'});
  } catch (error) {
    console.error('Erro ao remover project:', error);
  }
};

exports.postProject = postProject;
exports.getProject = getProject;
exports.putProject = putProject;
exports.deleteProject = deleteProject;
