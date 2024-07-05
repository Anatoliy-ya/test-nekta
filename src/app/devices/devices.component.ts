import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { ApiResponseInterface, DeviceInterface } from './devices.interfacel';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MatCard, MatTableModule],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'last_active'];
  dataSource: DeviceInterface[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDevices();
  }

  fetchDevices(): void {
    const requestPayload = {
      page: 1,
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
          if (response && response.data && response.data.metering_devices) {
            this.dataSource = response.data.metering_devices.data;
          }
        },
        error: (error) => {
          console.error('Device fetch error', error);
        },
      });
  }

  formatDate(dateString: string): string {
    return formatDate(dateString, 'dd.MM.yyyy HH:mm', 'en-US');
  }
}
