import mongoose from "mongoose";

interface DentistItem {
  objectId : mongoose.Schema.Types.ObjectId
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

interface ReportJson {
  success: boolean;
  count: number;
  data: ReportItem[];
}

interface ReportItem {
  _id: string;
  patientId:PatientItem;
  dentistId:DentistItem;
  treatment:string;
  prescribed_medication:string;
  recommendations:string;
  date:string;
}

interface PatientItem{
  objectId : mongoose.Schema.Types.ObjectId
  _id: string;
  name: string;
  email: string;
  role: string;
  userType: string;
  tel: string;
}



interface AppointmentJson {
  success: boolean;
  count: number;
  data: AppointmentItem[];
}

