import type { IExecuteFunctions, IHookFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { INqdevResponseData } from "../../common";
import { IApiAuthorize } from "../interfaces";
import { getEsmsListBrandname, getEsmsListZaloOa, getUserInfo, } from "../services";
import { getEsmsCredentials, } from "../EsmsGenericFunctions";

export class AccountResource {
  static NAME_RESOURCE = 'account';

  static async executeCommand(
    this: IHookFunctions | IExecuteFunctions,
    operation: string, itemIndex: number
  ): Promise<INqdevResponseData> {

    // Lấy credentials từ node
    const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this);

    const esmsSmsType = this.getNodeParameter('esmsSmsType', itemIndex, '2') as string;
    //   esmsBrandname = (this.getNodeParameter('esmsBrandname', itemIndex, {}) as { mode: string; value: string })?.value ?? 'n8n-nqdev',
    //   esmsZaloOA = (this.getNodeParameter('esmsZaloOA', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
    //   esmsTemplateId = (this.getNodeParameter('esmsTemplateId', itemIndex, {}) as { mode: string; value: string })?.value ?? '';

    let responseData: INqdevResponseData = {
      operation,
      status: 'backlog',
      timestamp: new Date().toISOString(),
    };

    switch (operation) {
      case 'getBalance': {
        let esmsResponse = await getUserInfo.call(this, {
          ...esmsCredentials,
        });
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'getListBrandname': {
        let esmsResponse = await getEsmsListBrandname.call(this, {
          ...esmsCredentials,
          smsType: esmsSmsType ?? '2',
        });

        responseData['esmsResponse'] = {
          CodeResponse: esmsResponse.CodeResponse,
          ListBrandName: esmsResponse.ListBrandName?.filter((item) => item.Type?.toString() == (esmsSmsType ?? '2')),
        };
        break;
      }

      case 'getListZaloOa': {
        let esmsResponse = await getEsmsListZaloOa.call(this, {
          ...esmsCredentials,
        });
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      default: {
        throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`, {
          itemIndex: itemIndex
        });
      }
    }

    responseData['status'] = 'completed';
    return responseData;
  }
}
