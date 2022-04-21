import { Component, OnInit } from '@angular/core';
// import { layout } from '@rfid-mocks/inp-timeline-plot';
// import { ThemeService } from '@app-global/services/theme/theme.service';
import { Subscription } from 'rxjs';
import $ from 'jquery';
declare const Plotly: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit {
  name = 'Angular';
    timeCount=0;
    progess: number=0;
    isFoo:boolean = false;
    interval:any;
    coutVal: number = 0;
    textName='A';
    myPlot:any;
    testDic =[
      {num:0, name:'A'},
      {num:1, name:'B'}
    ]
    constructor() { }
    ngOnInit() {
      this.scaterPlot(this.isFoo);
     }
  myFunc(){
      console.log("function called");
      this.isFoo=true;
      this.scaterPlot(this.isFoo);
      Plotly.purge("myDiv");
      clearInterval(this.interval);
  }
  scaterPlot(status:any):void{
      let trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers',
        type: 'scatter'
      };

      let trace2 = {
        x: [2, 3, 4, 5],
        y: [16, 5, 11, 9],
        mode: 'lines',
        type: 'scatter'
      };

      let trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines+markers',
        type: 'scatter'
      };

      let data = [trace1, trace2, trace3];
  
      console.log('status',status);
      var testVal=['A','B','C','D'];
      let layout={
        title:'PlotA'
      }
      Plotly.newPlot("myDiv",data,layout);
      this.myPlot = document.getElementById('myDiv');
      //this.myPlot.on('plotly_click', function(){
      //  alert('You clicked this Plotly chart!');
     //   clearInterval(this.interval);
     // });
     const self = this;

      if (!status){
        this.interval = setInterval(() => {
          if(this.progess >= 3) {
            console.log(this.progess);
            this.coutVal++;
            if (this.coutVal==4){
              this.coutVal=0;
            }
            let layoutNew={
              title:'Plot'+this.textName
            }
            Plotly.newPlot("myDiv",data,layoutNew);
            this.textName=testVal[this.coutVal];
            this.progess=0;
          } else {
            this.progess++;
            
          }
        },1000);
      }
     $('#myDiv').hover(function(ev){
       console.log('hover clear');
        clearInterval(self.interval);
        self.coutVal=0;
      }, function(ev){
        self.interval = setInterval(() => {
          if(self.progess >= 3) {
            console.log(self.progess);
            self.coutVal++;
            if (self.coutVal==4){
              self.coutVal=0;
            }
            let layoutNew={
              title:'Plot'+self.textName
            }
            Plotly.newPlot("myDiv",data,layoutNew);
            self.textName=testVal[self.coutVal];
            self.progess=0;
          } else {
            self.progess++;
            
          }
        },1000);
      });
  }
}
