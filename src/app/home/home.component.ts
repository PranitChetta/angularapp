import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {

  }
  id = 0;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  arrRepositories: [] = [];
  page: number = 1;

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata() {
    this.http.get("https://api.github.com/search/repositories?q=created:>2020-05-22&sort=stars&order=desc&page=" + this.page)
      .subscribe(
        (respo:any) => this.onSuccess(respo.items)
      );
  }

  onSuccess(res:any) {
    if (res != undefined) {
      res.forEach(item => {
        this.arrRepositories.push(item);
      });
    }
  }


  onScroll() {
    console.log("CALLED");
    this.page = this.page + 1;
    this.fetchdata();
  }
}
