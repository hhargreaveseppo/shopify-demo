import { useMemo } from "react";
import { getInstance } from "@eppo/js-client-sdk";

const OfferComponent = () => {


    const subjectKey = Math.random().toString();

    const assignedVariation = useMemo(() => {
      const eppoClient = getInstance();
      return eppoClient.getJSONAssignment("cart-promo", subjectKey, {}, {});
    }, []);

    const mystyle = {
      color: assignedVariation.textcolor,
      fontSize: assignedVariation.fontsize
    };

    return (
      // <p>hello</p>
      <div>
        <p style={mystyle}>{assignedVariation.promo}</p>
        {/* {assignedVariation === "default" && <p>50% off widgets!</p>}
        {assignedVariation === "apple-pay" && <p>Buy one widget get one free!</p>}
        {assignedVariation === "control" && <p>Buy a widget today</p>} */}
      </div>
    );
  }

export default OfferComponent;
