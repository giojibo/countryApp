import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, Translation } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    `
      a
      {
        text-decoration: none;
        color: white;
      }
      #escudo{
        width: 40%;
      }
    `
  ]
})
export class CountryPageComponent implements OnInit
{
  public country?: Country;

  constructor(
    private activatedRouter: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ){}
  ngOnInit(): void
  {
    this.activatedRouter.params.pipe(
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)),
    ).subscribe(
      country => {
        if(!country)return this.router.navigateByUrl('');
        return this.country = country;
      });
  };

  //Implemetacion de todos las traducciones desde interfaces.
  get allTranslations(): Translation[]
  {
    if (!this.country || !this.country.translations) {
      return [];
    }
    return Object.values(this.country.translations);
  }
}

