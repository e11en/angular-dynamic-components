import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private form: FormGroup;
  private objProps = [];
  private listItems = [];
  private employees = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.form = new FormGroup({});
  }

  private getFormGroup(data) {
    const formGroup = {};
    this.objProps = [];

    for (const prop of Object.keys(data)) {
      const objProp = {
        key: prop,
        label: data[prop].label,
        type: data[prop].type,
        children: data[prop].children,
        image: ''
      };

      if (data[prop].type === 'date' && data[prop].value.length > 0) {
        data[prop].value = this.formatDate(new Date(data[prop].value));
      }
      if (data[prop].type === 'image') {
        objProp.image = data[prop].value;
      }

      this.objProps.push(objProp);

      formGroup[prop] = new FormControl(data[prop].value);
    }

    return formGroup;
  }

  private getListItems(data): string[] {
    const listItems = [];
    for (const item of Object.keys(data)) {
      listItems.push(data[item][0].value + ' ' + (data[item][1].value ? data[item][1].value + ' ' : '') + data[item][2].value);
    }

    return listItems;
  }

  private changeSelectedRow(index) {
    this.form = new FormGroup(this.getFormGroup(this.employees[index]));
  }

  private formatDate(date: Date): string {
    return date.getFullYear() + '-05' + '-' + date.getDate();
  }

  private onSubmit() {
    console.log('submit');
  }
}
