import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';

const Contract = require('../../../build/contracts/Contract.json');
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  web3: any;
  abi: any = {};
  netWorkData: any = {};
  netId: any;
  contract: any;
  address: any;
  account: any;

  ipfs: any;
  msg_text: string = '';

  result: any;
  patient : any;
  patientDetails: string[] = [];
  addprogress:boolean = false;
  patientInfoload: boolean = false;
  added:boolean = false
  failed:boolean = false

  constructor(
    private blockChainService: BlockchainService,
    private ipfsService: IpfsService,
    private http: HttpClient
  ) {

    this.web3 = blockChainService.getWeb3();
    this.web3.eth.getAccounts((err: any, accs: any) => {
      this.account = accs[0];
    });

    this.web3.eth.net.getId().then((r: number) => {
      this.netId = r;
      this.abi = Contract.abi;
      this.netWorkData = Contract.networks[this.netId];

      console.log(this.netWorkData);

      if (this.netWorkData) {
        this.address = this.netWorkData.address;
        this.contract = this.web3.eth.Contract(this.abi, this.address);

        console.log(this.contract.methods.getAdmin.call());
        this.patient = this.contract.methods.getAllDrs
          .call()
          .then((docs: string[]) => {
            this.patient = docs;
            console.log(this.patient);
          });
        console.log('Patient', this.patient);
      } else {
        console.log('Contract not Deployed');
      }
    });

    // this.contract = blockchainService.getContract();
    
    // this.getAcccount();

    this.ipfs = ipfsService.getIPFS();
  }

  getPatient(): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.blockChainService.getContract().then((contract: any) => {
        this.patient = contract.methods.getAllDrs()
          .call()
          .then((docs: any) => {
            this.patient = docs;
            console.log(this.patient);
            resolve(this.patient)
          });
      })

    })
  }

  addPatient(pat_id: any, data: any) {
    console.log("adding Patient");
    this.contract = this.blockChainService.getContract()

    this.ipfs.addJSON(data).then((IPFSHash: any) => {
      debugger;
      console.log("IPFS hash : ",IPFSHash);
      this.contract.methods
        .addPatInfo(pat_id, IPFSHash)
        .send({ from: this.account })
        .on("confirmation",(result: any) => {
          console.log("result",result);
          if(result){
            this.addprogress = true
            this.added = true
          }
        })
        .catch((err: any) => {
          console.log("error",err);
          this.addprogress = true
          this.added = false
          this.failed = true
        });
    });
  }

  getAcccount() {
    console.log('geting Account...');
    let getacc = setInterval(() => {
      this.account = this.blockChainService.getAccount();
      if (this.account != null) {
        clearInterval(getacc);
        return this.account;
      }
    }, 1000);
  }

  getPatientDetails(patID: any): Promise<any> {
    console.log('patID', patID);
    return new Promise((resolve, reject) => {
      this.blockChainService.getContract().then((contract: any) => {
        contract.methods
          .getPatient(patID)
          .call()
          .then((ipfsHash: string) => {
            console.log(ipfsHash);
            this.http.get('https://ipfs.infura.io/ipfs/' + ipfsHash)
              .subscribe((data: any) => {
                console.log(data);
                resolve(data);
              });
          });
      })

    })

  }
}
