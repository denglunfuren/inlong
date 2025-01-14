/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import i18n from '@/i18n';
import type { FieldItemType } from '@/metas/common';
import EditableTable from '@/components/EditableTable';
import { sourceFields } from './common/sourceFields';

const fieldTypesConf = {
  CHAR: (m, d) => (1 <= m && m <= 8000 ? '' : '1 <= M <= 8000'),
  VARCHAR: (m, d) => (1 <= m && m <= 8000 ? '' : '1 <= M<= 8000'),
  NCHAR: (m, d) => (1 <= m && m <= 4000 ? '' : '1 <= M <= 4000'),
  NVARCHAR: (m, d) => (1 <= m && m <= 4000 ? '' : '1 <= M <= 4000'),
  TEXT: () => '',
  NTEXT: () => '',
  XML: () => '',
  BIGINT: (m, d) => (1 <= m && m <= 20 ? '' : '1 <= M <= 20'),
  BIGSERIAL: (m, d) => (1 <= m && m <= 20 ? '' : '1 <= M <= 20'),
  DECIMAL: (m, d) => (1 <= m && m <= 38 && 0 <= d && d < m ? '' : '1 <= M <= 38, 0 <= D < M'),
  MONEY: (m, d) => (1 <= m && m <= 15 && 1 <= d && d <= 4 ? '' : '1 <= M <= 15, 1 <= D <= 4'),
  SMALLMONEY: (m, d) => (1 <= m && m <= 7 && 1 <= d && d <= 4 ? '' : '1 <= M <= 7, 1 <= D <= 4'),
  NUMERIC: (m, d) => (1 <= m && m <= 38 && 0 <= d && d < m ? '' : '1 <= M <= 38, 0 <= D <= M'),
  FLOAT: (m, d) => (1 <= m && m <= 24 ? '' : '1 <= M <= 24'),
  REAL: (m, d) => (1 <= m && m <= 24 ? '' : '1 <= M <= 24'),
  BIT: (m, d) => (1 <= m && m <= 64 ? '' : '1 <= M <= 64'),
  INT: (m, d) => (1 <= m && m <= 11 ? '' : '1 <= M <= 11'),
  TINYINT: (m, d) => (1 <= m && m <= 4 ? '' : '1 <= M <= 4'),
  SMALLINT: (m, d) => (1 <= m && m <= 6 ? '' : '1 <= M <= 6'),
  TIME: () => '',
  DATETIME: () => '',
  DATETIME2: () => '',
  SMALLDATETIME: () => '',
  DATETIMEOFFSET: () => '',
};

const sqlserverFieldTypes = Object.keys(fieldTypesConf).reduce(
  (acc, key) =>
    acc.concat({
      label: key,
      value: key,
    }),
  [],
);

export const sqlServer: FieldItemType[] = [
  {
    type: 'input',
    label: 'JDBC URL',
    name: 'jdbcUrl',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
      placeholder: 'jdbc:sqlserver://127.0.0.1:1433;database=db_name',
    }),
  },
  {
    type: 'input',
    label: i18n.t('meta.Sinks.SQLServer.SchemaName'),
    name: 'schemaName',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
    _renderTable: true,
  },
  {
    type: 'input',
    label: i18n.t('meta.Sinks.SQLServer.ServerTimezone'),
    name: 'serverTimezone',
    initialValue: 'UTC',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
    _renderTable: true,
  },
  {
    type: 'input',
    label: i18n.t('meta.Sinks.SQLServer.TableName'),
    name: 'tableName',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
    _renderTable: true,
  },
  {
    type: 'input',
    label: i18n.t('meta.Sinks.SQLServer.PrimaryKey'),
    name: 'primaryKey',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
    _renderTable: true,
  },
  {
    type: 'radio',
    label: i18n.t('meta.Sinks.EnableCreateResource'),
    name: 'enableCreateResource',
    rules: [{ required: true }],
    initialValue: 1,
    tooltip: i18n.t('meta.Sinks.EnableCreateResourceHelp'),
    props: values => ({
      disabled: [110, 130].includes(values?.status),
      options: [
        {
          label: i18n.t('basic.Yes'),
          value: 1,
        },
        {
          label: i18n.t('basic.No'),
          value: 0,
        },
      ],
    }),
  },
  {
    type: 'radio',
    label: i18n.t('meta.Sinks.SQLServer.AllMigration'),
    name: 'allMigration',
    rules: [{ required: true }],
    initialValue: true,
    props: values => ({
      disabled: [110, 130].includes(values?.status),
      options: [
        {
          label: i18n.t('basic.Yes'),
          value: true,
        },
        {
          label: i18n.t('basic.No'),
          value: false,
        },
      ],
    }),
  },
  {
    type: 'input',
    label: i18n.t('meta.Sinks.Username'),
    name: 'username',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
  },
  {
    type: 'password',
    label: i18n.t('meta.Sinks.Password'),
    name: 'password',
    rules: [{ required: true }],
    props: values => ({
      disabled: [110, 130].includes(values?.status),
    }),
  },
  {
    name: 'sinkFieldList',
    type: EditableTable,
    props: values => ({
      size: 'small',
      editing: ![110, 130].includes(values?.status),
      columns: getFieldListColumns(values),
    }),
  },
];

