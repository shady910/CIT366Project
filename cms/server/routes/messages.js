var express = require('express');
var router = express.Router();

var Message = require('../models/message');
var sequenceGenerator = require('../routes/sequencegenerator');

router.get('/', function (req, res, next) {
  getMessages(res);
});

router.post('/', function (req, res, next) {
  var maxMessageId = sequenceGenerator.nextId('messages');
  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  saveMessage(res, message);
});

router.patch('/:id', function (req, res, next) {
  Message.findOne({id: req.params.id}, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message);
  });
});

var getMessages = function (res) {
  Message.find()
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    });
};

var saveMessage = function (res, message) {
  message.save(function (err, result) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getMessages('', res);
  });
};

// DELETE THE MESSAGE
var deleteMessage = function(response, message) {
    message.remove(function(err, results){
        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
          }
        getMessages('', response);
      });
  }

module.exports = router;
