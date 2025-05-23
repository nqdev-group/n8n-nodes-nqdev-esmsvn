import type { INodeProperties } from "n8n-workflow";
import { AccountResource, OttMessageResource, SmsMessageResource } from "../resources";

const esmsSmsTypeModel: INodeProperties[] = [
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 2,
    displayOptions: {
      show: {
        resource: [SmsMessageResource.NAME_RESOURCE, AccountResource.NAME_RESOURCE],
        operation: ['sendSmsMessage', 'getListBrandname', 'getListTemplate'],
      }
    },
    options: [
      {
        name: 'Brandname QC',
        action: 'Brandname QC',
        value: 1,
        description: ''
      },
      {
        name: 'Brandname CSKH',
        action: 'Brandname CSKH',
        value: 2,
        description: ''
      },
      {
        name: 'Cố định giá rẻ',
        action: 'Cố định giá rẻ',
        value: 8,
        description: ''
      }
    ],
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 23,
    displayOptions: {
      show: {
        resource: [OttMessageResource.NAME_RESOURCE],
        operation: ['sendViberMessage'],
      }
    },
    options: [
      {
        name: 'Viber Message',
        action: 'Viber Message',
        value: 23,
        description: ''
      },
    ],
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 24,
    displayOptions: {
      show: {
        resource: [OttMessageResource.NAME_RESOURCE, AccountResource.NAME_RESOURCE],
        operation: ['sendZnsMessage', 'getListZaloOa', 'getListTemplate', 'getZnsTemplateInfo'],
      }
    },
    options: [
      {
        name: 'Zalo Ưu Tiên',
        action: 'Zalo Ưu Tiên',
        value: 24,
        description: ''
      },
      {
        name: 'Zalo Bình Thường',
        action: 'Zalo Bình Thường',
        value: 25,
        description: ''
      }
    ],
  },
];

const esmsSenderModel: INodeProperties[] = [
  // sendSmsMessage
  {
    displayName: 'Brandname',
    name: 'esmsBrandname',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: [SmsMessageResource.NAME_RESOURCE, AccountResource.NAME_RESOURCE],
        operation: ['sendSmsMessage', 'getListTemplate'],
        esmsSmsType: [1, 2, 23],
      },
      hide: {
        esmsSmsType: [8],
      },
    },
    description: 'Tên thương hiệu của bạn.',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'Brandname',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Brandname...',
        typeOptions: {
          searchListMethod: 'getListBrandname',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn...',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
        url: '=https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-brandname?utm_media={{$value}}',
      }
    ]
  },

  // sendViberMessage
  {
    displayName: 'Brandname',
    name: 'esmsBrandname',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: [OttMessageResource.NAME_RESOURCE],
        operation: ['sendViberMessage'],
      }
    },
    description: 'Tên thương hiệu của bạn.',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'Brandname',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Brandname...',
        typeOptions: {
          searchListMethod: 'getListBrandname',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn...',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
        url: '=https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-brandname?utm_media={{$value}}',
      }
    ],
  },

  // sendZnsMessage
  {
    displayName: 'ZaloOA',
    name: 'esmsZaloOA',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: [OttMessageResource.NAME_RESOURCE, AccountResource.NAME_RESOURCE],
        operation: ['sendZnsMessage', 'getListTemplate', 'getZnsTemplateInfo'],
      }
    },
    description: 'Lấy danh sách Zalo Official Account (OA)',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'ZaloOA',
        name: 'list',
        type: 'list',
        placeholder: 'Select a ZaloOA...',
        typeOptions: {
          searchListMethod: 'getListZaloOA',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn...',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
        url: '=https://zalo.me/{{$value}}',
      }
    ],
  },

  {
    displayName: 'Template ID',
    name: 'esmsTemplateId',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: [OttMessageResource.NAME_RESOURCE, AccountResource.NAME_RESOURCE],
        operation: ['sendZnsMessage', 'getZnsTemplateInfo'],
      },
      hide: {
        esmsSmsType: [26],
      }
    },
    description: 'Lấy thông tin template ZaloZNS',
    placeholder: 'e.g. 000000...',
    modes: [
      {
        displayName: 'Template ID',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Template ID...',
        typeOptions: {
          searchListMethod: 'getListZnsTemplate',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By ID',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. 000000...',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[0-9]+',
              errorMessage: 'Not a valid Template ID',
            },
          },
        ],
        url: '=https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-template-zalo?utm_media={{$value}}',
      }
    ],
  },
];

export const esmsSmsModel: INodeProperties[] = [
  ...esmsSmsTypeModel,
  ...esmsSenderModel,

  {
    displayName: 'PhoneNumber',
    name: 'esmsPhonenumber',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'e.g. +84912345678',
    description: 'Số điện thoại nhận tin nhắn.',
    displayOptions: {
      show: {
        resource: ['sms_message', 'ott_message'],
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
      }
    },
    typeOptions: {
      regex: '^(\\+84|0)(3|5|7|8|9)[0-9]{8}$',
      regexErrorMessage: 'Số điện thoại không đúng định dạng. Ví dụ: +84912345678 hoặc 0912345678',
    },
  },
  {
    displayName: 'Content',
    name: 'esmsContent',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'Cam on quy khach su dung dich vu cua chung toi. Chuc quy khach sinh nhat vui ve. Hotline 1900 xxxx',
    description: 'Nội dung tin nhắn.',
    displayOptions: {
      show: {
        resource: ['sms_message', 'ott_message'],
        operation: ['sendSmsMessage', 'sendViberMessage'],
      }
    },
  },

  {
    displayName: 'Template Parameters',
    name: 'esmsZnsTemplateParameters',
    type: 'fixedCollection',
    placeholder: 'Add parameter',
    default: {},
    description: 'Thêm các tham số động của template',
    displayOptions: {
      show: {
        resource: ['ott_message'],
        operation: ['sendZnsMessage'],
      },
      hide: {
        esmsSmsType: [26],
      },
    },
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        displayName: 'Parameters',
        name: 'parameters',
        values: [
          {
            displayName: 'Parameter Name',
            name: 'paramKey',
            type: 'options',
            default: '',
            typeOptions: {
              loadOptionsDependsOn: ['esmsZnsTemplate.value'],
              loadOptionsMethod: 'getLoadZnsTemplateParameters',
            },
          },
          {
            displayName: 'Value',
            name: 'paramValue',
            type: 'string',
            default: '',
          },
        ],
      },
    ],
  }
];

export const esmsOptionModel: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: '',
    options: [
      {
        displayName: 'IsUnicode',
        name: 'esmsIsUnicode',
        type: 'boolean',
        default: false,
        description: 'Gửi nội dung tin nhắn dưới dạng Unicode (hỗ trợ tiếng Việt, ký tự đặc biệt).',
      },
      {
        displayName: 'Sandbox',
        name: 'esmsIsSandbox',
        type: 'boolean',
        default: false,
        description: 'Gửi tin nhắn trong môi trường sandbox (dành cho mục đích thử nghiệm, không mất phí).',
      },
      {
        displayName: 'Partner Source',
        name: 'esmsPartnerSource',
        type: 'number',
        default: 0,
        description: 'Mã định danh nguồn đối tác gửi tin (sử dụng khi ESMS yêu cầu phân luồng đối tác).',
      },
      {
        displayName: 'Logging Request',
        name: 'esmsIsLoggingRequest',
        type: 'boolean',
        default: false,
        description: 'Bật ghi log cho từng request gửi đến API để phục vụ mục đích kiểm tra và debug.',
      },
    ],
  },
];
