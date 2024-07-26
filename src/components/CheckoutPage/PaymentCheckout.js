import React from 'react'
import ButtonCheckout from './ButtonCheckout'

const PaymentCheckout = () => {
  return (
    <div>PaymentCheckout
        <ButtonCheckout text={"Place Order"} callBackFunction={()=> alert("order successfully placed")} />
    </div>
  )
}

export default PaymentCheckout