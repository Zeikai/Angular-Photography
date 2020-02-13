import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo: Photo;
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhoto(1).subscribe(data => this.photo = data);
  }

}
