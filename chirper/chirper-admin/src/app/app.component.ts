import { Component, OnInit } from '@angular/core';

import { Cheep } from './cheeps';
import { CheepsService } from './cheeps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cheeps: Cheep[];
  error = '';
  success = '';
  title = 'Chirper Admin Application';

  constructor(private cheepsService: CheepsService ){

  }
  ngOnInit() {
    this.getCheeps();
  }

  getCheeps(): void {
    this.cheepsService.getAll().subscribe(
      (res: Cheep[]) => {
        this.cheeps = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  deletecheep(id){
    this.success = '';
    this.error   = '';

    this.cheepsService.delete(+id)
      .subscribe(
        (res: Cheep[]) => {
          this.cheeps = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
      alert("Delete Successfully!");
      window.location.reload();
  }
}
