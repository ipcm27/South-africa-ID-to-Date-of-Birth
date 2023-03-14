import { ServiceComponent } from './ServiceComponent';
import { Sims } from './Sims';
import { ClientData } from './ClientData';

export class ClientDataResp {
  statusCode!: number;
  resultMessage!: string;
  serviceComponent!: ServiceComponent;
  clientData!: ClientData;
  subscriberCards!: Sims[];
}
