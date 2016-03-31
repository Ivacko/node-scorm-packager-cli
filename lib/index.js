#!/usr/bin/env node
'use strict';

const program = require('commander');
const prompt = require('prompt');
const supportedCommands = ['init', '--v', '--help'];
const schema = {
  properties: {
    version: {
      description: 'Type number from 1 to 3\n 1 - (Scorm1.2)\n 2 - (Scorm2004 3rd Edition)\n 3 - (Scorm2004 4th hEdition) \n',
      conform: function (value) {
        return (value >= 1 && value <= 3);
      },
      message: 'Version have be number from 1 to 3',
      required: true
    },
    organization: {
      description: 'Name of the Organization',
      type: 'string',
      required: true
    },
    title: {
      description: 'Company title',
      type: 'string',
      required: true
    },
    identifier: {
      description: 'Unique identifier',
      type: 'string',
      default: '0',
      required: false
    },
    masteryScore: {
      description: 'Passing score from 0 to 100',
      message: 'Passing score must be number from 0 to 100',
      conform: function (value) {
        return (value >= 0 && value <= 100);
      },
      default: 80,
      required: false
    },
    startingPage: {
      description: 'Starting page',
      type: 'string',
      default: 'index.html',
      required: true
    },
    source: {
      description: 'Path to your source files',
      type: 'string',
      required: true
    },
    destination: {
      description: 'Path to where the package should be saved',
      type: 'string',
      default: '',
      required: false
    }
  }
};

prompt.get(schema, function (err, result) {
  console.log(result);
});

//TODO return just for testing remove
return;

program.version('0.0.1');
program
  .command('init')
  .description('create SCORM package step by step')
  .action(function() {
    prompt.start();
    prompt.get(schema, function (err, result) {
      console.log(result);
    });
  });

if (!process.argv.slice(2).length) {
  program.help();
}

//TODO improve logic
if (supportedCommands.indexOf(process.argv[2]) === -1) {
  console.log("scorm: " + process.argv.slice(2).join(' ') + " is not supported command. See 'scorm --help'");
  return;
}

program.parse(process.argv);