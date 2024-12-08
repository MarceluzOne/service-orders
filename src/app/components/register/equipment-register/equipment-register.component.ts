import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StorageKeys } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-equipment-register',
  templateUrl: './equipment-register.component.html',
  styleUrls: ['./equipment-register.component.scss']
})
export class EquipmentRegisterComponent implements OnInit {
  public formEquipment: FormGroup = this.fb.group({});
  public showCam: boolean = false;
  public isAdmin: Boolean = true;
  public equipmentForm: 'client' | 'equipment' | 'employee' = 'equipment';
  public capturedImage: string | null = null;
  public stream: MediaStream | null = null;
  public isSubmiting: Boolean = false;

  public get profile() {
    return this.localStorage.get(StorageKeys.Profile)
  }

  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private registerEquipment: EquipmentService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {
    this.formEquipment = this.fb.group({
      'image': new FormControl('', [Validators.required]),
      'equipmentName': new FormControl('', [Validators.required]),
      'serialNumber': new FormControl(''),
      'carrier': new FormControl('', Validators.required),
      'receiver': new FormControl(this.profile['name'], [Validators.required]),
      'enterprise_name': new FormControl('', [Validators.required]),
      'brand': new FormControl('', [Validators.required]),
      'model': new FormControl('', [Validators.required]),
      'current': new FormControl('', [Validators.required]),
      'power': new FormControl('', [Validators.required]),
      'voltage': new FormControl('', [Validators.required]),
      'priority': new FormControl('', [Validators.required]),
      'connectors': new FormControl(''),
      'ihm': new FormControl(''),
      'carcass_damage': new FormControl(''),
      'engine': new FormControl(''),
      'engine_cables': new FormControl(''),
      'fan': new FormControl(''),
      'fan_carcass': new FormControl('',),
      'others': new FormControl(''),
    })
  }

  async ngOnInit() { }

  public submitEquipment(): void {
    this.isSubmiting = true
    this.toastr.info('Cadastrando equipamento')
    const updatedValues = { ...this.formEquipment.value }
    Object.keys(updatedValues).forEach((key) => {
      if (updatedValues[key] === true) {
        updatedValues[key] = "SIM";
      }
      if (updatedValues[key] === '') {
        updatedValues[key] = "NAO"
      }
    });
    this.formEquipment.patchValue(updatedValues);
    const validation = confirm('Deseja cadastrar o equipamento?');

    if (validation && this.formEquipment.valid) {
      this.toastr.info('Cadastrando equipamento', 'AGUARDE')
      let payload: any;
      if (this.capturedImage) {
        payload = new FormData();
        Object.keys(this.formEquipment.value).forEach((key) => {
          payload.append(key, this.formEquipment.value[key])
        });
        payload.append('image', this.convertDataURLToFile(this.capturedImage, 'captured-image.png'));
      }
    this.registerEquipment.registerEquipament(payload).subscribe(
      response => {
        this.toastr.success('Equipamento cadastrado com sucesso');
        this.isSubmiting = false;
        this.formEquipment.reset();
      },
        error => {
          this.toastr.error(error.message);
          this.isSubmiting = false;
        }
      );
    } else {
      this.toastr.info('Não foi possível cadastrar o equipamento.');
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

  public uploadImage(event: any) {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        console.error('Por favor, selecione um arquivo de imagem.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;

        this.formEquipment.patchValue({
          image: imageBase64,
        });

        this.capturedImage = imageBase64;
      };

      reader.readAsDataURL(file);
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
  }
}
