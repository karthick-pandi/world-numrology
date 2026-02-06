import SavedData from "@/src/app/mycontact/page";

export const ROUTES = {
  LOGIN: "/login",
  DAILYFORCAST: "/index/daily-forecast",
  SINGLEREPOERT:'/singlereport',
  SAVEDDATA:'/mycontact',
  SAVEDREADINGS:'/accounts',

};

export interface SavedReading {
  id: string;
  image: string;
  userName: string;
  reportName: string;
  date: string;
  color: string;
}

export const CONST = {
  ROUTES,
};
