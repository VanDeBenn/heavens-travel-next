import { http } from "#/utils/http";

const url = {
  reports: () => "/reports",
  report: (id: string) => `/reports/${id}`,
  photoReport: () => `/photo-reports/upload`,
};

const api = {
  create(data: any) {
    return http.post(url.reports()).send(data);
  },
  getReports() {
    return http.fetcher(url.reports());
  },
  getReport(id: string) {
    return http.fetcher(url.report(id));
  },
  updateReport(id: string, data: any) {
    return http.put(url.report(id)).send(data);
  },
  deleteReport(id: string) {
    return http.del(url.report(id));
  },
  addPhotoReport(data: any) {
    return http.post(url.photoReport()).send(data);
  },
};

export const reportRepository = {
  url,
  api,
};
