import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment-register',
  templateUrl: './equipment-register.component.html',
  styleUrls: ['./equipment-register.component.scss']
})
export class EquipmentRegisterComponent implements OnInit {
  public formEquipment:  FormGroup = this.fb.group({});
  public showCam: boolean = false;
  public isAdmin: Boolean = true;
  public equipmentForm: 'client' | 'equipment' | 'employee' = 'equipment';
  public equipament: any;
  public capturedImage: string | null = null;
  public stream: MediaStream | null = null;
  public statusMessenger: String = '';
  public clients: any;
  public employee: any; 
  public isSubmiting: Boolean = false;


  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  

  constructor(
    private fb: FormBuilder,
    private registerEquipment: EquipmentService,
    private clientService: ClientService,
    private toastr: ToastrService
  ) { 
    this.formEquipment = this.fb.group({
      'equipmentName' : new FormControl('', [Validators.required]),
      'serialNumber' : new FormControl('', [Validators.required]),
      'receiver' : new FormControl('Australopitecus', Validators.required),
      'enterprise_name' : new FormControl('BRF', Validators.required),
      'carrier' : new FormControl('', [Validators.required]),
      'brand' : new FormControl('', [Validators.required]),
      'model' : new FormControl('', [Validators.required]),
      'current' : new FormControl('', [Validators.required]),
      'power' : new FormControl('', [Validators.required]),
      'voltage' : new FormControl('', [Validators.required]),
      'priority' : new FormControl('', [Validators.required]),
      'others' : new FormControl('', [Validators.required]),
      'photo' : new FormControl('', [Validators.required]),
      'ihm' : new FormControl('NAO', [Validators.required]),
      'carcass_damage' : new FormControl('NAO', [Validators.required]),
      'engine' : new FormControl('NAO', [Validators.required]),
      'engine_cables' : new FormControl('NAO', [Validators.required]),
      'fan' : new FormControl('NAO', [Validators.required]),
      'fan_carcass' : new FormControl('NAO', [Validators.required]),
      'connectors' : new FormControl('NAO', [Validators.required]),
    })
  }

  async ngOnInit() {
    await this.getClients()
    
  }
  public async getClients(){
    try {
      const clients = await this.clientService.getClients().toPromise();
      this.clients = clients
    } catch (error) {
        this.clients = []
    }

  }

  public submitEquipment(): void {
    console.log(this.formEquipment.value)
    if (this.formEquipment.valid) {
      const formData = new FormData();
      
      Object.keys(this.formEquipment.controls).forEach(key => {
        const control = this.formEquipment.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      if (this.capturedImage) {
        formData.append('image', this.convertDataURLToFile(this.capturedImage, 'captured-image.png'));
      }
      this.registerEquipment.registerEquipament(formData).subscribe(
        response => {
          this.toastr.success('Equipamento cadastrado com sucesso');
          this.formEquipment.reset();
        },
        error => { 
          this.toastr.error(error.error.message,'Erro ao cadastrar o equipamento')
          console.error('Erro ao cadastrar equipamento:', error);
        }
      );
    }
  }

  private convertDataURLToFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  openCamera(): void {
    this.startCamera();
    this.showCam = true;
  }
  private isMobile(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  }

  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: this.isMobile()
          ? { facingMode: { exact: "environment" } }
          : true, 
      })
        .then((stream: MediaStream) => {
          this.stream = stream;
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
        })
        .catch((err) => {
          console.error("Erro ao acessar a câmera: ", err);
        });
    }
  }

  public capture(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.capturedImage = canvas.toDataURL('image/png');

    this.formEquipment.patchValue({
      photo: this.capturedImage
    });
    this.stopCamera();
  }

  public stopCamera(): void {
    this.showCam = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.videoElement.nativeElement.srcObject = null;
  }

}
