interface DentistItem {
  _id: string;
  name: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
  picture: string;
}

interface DentistJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: DentistItem[];
}

interface AppointmentItem {
  _id: string;
  appDate: Date;
  user: string;
  userName: string;
  dentist: DentistItem;
  createAt: string;
}

interface AppointmentJson {
  success: boolean;
  count: number;
  data: AppointmentItem[];
}