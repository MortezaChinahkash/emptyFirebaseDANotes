import { inject, Injectable } from '@angular/core';
import {Note} from '../interfaces/note.interface';
import { collectionData, Firestore, collection, doc, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  items;
  items$;
  firestore: Firestore = inject(Firestore);

  unsubList;
  unsubSingle;

  constructor() { 

    this.unsubList = onSnapshot(this.getNormalRef(), (list) =>{
      list.forEach(element => {
        console.log(element);
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'noteId'), (doc) => {
      console.log(doc);
    });

    this.unsubSingle();
    this.unsubList();

    this.items$ = collectionData(this.getNormalRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    }); 
    this.items.unsubscribe();
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNormalRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(colRef: string, docId: string) {
    return doc(collection(this.firestore, colRef), docId);
  }
}
