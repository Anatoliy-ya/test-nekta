import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { ApiResponseInterface, DeviceInterface } from './devices.interfacel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MatCard, MatTableModule, MatPaginator],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'last_active'];
  dataSource: DeviceInterface[] = [];
  totalDevices = 0;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDevices(this.currentPage);
  }

  fetchDevices(page: number): void {
    const requestPayload = {
      page: page,
      last_page: 0,
      sort_field: 'id',
      sort: 'desc',
      search_string: null,
      device_state: 'all',
      is_archived: false,
      paginate: true,
      append_fields: ['active_polling', 'attributes', 'tied_point'],
      per_page: 10,
    };

    this.http
      .post<ApiResponseInterface>(
        'https://core.nekta.cloud/api/device/metering_devices',
        requestPayload
      )
      .subscribe({
        next: (response: ApiResponseInterface) => {
          console.log('Device fetch success', response);
          if (response && response.data && response.data.metering_devices) {
            this.dataSource = response.data.metering_devices.data;
            this.totalDevices = response.data.metering_devices.total;
          }
        },
        error: (error) => {
          console.error('Device fetch error', error);
        },
      });
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchDevices(this.currentPage);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString, 'dd.MM.yyyy HH:mm', 'en-US');
  }
}
