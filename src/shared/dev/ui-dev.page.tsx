import React, { CSSProperties } from 'react';
import { Button } from '../components/button';
import Input from "../components/input/input.component.tsx";
import { useForm } from "react-hook-form";
import IconEmail from '~assets/icons/clock.svg';
import IconX from '~assets/icons/smile.svg';

const UIDevPage = () => {
  const { control } = useForm();
  
  const styles: CSSProperties = {
    width: '300px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px'
  };
  
  return (
    <div style={styles}>
      <h1>UI Kit!!!</h1>
      
      <Input
        belongsTo="ui-test-form"
        name="test-field"
        placeholder="Placeholder"
        control={control}
        LeftIcon={IconX}
        RightIcon={IconEmail}
      />
      
      <Input
        belongsTo="ui-test-form"
        name="test-field"
        placeholder="Placeholder"
        control={control}
        LeftIcon={IconX}
        RightIcon={IconEmail}
      />
      
      <Button
        belongsTo="form"
        callback={() => {}}
        LeftIcon={IconX}
        RightIcon={IconEmail}
      >
        Click me!
      </Button>
    </div>
  )
};

export default UIDevPage;
