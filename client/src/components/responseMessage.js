import "../css/responseMessage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const ResponseMessage = () => {

    return(<div id="responseMessage">
              <div id="waitingResponse">
                <div class="loader"></div>
                <div>Please wait</div>
              </div>
              <div id="positiveResponse">  
                <FontAwesomeIcon icon={ faCheck } /> 
                <div id="successMessage" />
              </div>
              <div id="negativeResponse">
                <FontAwesomeIcon icon={ faXmark } />
                <div id="errorMessage" />
              </div>
           </div>)
}