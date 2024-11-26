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
    private toastr: ToastrService
  ) { 
    this.formEquipment = this.fb.group({
      'image' : new FormControl('', [Validators.required]),
      'equipmentName' : new FormControl('', [Validators.required]),
      'serialNumber' : new FormControl('', Validators.required),
      'carrier' : new FormControl('', Validators.required),
      'receiver' : new FormControl('', [Validators.required]),
      'enterprise_name' : new FormControl('', [Validators.required]),
      'brand' : new FormControl('', [Validators.required]),
      'model' : new FormControl('', [Validators.required]),
      'current' : new FormControl('', [Validators.required]),
      'power' : new FormControl('', [Validators.required]),
      'voltage' : new FormControl('', [Validators.required]),
      'priority' : new FormControl('', [Validators.required]),
      'connectors' : new FormControl('NÃO', [Validators.required]),
      'ihm' : new FormControl('NAO', [Validators.required]),
      'carcass_damage' : new FormControl('NAO', [Validators.required]),
      'engine' : new FormControl('NAO', [Validators.required]),
      'engine_cables' : new FormControl('NAO', [Validators.required]),
      'fan' : new FormControl('NAO', [Validators.required]),
      'fan_carcass' : new FormControl('NAO', [Validators.required]),
      'others' : new FormControl(''),
    })
  }

  async ngOnInit() {  }
  

  public submitEquipment(): void {
    console.log(this.formEquipment.value)
    const validation = confirm('Deseja cadastrar o equipamento?')
    if ( validation && this.formEquipment.valid) {
      const formData = this.formEquipment.value;

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
    }else{
      this.toastr.info('Não foi possivel cadastrar o equipamento')
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
      image: this.capturedImage
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
  public uploadImage(event: any){
  const input = event.target as HTMLInputElement;

  if (input?.files && input.files.length > 0) {
    const file = input.files[0]; // Obtem o arquivo selecionado

    // Verifica se é uma imagem
    if (!file.type.startsWith('image/')) {
      console.error('Por favor, selecione um arquivo de imagem.');
      return;
    }

    // Converte a imagem para Base64
    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result as string;

      // Atualiza o formulário com a imagem
      this.formEquipment.patchValue({
        image: imageBase64,
      });

      // Define a imagem capturada para pré-visualização
      this.capturedImage = imageBase64;
    };

    reader.readAsDataURL(file); // Lê o arquivo como Base64
  } else {
    console.error('Nenhum arquivo foi selecionado.');
  }
  }

}
