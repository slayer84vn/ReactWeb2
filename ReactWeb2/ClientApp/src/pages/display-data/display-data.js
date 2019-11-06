import React from 'react';
import 'devextreme/data/odata/store';
import ODataStore from 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
  Lookup
} from 'devextreme-react/data-grid';

import { AuthContext } from "../../context/auth";

function DisplayData() {

    var context = React.useContext(AuthContext);
  const dataSource = {
      store: new ODataStore({
          // ODataStore is configured here      
          type: 'odata',
          key: 'PersonId',
          version: 4,
          url: './api/Persons',
          beforeSend: (e) => {
              e.headers = {
                  'Authorization': 'bearer ' + context.authTokens
              }
          },
          withCredentials : true

      }),

      select: [
      'PersonId',
      'LastName',
      'FirstName',
      'HireDate',
      'EnrollmentDate',
      'Discriminator'
    ]
  };


  return (
      <React.Fragment>
        <h2 className={'content-block'}>Display Data</h2>

        <DataGrid
          className={'dx-card wide-card'}
          dataSource={dataSource}
                keyExpr={'PersonId'}
          showBorders={false}
          focusedRowEnabled={true}
          defaultFocusedRowIndex={0}
          columnAutoWidth={true}
          columnHidingEnabled={true}
            >
        <Editing
            mode={'row'}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
        />
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} showInfo={true} />
          <FilterRow visible={true} />

          <Column dataField={'PersonId'} width={90} hidingPriority={2} visible={false}  />
          <Column
                    dataField={'LastName'}
            width={190}
                    caption={'LastName'}
            hidingPriority={8}
          />
          <Column
                    dataField={'FirstName'}
                    caption={'FirstName'}
            hidingPriority={6}
          />
          <Column
                    dataField={'HireDate'}
                    caption={'HireDate'}
                    dataType={'date'}
            hidingPriority={5}
          >
          </Column>
          <Column
                    dataField={'EnrollmentDate'}
                    caption={'EnrollmentDate'}
            dataType={'date'}
            hidingPriority={3}
          />
          <Column
                    dataField={'Discriminator'}
                    caption={'Discriminator'}
            hidingPriority={1}
          />
        </DataGrid>
      </React.Fragment>
    );
};

export default DisplayData;
