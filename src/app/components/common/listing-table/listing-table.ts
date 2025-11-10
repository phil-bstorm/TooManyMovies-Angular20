import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-listing-table',
  imports: [],
  templateUrl: './listing-table.html',
  styleUrl: './listing-table.scss',
})
export class ListingTable {
  elements = input.required<any[]>();

  clickDetails = output<string | number>();

  onDetails(id: string | number) {
    this.clickDetails.emit(id);
  }
}
