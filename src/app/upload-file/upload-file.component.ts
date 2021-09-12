import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  form: FormGroup = new FormGroup(
    {
      name:new FormControl("",[Validators.required,Validators.minLength(4)]),
      image:new FormControl("",[Validators.required,Validators.email]),
       
      
    }
    
  );
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
  }

  onChange(e:any){
    let extensionAllowed:any = { "png": true, "jpeg": true };
    let file =  e.target.files[0] ;

     
      if (file.size / 1024 / 1024 > 20) {
        alert("File size should be less than 20MB")
        return;
      }
      if (extensionAllowed) {
        var nam = file.name.split('.').pop();
        if (!extensionAllowed[nam]) {
          alert("Please upload " + Object.keys(extensionAllowed) + " file.")
          return;
        }
      }
     
    
   
   
    this.form.controls["image"].setValue(file);
  }
  uplaodFile(){
    let form = this.form.value;
    const uploadData = new FormData();
    for (let input_name in form) {
      if (form[input_name] instanceof Blob) // check is file
      {
       
        uploadData.append(input_name, form[input_name], form[input_name].name ? form[input_name].name : "");
      
      }
        else
        uploadData.append(input_name, form[input_name]);
    }
    
    return this.http.post("https://readerstacks.com/demo/php.php", uploadData).subscribe(data=>{
      alert(JSON.stringify(data));
    })
      
       
      
  }

}
