import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';//FormGroup have multiple FormControls 
import { Photo } from '../model/photo';
import { PhotoService } from '../service/photo.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  uploadedImage: File;
  imagePreview: string;
  photoFormGroup: FormGroup;
  constructor(private location: Location, private router: Router, private ng2ImgMax: Ng2ImgMaxService, public sanitizer: DomSanitizer, private formBuilder: FormBuilder, private photoService: PhotoService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.photoFormGroup = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      imgSrc: [this.imagePreview, Validators.required],
      userId: [0]
    });
  }

  onImageChange(event) {
    let image = event.target.files[0];
    if (image.size > 2097152) {
      alert('Youe file is too big 😠');
      return
    }
    this.ng2ImgMax.compressImage(image, 2)
      .subscribe(
        result => {
          console.log(result);
          this.uploadedImage = new File([result], result.name);
          this.setImagePreview(this.uploadedImage);
        },
        error => {
          console.log('😅 Oh no!', error);
        }
      );
  }

  setImagePreview(file: File) {
    console.log(file.size)
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview);
      this.photoFormGroup.patchValue({
        imgSrc: this.imagePreview
      })
    };

  }

  add(name: string, imgSrc: string, userId: number): void {
    name = name.trim();

    const newPhoto: Photo = new Photo();
    newPhoto.id = new Date().getTime();
    newPhoto.name = name;
    newPhoto.imgSrc = imgSrc;
    newPhoto.userId = userId;
    this.photoService.addPhoto(newPhoto).subscribe(() => this.location.back())

  }

}
