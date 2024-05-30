import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http:any;
  tablearr: any[] = [];
  title: any;
  isVisible = false;
  toshow:any;
  actualval: any;
  
  constructor(http:HttpClient){
    this.http=http;
    http.get('http://localhost:3000/findall',{responseType:"text"}).subscribe((res:any)=>{
 
      console.log(res)
      this.tablearr=JSON.parse(res)
 
  })
  }
   
  
  dp(h:any){
  this.tablearr.push(h);
  console.log(this.tablearr)

  this.http.post('http://localhost:3000/test',h,{responseType:"text"}).subscribe((res:any)=>{
 
   
 
  })
  }

  delete(p:any){
    this.tablearr=this.tablearr.filter(j=>{
      if(j.name!=p){
        return j.name;
      }
    })
  console.log(p)
  this.http.delete(`http://localhost:3000/deletename/${p}`,{responseType:"text"}).subscribe((res:any)=>{
 
 
  })
  }

  openpopup(u:any){
    this.isVisible=true;
    this.toshow=u;
    this.actualval=u;
  }

  close(){
    this.isVisible=false;
  }
  
  edit(){
    console.log(this.actualval,"actualval")

    this.tablearr.forEach(x=>{
      if(x.name==this.actualval){
        x.name=this.toshow

      }
    })
    
    this.http.put(`http://localhost:3000/updatename/${this.actualval}`,{updatename:this.toshow},{responseType:"text"}).subscribe((res:any)=>{
 
 
   })


    this.isVisible=false
   //hello pavan kalyan
  }

}
