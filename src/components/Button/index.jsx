import { Button as ButtonMain } from "./styles";


export function Button({children, onPress, disabled}){
  return(
    <ButtonMain onPress={onPress} disabled={disabled}>
      {children}
    </ButtonMain>
  )
}