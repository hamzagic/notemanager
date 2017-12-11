import { Template } from 'meteor/templating';

import { Notes } from '../lib/collections.js';
//import { ReactiveVar } from 'meteor/reactive-var';

import { Accounts } from 'meteor/accounts-base';

import './main.html'; 
//Template.hello.helpers({}); // helpers are where we define the functions

Accounts.ui.config({
  passwordSignupFields:'USERNAME_AND_EMAIL'
});

Template.body.helpers({
  notes(){
    return Notes.find({}, {sort:{createdAt: -1} });
  },
  /*
  notes:[
    {text: "My first note"},
    {text: "My second note"}
  ]
  */
});

Template.add.events({      
  'submit .add-form': function(){
    event.preventDefault();
    //get input value
   // const target = event.target;
   // const text = target.text.value;
  const text =  $('#input-content').val();
    console.log(text);
    //insert data into Notes collection
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    //clear form
    $('#input-content').val('');

    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    console.log('clicked');
    Notes.remove(this._id);
    return false;
  }
});
