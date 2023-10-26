import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BeatsService } from 'src/app/services/beats.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { GendersService } from 'src/app/services/genders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-beats',
  templateUrl: './beats.component.html',
  styleUrls: ['./beats.component.scss']
})
export class BeatsComponent implements OnInit {

  authUser: any;
  
  viewRegisters: boolean = true;
  filters: any = {
    selectCategory: undefined,
    selectGender: undefined
  };

  beatForm: any = {
    name: '',
    category_id: null,
    gender_id: null,
    description: '',
    image: '',
    audio: ''
  };

  beats: any = [];
  beatsFilter: any = [];
  categories: any = [];
  genders: any = [];

  constructor(
    private readonly functionsService: FunctionsService,
    private readonly usersService: UsersService,
    private readonly beatsService: BeatsService,
    private readonly categoriesService: CategoriesService,
    private readonly gendersService: GendersService
  ) {}

  ngOnInit() {

    this.load();

  }

  load(): void {

    this.functionsService.showLoading = true;

    this.authUser = this.usersService.getAuth();
    this.beats = [];
    this.categories = [];
    this.genders = [];

    const beatsRequest = this.beatsService.getAll(this.authUser.id);
    const categoriesRequest = this.categoriesService.getAll(this.authUser.id);
    const gendersRequest = this.gendersService.getAll(this.authUser.id);

    forkJoin([beatsRequest, categoriesRequest, gendersRequest]).subscribe({
      next: ([beatsResp, categoriesResp, gendersResp]) => {
        this.beats = beatsResp;
        this.beatsFilter = beatsResp;
        this.categories = categoriesResp;
        this.genders = gendersResp;
      },
      error: error => console.log(error),
      complete: () => this.functionsService.showLoading = false
    });

  }

  onSearchChange(ev: any, type: string): void {

    if (type === 'name') this.filters.name = ev;

    this.beatsFilter = this.beats;
    
    this.beatsFilter = this.beatsFilter.filter((beat: any) => this.conditionName(this.filters.name, beat) && this.conditionCategory(this.filters.selectCategory, beat) && this.conditionGender(this.filters.selectGender, beat));

  }

  conditionName(value: any, beat: any) {
    
    if (value === undefined) return true;

    return beat.name.toLowerCase().indexOf(this.filters.name.toLowerCase()) !== -1;

  }

  conditionCategory(value: any, beat: any) {

    if (value === undefined || value === 'undefined') return true;

    return beat.category_id === Number(value);

  }

  conditionGender(value: any, beat: any) {
    
    if (value === undefined || value === 'undefined') return true;

    return beat.gender_id === Number(value);

  }

  toggleView(ev: boolean): void {
    this.viewRegisters = ev;
    this.onCancel();
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    this.beatForm.image = file;
  }
  
  onAudioSelected(event: any): void {
    const file: File = event.target.files[0];
    this.beatForm.audio = file;
  }

  selectBeatToEdit(ev: any): void {
    
    this.viewRegisters = false;
    this.beatForm.name = ev.name;
    this.beatForm.category_id = ev.category_id;
    this.beatForm.gender_id = ev.gender_id;
    this.beatForm.description = ev.description;
  
  }

  onSave(): void {

    this.functionsService.showLoading = true;

    let imageName: string;
    let audioName: string;

    const imageRequest = this.beatsService.cadImage({ image: this.beatForm.image });
    const audioRequest = this.beatsService.cadAudio({ audio: this.beatForm.audio });

    forkJoin([imageRequest, audioRequest]).subscribe({
      next: ([imageResp, audioResp]) => {
        imageName = imageResp.imageName;
        audioName = audioResp.audioName;

        const bodyRequest: any = {
          userid: this.authUser.id,
          categoryid: this.beatForm.category_id,
          genderid: this.beatForm.gender_id,
          description: this.beatForm.description,
          name: this.beatForm.name,
          image: imageName,
          audio: audioName
        };

        this.beatsService.cadBeat(bodyRequest).subscribe({
          next: (data: any) => {
            console.log(data);
            this.load();
            this.viewRegisters = true;
          },
          error: (err: any) => console.error(err),
          complete: () => this.functionsService.showLoading = false
        });

      },
      error: (err: any) => console.error(err)
    });

  }

  onEdit(): void {

  }

  onDelete(): void {

    

  }

  onCancel(): void {

  }

}