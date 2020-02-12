import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../service/photo.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  public photos = [];
  constructor(private photoService: PhotoService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(data => this.photos = data);
  }

}
