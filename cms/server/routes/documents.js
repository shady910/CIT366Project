var sequenceGenerator = require('../routes/sequencegenerator');

var express = require('express');
var router = express.Router();

var Document = require('../models/document');


// get the documents from the collection
var getDocuments = function (request, response) {
  Document.find()
    .exec(function (error, documents) {
      if (error) {
        return response.status(500).json({
          title: 'An error occurred',
          error: error
        });
      }
      response.status(200).json({
        message: 'Success',
        obj: documents
      });
    });
}
// save the document into the collection
var saveDocument = function (response, document) {
  document.save(function (error, result) {
    response.setHeader('Content-Type', 'application/json');
    if (error) {
      return response.status(500).json({
        title: 'An error occurred',
        error: error
      });
    }
    getDocuments('', response);
  });
};

// delete the Doucment

var deleteDocument = function (response, document) {
  document.remove(function(err, result) {
    response.setHeader('Content-Type', 'application/json');
    if (err) {
      return response.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getDocuments('', response);
  });
};
// route.get function
router.get('/', function (req, response, next) {
  getDocuments(req, response);
});

// route.post function
router.post('/', function (request, response, next) {
  var maxDocumentId = sequenceGenerator.nextId('documents');
  var document = new Document({
    id: maxDocumentId,
    name: request.body.name,
    description: req.body.description,
    url: request.body.url
  });
  saveDocument(response, document);
});
// the patch part
router.patch('/:id', function (req, response, next) {
  Document.findOne({id: req.params.id}, function (err, document) {
    if (err || !document) {
      return response.status(500).json({
        title: 'No Document Found!',
        error: {document: 'Document not found'}
      });
    }
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(response, document);
  });
});

// router.delete function
router.delete('/:id', function (req, res, next) {
  var query = {id: req.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'No Document Found',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {documentId: req.params.id}
      });
    }
    deleteDocument(res, document);
  });
});
module.exports = router;
