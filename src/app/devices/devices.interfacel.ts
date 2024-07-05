export interface DeviceInterface {
  id: number;
  name: string;
  last_active: string;
}

export interface MeteringDevicesResponseInterface {
  current_page: number;
  data: DeviceInterface[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponseInterface {
  data: {
    metering_devices: MeteringDevicesResponseInterface;
  };
}
