import { Component, inject, OnInit } from '@angular/core';
import { UserListing } from '@core/models/user-listing.model';
import { UserService } from '@core/services/user.service';
import { ListingTable } from '@components/common/listing-table/listing-table';

@Component({
  selector: 'app-user-listing-page',
  imports: [ListingTable],
  templateUrl: './user-listing-page.html',
  styleUrl: './user-listing-page.scss',
})
export class UserListingPage implements OnInit {
  private readonly _userService = inject(UserService);

  users: UserListing[] = [];

  async ngOnInit(): Promise<void> {
    const response = await this._userService.getUsers();
    this.users = response.data;
  }

  onClickDetails(id: string | number) {
    console.log('USER DETAILS OF ', id);
  }
}
