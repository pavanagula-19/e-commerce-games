import {loadStripe} from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
  // If collecting shipping 
} from "@stripe/react-stripe-js";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
const stripe = loadStripe('pk_test_51MyVHwSI53mzaOhBpFKDxxdVIAAiMuc1vr74alv0ytHRjLxr3XynEeZPuM8NSiEBmk2mqcAHeOzlxwt9BtaqNUqz001XmM3QDv')

const loader = 'auto';

const CheckoutPage =() => {
    const {id} = useParams()
    let clientSecret = id
    if(id){
        return (
        <Elements stripe={stripe} options={{clientSecret, loader}}>
            <CheckoutForm />
        </Elements>
)
    }
  
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { product} = useContext(ProductContext);
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: searchParams.get('cart') ? `http://localhost:3000/order/cart/complete` : `http://localhost:3000/order/${product?.id}/complete`,
      },
    });

    if (error) {
      navigate('/')
    }
  };

  return (
    <MDBContainer className="mb-5" style={{ backgroundColor: "", height: "100vh" }}>
        <MDBRow center>
        <MDBCol md={12} lg={6}>
            <form onSubmit={handleSubmit}>
                <h3>Payment</h3>
                <PaymentElement />
                <div className="d-flex justify-content-end mt-3">
                    <MDBBtn onClick={() => navigate('/')} type="submit">Back</MDBBtn>
                    <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
                </div>
                
            </form>
        </MDBCol>
        </MDBRow>
    
    </MDBContainer>
    
  );
}

export default CheckoutPage
