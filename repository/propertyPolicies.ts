import { http } from "#/utils/http";

const url = {
  propertyPolicies: () => "/property-policies",
  propertyPolicie: (id: string) => `/property-policies/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.propertyPolicies()).send(data);
  },
  getPropertyPolicies() {
    return http.fetcher(url.propertyPolicies());
  },
  getPropertyPolicy(id: string) {
    return http.fetcher(url.propertyPolicie(id));
  },
  updatePropertyPolicy(id: string, data: any) {
    return http.put(url.propertyPolicie(id)).send(data);
  },
  deletePropertyPolicy(id: string) {
    return http.del(url.propertyPolicie(id));
  },
};

export const propertyPoliciesRepository = {
  url,
  api,
};
