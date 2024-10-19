import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

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
  public client: any;
  public employee: any; 
  public isSubmiting: Boolean = false

  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  

  constructor(
    private fb: FormBuilder,
    private registerEquipment: EquipmentService,
  ) { }

  ngOnInit(): void {
    this.formEquipment = this.fb.group({
      'equipmentName' : new FormControl('', [Validators.required]),
      'serialNumber' : new FormControl('', [Validators.required]),
      'carrier' : new FormControl('', [Validators.required]),
      'brand' : new FormControl('', [Validators.required]),
      'model' : new FormControl('', [Validators.required]),
      'current' : new FormControl('', [Validators.required]),
      'power' : new FormControl('', [Validators.required]),
      'voltage' : new FormControl('', [Validators.required]),
      'priority' : new FormControl('', [Validators.required]),
      'description' : new FormControl('', [Validators.required]),
      'photo' : new FormControl('', [Validators.required]),

    })
  }

  submitEquipment(): void {
    this.statusMessenger = ' Cadastrando Equipamento'
    if (this.formEquipment.valid) {
      const formData = new FormData();
      
      // Adiciona todos os campos do formulário ao FormData
      Object.keys(this.formEquipment.controls).forEach(key => {
        const control = this.formEquipment.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      // Inclui a foto capturada se existir
      if (this.capturedImage) {
        formData.append('image', this.convertDataURLToFile(this.capturedImage, 'captured-image.png'));
      }
      // this.registerEquipment.registerEquipament(formData).subscribe(
      //   response => {
      //     this.statusMessenger = 'Equipamento Cadastrado'
      //     console.log('Equipamento cadastrado com sucesso:', response);
      //   },
      //   error => { 
      //     console.error('Erro ao cadastrar equipamento:', error);
      //   }
      // );
    }
  }

  // Função auxiliar para converter Data URL em File
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

  // Método para abrir a câmera
  openCamera(): void {
    this.startCamera();
    this.showCam = true;
  }

  // Iniciar a câmera
  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
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

  // Capturar a imagem da câmera
  public capture(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;

    // Ajustar o canvas para o tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converter o conteúdo do canvas em base64 (imagem)
    this.capturedImage = canvas.toDataURL('image/png');

    // Atualizar o campo 'photo' no formulário com a imagem capturada
    this.formEquipment.patchValue({
      photo: this.capturedImage
    });

    // Ocultar a câmera e parar o stream
    
    this.stopCamera();
  }

  // Parar a câmera
  public stopCamera(): void {
    this.showCam = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.videoElement.nativeElement.srcObject = null;
  }

}
