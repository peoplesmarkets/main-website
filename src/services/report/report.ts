import _ from "lodash";
import {
  CreateReportRequest,
  GrpcWebImpl,
  ReportServiceClientImpl,
  ReportType,
} from "../peoplesmarkets/report/v1/report";
import { AccessTokenGetter, ServiceClient } from "../service-client";

export class ReportService extends ServiceClient {
  private readonly rpc: GrpcWebImpl;
  private readonly client: ReportServiceClientImpl;

  constructor(accessToken: AccessTokenGetter) {
    super(accessToken);
    this.rpc = new GrpcWebImpl(import.meta.env.VITE_SERIVCE_APIS_URL, {});
    this.client = new ReportServiceClientImpl(this.rpc);
  }

  public async create(request: CreateReportRequest) {
    return this.client.CreateReport(request, await this.withAuthHeader());
  }
}

export function listReportTypeCodes(): ReportType[] {
  const reportTypes = [];
  for (const t of Object.values(ReportType)) {
    if (_.isNumber(t) && t > 0) {
      reportTypes.push(t);
    }
  }
  return reportTypes;
}
