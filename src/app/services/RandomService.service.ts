import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {

  public employees: any[];

  constructor() { }

  public getSomething() {
    return new Promise((resolve, reject) => {
      resolve('hallo 123');
    });
  }
}
