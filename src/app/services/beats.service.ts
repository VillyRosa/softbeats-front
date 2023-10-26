import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ImageUpload {
  image: File;
};

interface AudioUpload {
  audio: File;
};

interface BeatUpload {
  userid: number;
  categoryid: number;
  genderid: number;
  description: string;
  name: string;
  image: string;
  audio: string;
};

@Injectable({
  providedIn: 'root'
})
export class BeatsService {

  url: string = 'beats/';

  constructor(
    private http: HttpClient
  ) { }

  getAll(userid: number): Observable<any> {

    return this.http.get(this.url + userid);

  }

  cadImage(bodyRequest: ImageUpload): Observable<any> {
    
    const formData = new FormData();
    formData.append('image', bodyRequest.image);

    return this.http.post(this.url + 'image', formData);

  }

  cadAudio(bodyRequest: AudioUpload): Observable<any> {
    
    const formData = new FormData();
    formData.append('audio', bodyRequest.audio);

    return this.http.post(this.url + 'audio', formData);

  }

  cadBeat(bodyRequest: BeatUpload): Observable<any> {

    return this.http.post(this.url, bodyRequest);

  }

}
