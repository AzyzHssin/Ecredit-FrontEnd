import { DemandeCredit } from './../Models/DemandeCredit_Model';
import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../services/DemandeService"
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-consultation-credit',
  templateUrl: './consultation-credit.component.html',
  styleUrls: ['./consultation-credit.component.css'],
  providers: [MessageService]
})
export class ConsultationCreditComponent implements OnInit {

  constructor(private demandeServ:DemandeService,private messageService: MessageService) { }
  displayInfoDialogue:boolean=false;
  demandeArray!:DemandeCredit[];
  dialogueData!:DemandeCredit;
  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(){
    console.log("called");

    this.demandeServ.getDemande().subscribe((data:DemandeCredit[])=>{
      this.demandeArray=data;
      this.demandeArray.forEach(element => {
        element.dateDemande=new Date(element.dateDemande);


      });
      console.log(" demandeCredit array is fetched",data,"--------------")
    },(error:any) => {
      console.error('Error fetching demandeCredit data:', error);
    });

  }

  changerEtat(object:DemandeCredit,nouveauEtat:String){
    object.guaranties=[];
    /* console.log("changerLetat est executer avec :",nouveauEtat,object) */
    this.demandeServ.updateDemande(object,nouveauEtat).subscribe((response)=>{
      this.fetchDemandes();
      console.log("updated :",response);
      this.showSuccess(`L'etat de la demande est changé`)
    }),
    (error:any) => {
      console.error('Error updating state of demande :', error);
      this.showError("Echec du changement du l'etat de la demande");
    }

  }

  showSuccess(msg:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail:msg});
}
showError(msg:string) {
  this.messageService.add({severity:'error', summary: 'Error', detail: msg});
}
showDemandeInfoDialog(demande:DemandeCredit){
  this.displayInfoDialogue=true
  this.dialogueData=demande;
}
}
