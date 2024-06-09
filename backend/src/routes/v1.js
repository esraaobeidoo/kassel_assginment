'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();
const { authorizeTeacher } = require('../auth/middleware/authorizeTeacher ');

// Parameter middleware to load model dynamically
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


// Apply teacherAuthMiddleware to routes that require teacher permissions

// Handler functions for CRUD operations
async function handleGetAll(req, res) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}



// Define CRUD routes after specific routes like /courses
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', authorizeTeacher, handleCreate);
router.put('/:model/:id', authorizeTeacher, handleUpdate);
router.delete('/:model/:id', authorizeTeacher, handleDelete);

module.exports = router;
