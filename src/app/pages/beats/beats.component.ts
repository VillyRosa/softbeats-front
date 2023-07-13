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
  
  filters: any = {
    selectCategory: undefined,
    selectGender: undefined
  }

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

  load() {

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
      complete: () => {
        this.functionsService.showLoading = false;
      }
    });

  }

  onSearchChange(ev: any, type: string): void {

    if (type === 'name') this.filters.name = ev;

    this.beatsFilter = this.beats;
    
    this.beatsFilter = this.beatsFilter.filter((beat: any) => this.conditionName(this.filters.name, beat) && this.conditionCategory(this.filters.category, beat) && this.conditionGender(this.filters.gender, beat));

  }

  conditionName(value: any, beat: any) {
    
    console.log(value);

    if (value === undefined) return true;

    return beat.name.toLowerCase().indexOf(this.filters.name.toLowerCase()) !== -1;

  }

  conditionCategory(value: any, beat: any) {
    
    console.log(value);

    if (value === undefined) return true;

    console.log(beat.category_id === Number(value));

    return beat.category_id === Number(value);

  }

  conditionGender(value: any, beat: any) {
    
    if (value === undefined) return true;

    console.log(beat.gender_id === Number(value));

    return beat.gender_id === Number(value);

  }

}
