const express = require('express');
const router = require('express').Router();
const apiController = require('./controllers/api.controller');

router.post('/guest/items/:keyword', apiController.addGuestItem);
router.get('/guest/items/', apiController.getGuestItems);

module.exports = router;
