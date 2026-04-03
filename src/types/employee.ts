export type EmployeeStatus = 'Regular' | 'Probationary' | 'Contractual'
export type ExperienceLevel = 'Junior' | 'Mid-level' | 'Senior'
export type Gender = 'Male' | 'Female'
export type MaritalStatus = 'Single' | 'Married' | 'Widowed' | 'Divorced'
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type EmployeeDetailTab = 'profile' | 'employment' | 'academic' | 'government' | 'projects' | 'skills'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  status: EmployeeStatus
  dateHired: string
}

export interface EmployeeProfile {
  firstName: string
  middleName: string
  lastName: string
  birthday: string
  gender: Gender | ''
  maritalStatus: MaritalStatus | ''
  bloodType: BloodType | ''
  religion: string
  primaryAddress: string
  city: string
  zipCode: string
  secondaryAddress: string
  personalEmail: string
  phone: string
  photoUrl: string
}

export interface EmploymentInfo {
  idNumber: string
  division: string
  careerCounselor: string
  onboardDate: string
  positionAsHired: string
  currentPosition: string
  effectivity: string
  jobRank: string
  status: EmployeeStatus | ''
  experience: ExperienceLevel | ''
  workEmail: string
}

export interface AcademicInfo {
  school: string
  degree: string
  yearStarted: string
  yearGraduated: string
  honors: string
}

export interface GovernmentIds {
  sss: string
  hdmf: string
  philhealth: string
  bir: string
  nbi: string
}

export interface Project {
  id: string
  name: string
  startDate: string
  uploadDate: string
}
