import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
//import { ReactiveVar } from 'meteor/reactive-var';

import './main.html'; 

Meteor.subscribe('notes');

console.log("userId: ", Meteor.userId(this.userId));

Accounts.ui.config({
  passwordSignupFields:'USERNAME_AND_EMAIL'
});

Template.body.helpers({

  notes: function(){
    return Notes.find({username: Meteor.user().username});
  }
 /*
  notes (){
    return Notes.find();
  },
 // {}, {sort:{createdAt: -1} }
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
    Meteor.call('notes.insert', text);
    //clear form
    $('#input-content').val('');
    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    console.log('clicked');
   // Notes.remove(this._id);
   Meteor.call('notes.remove', this);
    return false;
  }
});
