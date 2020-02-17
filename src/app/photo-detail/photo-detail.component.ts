import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../model/photo';
import { PhotoService } from '../service/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  @Input() photo: Photo;
  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    // this.photoService.getPhoto(1).subscribe(data => this.photo = data);
  }

  save(): void {
    console.log(this.photo);
    this.photoService.updatePhoto(this.photo).subscribe(() => this.location.back());
  }

}
