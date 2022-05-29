import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PatientService } from 'src/admin/services/patient.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  model: any = {
    patID: '',
    fName: 'test_name',
    lName: 'test_name',
    phone: '123456789',
    city: 'city',
    state: 'state',
  };

  image_url: any;
  imageCompressedUrl: string = '';

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success:boolean = false

  ipfs: any;

  constructor(
    private imageCompress: NgxImageCompressService,
    private patientService: PatientService) {}


  ngOnInit(): void {
    this.ipfs = this.patientService.ipfs
  }

  onSubmit() {
    this.show = true
    this.msg_text = "Adding Patient to the Network..."
    console.log(this.model);
    this.checkAddProgress()
    this.model.imageHash = this.image_url;
    let data = this.model;

    this.ipfs.addJSON(data).then((IPFShash: string) => {
      console.log(IPFShash);
      this.msg_text = 'Data added to IPFS...';
      //add data to blockchain
      this.patientService.contract.methods
        .addPatInfo(this.model.patID, IPFShash)
        .send({ from: this.patientService.account })
        .on("confirmation",(result: any) => {
          console.log('result', result);
          if (result == 1) {
            this.msg_text += '<br>User Added to the Blockchain';
            console.log('User added Successfully');
            this.success = true
            this.model = {};
            return result;
          } else {
            this.warn = !this.warn;
            this.msg_text = this.patientService.msg_text;
            console.log(result);
            return result;
          }
        })
        .catch((err: any) => {
          this.warn = !this.warn;
          this.msg_text =
            'Adding patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
            this.model.patID +
            '<b>"</b></small><br>1.not a valid address or <br>2.Already have a role';
          console.log(err);
          return err;
        });
    });
  }

  PreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image_url = event.target.result;
        this.compressImage();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  compressImage() {
    this.imageCompress
      .compressFile(this.image_url, 50, 50)
      .then((compressedImage) => {
        this.imageCompressedUrl = compressedImage;
        this.image_url = this.imageCompressedUrl;
      })
      .catch((er) => {
        console.log(er);
      });
  }

  checkAddProgress(){
    console.log("Checking progress");
    
    let checkProgress = setInterval(() => {
      if(this.patientService.added){
        this.msg_text = "Patient Added to the network"
        this.success = true
        clearInterval(checkProgress)
      }
      if(this.patientService.failed){
        this.warn = true
        this.msg_text = "Patient adding Failed"
        clearInterval(checkProgress)
      }
    },500)
  }

  onClose() {
    this.show = false
    this.warn = false
  }
}
