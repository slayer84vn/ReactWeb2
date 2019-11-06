import React, { useState } from 'react';
import TextBox from 'devextreme-react/text-box';
import ValidationGroup from 'devextreme-react/validation-group';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';
import './login-form.scss';
import appInfo from '../../app-info';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { o } from 'odata';

function Login(props){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    async function onLoginClick (args) {
        if (!args.validationGroup.validate().isValid) {
            return;
        }
        const data = {
            username: userName,
            password: password
        }
        const response = await o('../api/')
            .post('Users', data)
            .query();
        if (response.token !== '') {
            setAuthTokens(response.token);
            props.setLoggedIn(true);
        }
        else {
            props.setLoggedIn(false);
        }
        args.validationGroup.reset();
    };

    return (
      <ValidationGroup>
        <div className={'login-header'}>
          <div className={'title'}>{appInfo.title}</div>
          <div>Sign In to your account</div>
        </div>
        <div className={'dx-field'}>
          <TextBox
            value={userName}
            onValueChanged={e => {setUserName(e.value);}}
            placeholder={'Login'}
            width={'100%'}
          >
            <Validator>
              <RequiredRule message={'Login is required'} />
            </Validator>
          </TextBox>
        </div>
        <div className={'dx-field'}>
          <TextBox
            mode={'password'}
            value={password}
            onValueChanged={e => {setPassword(e.value);}}
            placeholder={'Password'}
            width={'100%'}
          >
            <Validator>
              <RequiredRule message={'Password is required'} />
            </Validator>
          </TextBox>
        </div>
        <div className={'dx-field'}>
          <CheckBox defaultValue={false} text={'Remember me'} />
        </div>
        <div className={'dx-field'}>
          <Button
            type={'default'}
            text={'Login'}
            onClick={onLoginClick}
            width={'100%'}
          />
        </div>
        <div className={'dx-field'}>
          <Link to={'/recovery'} onClick={e => e.preventDefault()}>Forgot password ?</Link>
        </div>
        <div className={'dx-field'}>
          <Button type={'normal'} text={'Create an account'} width={'100%'} />
        </div>
      </ValidationGroup>
    );

}
export default Login;
