export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  status: "Regular" | "Probationary";
  dateHired: string;
  email: string;
}

export interface ProbationEmployee {
  fullName: string;
  email: string;
  status: string;
}

export const employees: Employee[] = [
  {
    id: "U2345",
    firstName: "Christopher",
    lastName: "Clark",
    status: "Regular",
    dateHired: "2020-01-15",
    email: "christopher.clark@sprobe.com",
  },
  {
    id: "U2346",
    firstName: "Patricia",
    lastName: "Anderson",
    status: "Probationary",
    dateHired: "2026-01-10",
    email: "patricia.anderson@sprobe.com",
  },
  {
    id: "U2348",
    firstName: "Robert",
    lastName: "Jackson",
    status: "Regular",
    dateHired: "2020-03-12",
    email: "robert.jackson@sprobe.com",
  },
  {
    id: "U2349",
    firstName: "Jennifer",
    lastName: "Martin",
    status: "Regular",
    dateHired: "2019-05-20",
    email: "jennifer.martin@sprobe.com",
  },
  {
    id: "U2350",
    firstName: "John",
    lastName: "Eve",
    status: "Regular",
    dateHired: "2019-11-08",
    email: "john.eve@sprobe.com",
  },
  {
    id: "U2351",
    firstName: "Barbara",
    lastName: "Anderson",
    status: "Regular",
    dateHired: "2020-02-14",
    email: "barbara.anderson@sprobe.com",
  },
  {
    id: "U2352",
    firstName: "Roberto",
    lastName: "Johnson",
    status: "Regular",
    dateHired: "2019-07-22",
    email: "roberto.johnson@sprobe.com",
  },
  {
    id: "U2353",
    firstName: "Michael",
    lastName: "Martin",
    status: "Probationary",
    dateHired: "2026-02-01",
    email: "michael.martin@sprobe.com",
  },
];

export const probationEmployees: ProbationEmployee[] = [
  {
    fullName: "Patricia Anderson",
    email: "patricia.anderson@sprobe.com",
    status: "Just Started",
  },
  {
    fullName: "Michael Martin",
    email: "michael.martin@sprobe.com",
    status: "2nd Month",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriam.lomas@sprobe.com",
    status: "3rd Month Evaluation",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriam.lomas@sprobe.com",
    status: "4th Month",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriam.lomas@sprobe.com",
    status: "5th Month",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriam.lomas@sprobe.com",
    status: "End of Probation Evaluation",
  },
  {
    fullName: "Miguel Lomas",
    email: "miguel.lomas@sprobe.com",
    status: "3rd Month Evaluation",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriamlomas@sprobe.com",
    status: "Just Started",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriamlomas@sprobe.com",
    status: "2nd Month",
  },
  {
    fullName: "Miriam Lomas",
    email: "miriamlomas2@sprobe.com",
    status: "4th Month",
  },
];

export const calendarEvents = [
  { date: "2026-06-02", type: "meeting", title: "Team Meeting" },
  { date: "2026-06-09", type: "meeting", title: "HR Review" },
  { date: "2026-06-16", type: "meeting", title: "Board Meeting" },
  { date: "2026-06-23", type: "meeting", title: "Q2 Review" },
  { date: "2026-06-30", type: "meeting", title: "End of Month" },
];
