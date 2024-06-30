
const Task = require('../models/task');

const postTask = async (req, res) => {
  try {
    const task = new Task({
      "projectId": req.params.id,
      "title": req.body.title,
      "description": req.body.description,
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTask = async (req, res) => {
    try {
      const tasks = await Task.find({ projectId: req.params.id }).populate({ 
        path: 'completedBy', 
        model: 'User',
        select: 'name'
      });
      res.send(tasks);
    } catch (error) {
      res.status(400).send(error);
    }
};

const putTask = async (req, res) => {
  try{
    const id = req.params.id;
    if (req.body.status === "concluída"){
      req.body['completedBy'] = req.user._id;
      req.body['completedAt'] = Date.now();
    }
    await Task.updateOne({ _id: id }, req.body);
    res.send({'message': 'Task atualizada com sucesso'});  
  } catch (error) {
    console.error('Erro ao atualizar task:', error);
  }
};

const deleteTask = async (req, res) => {
  try{
    const id = req.params.id;
    await Task.deleteOne({ _id: id })
    res.send({'message': 'Task removida com sucesso'});  
  } catch (error) {
    console.error('Erro ao remover task:', error);
  }
};

exports.postTask = postTask;
exports.getTask = getTask;
exports.putTask = putTask;
exports.deleteTask = deleteTask;
