import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    let categoryRef = this.db.list('/categories', ref => ref.orderByChild('name'));
    return categoryRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }));
    // return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
}
