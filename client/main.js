import { Template } from 'meteor/templating';

import { Notes } from '../lib/collections.js';
//import { ReactiveVar } from 'meteor/reactive-var';

import './main.html'; //we need to import the main html page, where everything will be placed

//Template.hello.helpers({}); // helpers are where we define the functions

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
      createdAt: new Date()
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
