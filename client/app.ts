import 'reflect-metadata';
import 'zone.js/dist/zone';

/* import {NgZone, Component} from 'angular2/core'; */
import {Component} from 'angular2/core';

import {bootstrap} from 'angular2-meteor-auto-bootstrap';

import {Parties} from '../collections/parties';
import {Tracker} from 'meteor/tracker';


@Component({
  selector: 'app',
  templateUrl: "client/app.html"
})

class Socially {
 
  parties: Mongo.Cursor<Object>;
  
  constructor () {
    this.parties = Parties.find();
  }

}

bootstrap(Socially);
