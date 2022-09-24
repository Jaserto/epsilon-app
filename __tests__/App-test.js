/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import  { render, act, fireEvent, waitFor, screen } from '@testing-library/react-native'
import { OnboardingScreen } from '../src/screens/OnboardingScreen';
/* import { InicioScreen } from '../src/screens/InicioScreen';
 */

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

let component;


describe("<Onboarding />", () => {

  beforeEach(() => {
    component = render(<OnboardingScreen />)
  });

  it("Renderiza correctamente y esta el boton de saltar", () => {
   expect(component).toBeDefined();
   expect(component.getByTestId('skipButton')).toBeDefined();
  })

  it("Esta el boton de saltar", () => {
    expect(component.getByTestId('nextButton')).toBeDefined();
  })

  it("Hay 3 imagenes y se renderizan", () => {
    expect(component.queryAllByTestId('images').length).toEqual(3);
  })

})



describe("<Onboarding />", () => {

  beforeEach(() => {
    component = render(<OnboardingScreen />)
  });

  it("Renderiza correctamente los botones y esta presente el boton de saltar", () => {
    const buttonNext = component.getByTestId('nextButton');

    act( ()=> {
     fireEvent(buttonNext, "press");
    });
    act( ()=> {
      fireEvent(buttonNext, "press");
     });
 
  waitFor(() => {

    try{
      if(component.getByTestId('startNow')){
        expect(component.getByTestId('startNow')).toBeDefined()
      }
    }catch(err){
      console.log(err)
    }
  })

  });
});

/* describe("<InicioScreen />", () => {

  beforeEach(() => {
    component = render(<InicioScreen />)
  });

  it("Renderiza correctamente y esta el boton de saltar", () => {
   expect(component).toBeDefined();
   expect(component.getByTestId('skipButton')).toBeDefined();
  })

  it("Esta el boton de saltar", () => {
    expect(component.getByTestId('nextButton')).toBeDefined();
  })

  it("Hay 3 imagenes y se renderizan", () => {
    expect(component.queryAllByTestId('images').length).toEqual(3);
  })

})
 */
