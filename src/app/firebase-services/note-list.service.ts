import { Injectable } from '@angular/core';
import {Note} from '../interfaces/note.interface';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  constructor() { }
}
