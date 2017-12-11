import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


import { Notes } from '../lib/collections.js';



Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('notes', function(){
    return Notes.find({username: Meteor.user().username});
});
