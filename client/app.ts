import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {Parties} from '../collections/parties';
import {Tracker} from 'meteor/tracker';
import {PartiesForm} from './parties-form/parties-form';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [PartiesForm]
})
class Socially {
  parties: Mongo.Cursor<Object>;
 
  constructor () {
    this.parties = Parties.find();
  }

  removeParty(party) {
    Parties.remove(party._id);
  }

} 
bootstrap(Socially);
