import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { withRouter } from 'react-router-dom';
import './user-panel.scss';
import { useAuth } from "../../context/auth";

function UserPanel(props) {
    const { setAuthTokens } = useAuth();

    const { menuMode } = props;
    const menuItems = [
        {
            text: 'Profile',
            icon: 'user'
        },
        {
            text: 'Logout',
            icon: 'runner'
        }
    ]
    function onItemClick(args) {
        if (args.itemIndex === 1) {
            setAuthTokens('');
            props.setLoggedIn(false);
        }
        else {
            props.history.push('./profile');
        }
        
    }


    return (
      <div className={'user-panel'}>
        <div className={'user-info'}>
          <div className={'image-container'}>
            <div className={'user-image'} />
          </div>
          <div className={'user-name'}>Sandra Johnson</div>
        </div>

        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.user-button'}
            showEvent={'dxclick'}
            width={170}
            position={{ my: 'top center', at: 'bottom center' }}
            cssClass={'user-menu'}
            onItemClick={onItemClick}
          />
        )}
        {menuMode === 'list' && (
                <List className={'dx-toolbar-menu-action'} items={menuItems} onItemClick={onItemClick} />
        )}
      </div>
    );
  
}
export default withRouter(UserPanel);