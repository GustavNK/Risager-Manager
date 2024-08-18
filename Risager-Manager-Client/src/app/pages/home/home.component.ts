import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(SimpleDialogComponent);
  }

  houseList = [
    {
      name: 'House 1',
      description: 'The red house by the road',
      price: 100,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQye2dvfJ7aOS9Rb_0lPqV2BVXBdCG9MwJSpg&s',
    },
    {
      name: 'House 2',
      description: 'The small cabin by the lake',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
    {
      name: 'House 2',
      description: 'This is a lovely house',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
    {
      name: 'House 2',
      description: 'This is a lovely house',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
    {
      name: 'House 2',
      description: 'This is a lovely house',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
    {
      name: 'House 2',
      description: 'This is a lovely house',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
    {
      name: 'House 2',
      description: 'This is a lovely house',
      price: 200,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235964740.jpg?k=637845ad1c92c98e76fca74e9a9f9e2feb1da06045f9c6b6bc950e2bf9c384f0&o=&hp=1',
    },
  ];
}