const getFieldListColumns = sinkValues => {
  return [
    ...sourceFields,
    {
      title: `SQLSERVER${i18n.t('meta.Sinks.SQLServer.FieldName')}`,
      dataIndex: 'fieldName',
      initialValue: '',
      rules: [
        { required: true },
        {
          pattern: /^[a-z][0-9a-z_]*$/,
          message: i18n.t('meta.Sinks.SQLServer.FieldNameRule'),
        },
      ],
      props: (text, record, idx, isNew) => ({
        disabled: [110, 130].includes(sinkValues?.status as number) && !isNew,
      }),
    },
    {
      title: `SQLSERVER${i18n.t('meta.Sinks.SQLServer.FieldType')}`,
      dataIndex: 'fieldType',
      initialValue: sqlserverFieldTypes[0].value,
      type: 'autocomplete',
      props: (text, record, idx, isNew) => ({
        options: sqlserverFieldTypes,
        disabled: [110, 130].includes(sinkValues?.status as number) && !isNew,
      }),
      rules: [
        { required: true },
        () => ({
          validator(_, val) {
            if (val) {
              const [, type = val, typeLength = ''] = val.match(/^(.+)\((.+)\)$/) || [];
              if (fieldTypesConf.hasOwnProperty(type)) {
                const [m = -1, d = -1] = typeLength.split(',');
                const errMsg = fieldTypesConf[type]?.(m, d);
                if (typeLength && errMsg) return Promise.reject(new Error(errMsg));
              } else {
                return Promise.reject(new Error('FieldType error'));
              }
            }
            return Promise.resolve();
          },
        }),
      ],
    },
    {
      title: i18n.t('meta.Sinks.SQLServer.IsMetaField'),
      initialValue: 0,
      dataIndex: 'isMetaField',
      type: 'select',
      props: (text, record, idx, isNew) => ({
        options: [
          {
            label: i18n.t('basic.Yes'),
            value: 1,
          },
          {
            label: i18n.t('basic.No'),
            value: 0,
          },
        ],
      }),
    },
    {
      title: i18n.t('meta.Sinks.SQLServer.FieldFormat'),
      dataIndex: 'fieldFormat',
      initialValue: '',
      type: 'autocomplete',
      props: (text, record, idx, isNew) => ({
        options: ['MICROSECONDS', 'MILLISECONDS', 'SECONDS', 'SQL', 'ISO_8601'].map(item => ({
          label: item,
          value: item,
        })),
      }),
      visible: (text, record) =>
        ['BIGINT', 'DATE', 'TIMESTAMP'].includes(record.fieldType as string),
    },
    {
      title: i18n.t('meta.Sinks.SQLServer.FieldDescription'),
      dataIndex: 'fieldComment',
      initialValue: '',
    },
  ];
};
