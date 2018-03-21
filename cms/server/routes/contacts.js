
var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');
var sequenceGenerator = require('../routes/sequencegenerator');

router.get('/', function (req, res, next) {
  getContacts(res);
});

router.post('/', function (req, res, next) {
  var maxContactsId = sequenceGenerator.nextId('contacts');
  var contact = new Contact({
    id: maxContactsId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });
  saveContact(res, contact);
});

router.patch('/:id', function (req, res, next) {
  Contact.findOne({id: req.params.id}, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact);
  });
});

router.delete('/:id', function (req, res, next) {
  var query = {id: req.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'No Contact Found',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contactId: req.params.id}
      });
    }
    deleteContact(res, contact);
  });
});

var getContacts = function(res) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: contacts
      });
    });
};

var saveContact = function (response, contact) {
  // replace contacts in group contact with their primary key (_id) values
  if (contact.group && contact.group.length > 0) {
    for (var groupContact in contact.group) {
      groupContact = groupContact._id;
    }
  }
  contact.save(function (err, saveResponse) {
    response.setHeader('Content-Type', 'application/json');
    if (err) {
      return response.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getContacts(response);
  });
};

var deleteContact = function (res, contact) {
  contact.remove(function (err, result) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
  });
  getContacts(res);
};

module.exports = router;
