import { useEffect, useState } from "react";
import "./App.css";
import { Fragment } from "react";
import { tennureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

function App() {
  const [emiData, setEmiData] = useState({
    cost: 0,
    interest: 10,
    processingFee: 0,
    downPayment: 0,
    tenure: 12,
    emi: 0,
  });

  useEffect(() => {
    if (!(cost > 0)) {
      setEmiData((prev) => {
        return { ...prev, emi: 0, downPayment: 0 };
      });
    }

    const emi = calculateEmi(emiData.downPayment);
    if (emi)
      setEmiData((prev) => {
        return { ...prev, emi };
      });
  }, [emiData.tenure, emiData.cost]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if ((name === "processingFee" || name === "interest") && (value > 100 || value < 1)) return;

    setEmiData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const calculateEmi = (downPayment) => {
    //EMI amount  = [p x r x (1+r)^n] / [(1+r)^n-1]

    if (!emiData.cost) return;

    const loanAmount = emiData.cost - downPayment;
    const rateOfInterest = emiData.interest / 100;
    const numberOfYears = emiData.tenure / 12;

    const emiAmount = (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) / (1 + rateOfInterest) ** (numberOfYears - 1);
    return Number(emiAmount / 12).toFixed(0);
  };

  const updateDownpayment = (e) => {
    if (!emiData.cost) {
      return;
    }
    const _emi = Number(e.target.value);
    setEmiData((prev) => {
      return {
        ...prev,
        emi: _emi.toFixed(0),
      };
    });

    //calculate downpaymant and update it
    const _dp = calculateDownpayment(_emi);
    setEmiData((prev) => {
      return {
        ...prev,
        downPayment: _dp,
      };
    });
  };

  const calculateDownpayment = (emi) => {
    if (!emiData.cost) return;

    const dpPercentage = 100 - (emi / calculateEmi(0)) * 100;
    return Number((dpPercentage / 100) * emiData.cost).toFixed(0);
  };
  const updateEmi = (e) => {
    if (!emiData.cost) {
      return;
    }
    const dp = Number(e.target.value);
    setEmiData((prev) => {
      return {
        ...prev,
        downPayment: dp.toFixed(0),
      };
    });

    //calculate emi and update it
    const _emi = calculateEmi(dp);
    setEmiData((prev) => {
      return {
        ...prev,
        emi: _emi,
      };
    });
  };

  const prepareTotalDownPayment = () => {
    return numberWithCommas((Number(emiData.downPayment) + (emiData.cost - emiData.downPayment) * (emiData.processingFee / 100)).toFixed(0));
  };

  const prepareTotalEMI = () => {
    return numberWithCommas(Number(emiData.emi * emiData.tenure).toFixed(0));
  };

  return (
    <Fragment>
      <span className="title">EMI Calculator</span>

      <form className="form-wrapper">
        <TextInput
          formLabel={"Total cost of Asset"}
          id="cost"
          name="cost"
          type="number"
          value={emiData.cost}
          placeholder={"Total cost of Asset"}
          handleChangeInput={handleChangeInput}
        />
        <TextInput
          formLabel={"Interest Rate (in %)"}
          id="interest"
          name="interest"
          type="number"
          value={emiData.interest}
          placeholder={"Interest rate"}
          handleChangeInput={handleChangeInput}
        />
        <TextInput
          formLabel={"Processing Fee (in %)"}
          id="processingFee"
          name="processingFee"
          type="number"
          value={emiData.processingFee}
          placeholder={"Processing fee"}
          handleChangeInput={handleChangeInput}
        />
        <SliderInput
          label={"Down Payment"}
          labelInformation={`Total Down Payment - ${prepareTotalDownPayment()}`}
          id="downPayment"
          name="downPayment"
          min={0}
          max={emiData.cost}
          value={emiData.downPayment}
          labelMin={"0%"}
          labelMax={"100%"}
          handleSliderChange={updateEmi}
        />
        <SliderInput
          label={"Loan per Month"}
          labelInformation={`Total Loan per Month - ${prepareTotalEMI()}`}
          id="emi"
          name="emi"
          min={calculateEmi(emiData.cost)}
          max={calculateEmi(0)}
          value={emiData.emi}
          handleSliderChange={updateDownpayment}
        />
        <span className="form-element">
          <label className="form-label">Tennure</label>
          <div className="tennure-container">
            {tennureData.map((t, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  className={`tennure ${emiData.tenure === t ? "selected" : ""}`}
                  onClick={(e) =>
                    setEmiData((prev) => {
                      return { ...prev, tenure: Number(t) };
                    })
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </span>
      </form>
    </Fragment>
  );
}

export default App;
