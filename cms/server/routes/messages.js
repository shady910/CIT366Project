var sequenceGenerator = require('../routes/sequencegenerator');
var express = require('express');
var router = express.Router();

var Message = require('../models/message');



// CAN YOU OPEN MONGODB IN A TERMINAL FOR ME?



function getMessages(res) {
  Message.find().populate('sender')
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

console.log(messages);
      res.status(200).json({
        title: 'Success',
        obj: messages

      });
    });
};

var saveMessage = function (response, message) {
  message.save(function (err, result) {
    response.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getMessages(response);
  });
};

// DELETE THE MESSAGE
// There is no option to delete messages. Should I keep this?
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


router.get('/', function (req, response, next) {
  console.log('This is our route endpoint')
  getMessages(response);
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

router.patch('/:id', function (req, response, next) {
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

    saveMessage(response, message);
  });
});




module.exports = router;
