import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formEquipment: FormGroup = this.fb.group({});
  public formClient: FormGroup = this.fb.group({});
  public showCam: boolean = false;
  public equipmentForm: Boolean = true;
  public equipament: any;
  public capturedImage: string | null = null;
  public stream: MediaStream | null = null;
  public statusMessenger: String = '';

  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  
  public get registerTitle(){
    return this.equipmentForm ? 'Cadastro de Equipamento' : 'Cadastro de Cliente'
  };

  constructor(
    private fb: FormBuilder,
    private registerEquipment: EquipmentService,
    private registerClient: ClientService
  ) {
    this.formEquipment = this.fb.group({
      equipmentName: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      carrier: ['', Validators.required],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      current: ['', [Validators.required]],
      power: ['', [Validators.required]],
      voltage: ['', [Validators.required]],
      description: [''],
      priority: ['B']
      });
    }

  async ngOnInit() {
    console.log(await this.registerClient.getClients().toPromise());


    this.formClient = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required]),
      'codClient': new FormControl('', [Validators.required]),
      'cnpj': new FormControl('', [Validators.required, Validators.maxLength(18)]),
    })
  }

  // Método de envio do formulário
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
      console.log('aqui')
      this.registerEquipment.registerEquipament(formData).subscribe(
        response => {
          this.statusMessenger = 'Equipamento Cadastrado'
          console.log('Equipamento cadastrado com sucesso:', response);
        },
        error => {
          console.error('Erro ao cadastrar equipamento:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  // Função auxiliar para converter Data URL em File
  convertDataURLToFile(dataURL: string, filename: string): File {
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

  public submitClient(){
    if (this.formClient.valid) {
      const clientData = this.formClient.value;
      this.registerClient.registerClient(clientData).subscribe(
        response => {
          console.log('Cliente registrado com sucesso', response);
        },
        error => {
          console.error('Erro ao registrar o cliente', error);
        }
      );
    }

  }

  // Método para abrir a câmera
  public openCamera(): void {
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
  capture(): void {
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
    this.showCam = false;
    this.stopCamera();
  }

  // Parar a câmera
  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.videoElement.nativeElement.srcObject = null;
  }
}
