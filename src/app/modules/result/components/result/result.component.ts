import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/app/modules/test/services/test.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() result:  any;

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getTestById();
  }

  getTestById() {
    this.testService.getDetailTestStore(this.result.idTest).subscribe(res => {
      console.log(res)
    })
  }

}
