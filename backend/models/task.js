const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum : ['pendente','concluída'],
      default: 'pendente'
    },
    completedBy: {
      type: String,
      required: false,
      default: null
    },
    completedAt: {
      type: Date,
      required: false,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);