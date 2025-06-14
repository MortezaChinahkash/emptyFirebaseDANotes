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
        console.log(element.data);
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'noteId'), (doc) => {
      console.log(doc);
    });



    this.items$ = collectionData(this.getNormalRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    }); 
   
  }

  ngOnDestroy(): void {
    this.items.unsubscribe();
    this.unsubSingle();
    this.unsubList();
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
