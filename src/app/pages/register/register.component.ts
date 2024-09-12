import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formEquipment: FormGroup = this.fb.group({});
  public showCam: boolean = false;
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  capturedImage: string | null = null;
  stream: MediaStream | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializar o formulário
    this.formEquipment = this.fb.group({
      'productName': new FormControl('', [Validators.required]),
      'fiscalNote': new FormControl('', [Validators.required]),
      'serialNumber': new FormControl('', [Validators.required]),
      'brand': new FormControl('', [Validators.required]),
      'model': new FormControl('', [Validators.required]),
      'priority': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required, Validators.maxLength(1500)]),
      'power': new FormControl('', [Validators.required]),
      'voltage': new FormControl('', [Validators.required]),
      'current': new FormControl('', [Validators.required]),
      'photo': new FormControl(this.capturedImage, [Validators.required]),  // Campo foto
    });
  }

  // Método de envio do formulário
  public submit(): void {
    console.log(this.formEquipment.value);  // Aqui você verá todos os valores do formulário, incluindo a imagem
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
