import { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");

  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const heightNumber = parseFloat(height);
  const feetNumber = parseFloat(feet);
  const inchesNumber = parseFloat(inches);
  const weightNumber = parseFloat(weight);

  const heightInCm =
    heightUnit === "cm"
      ? heightNumber
      : feetNumber * 30.48 + inchesNumber * 2.54;

  const weightInKg =
    weightUnit === "kg" ? weightNumber : weightNumber * 0.453592;

  const bmi =
    heightInCm > 0 && weightInKg > 0
      ? weightInKg / Math.pow(heightInCm / 100, 2)
      : null;

  const roundedBmi = bmi ? bmi.toFixed(1) : "";
  const ageNumber = parseFloat(age);
  
  let bodyFat = null;
  
  if (bmi && ageNumber > 0) {
  bodyFat =
    gender === "male"
      ? 1.2 * bmi + 0.23 * ageNumber - 16.2
      : 1.2 * bmi + 0.23 * ageNumber - 5.4;
}

const roundedBodyFat =
  bodyFat !== null ? bodyFat.toFixed(1) : "";

  const minHealthyWeightKg =
  heightInCm > 0 ? 18.5 * Math.pow(heightInCm / 100, 2) : null;

const maxHealthyWeightKg =
  heightInCm > 0 ? 24.9 * Math.pow(heightInCm / 100, 2) : null;

const minHealthyWeight =
  minHealthyWeightKg !== null
    ? weightUnit === "kg"
      ? minHealthyWeightKg.toFixed(1)
      : (minHealthyWeightKg / 0.453592).toFixed(1)
    : "";

const maxHealthyWeight =
  maxHealthyWeightKg !== null
    ? weightUnit === "kg"
      ? maxHealthyWeightKg.toFixed(1)
      : (maxHealthyWeightKg / 0.453592).toFixed(1)
    : "";

const healthyWeightUnit = weightUnit === "kg" ? "kg" : "lb";

  let category = "";
  let message = "";

  if (bmi) {
    if (bmi < 18.5) {
      category = "Underweight";
      message = "You may need to gain some healthy weight.";
    } else if (bmi < 25) {
      category = "Healthy weight";
      message = "Your BMI is in the normal range.";
    } else if (bmi < 30) {
      category = "Overweight";
      message = "A small calorie deficit and movement can help.";
    } else {
      category = "Obese";
      message = "It may be worth improving diet, movement, and health habits.";
    }
  }

  function clearInputs() {
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
  }
function switchHeightUnit(newUnit) {
  if (newUnit === heightUnit) return;

  if (newUnit === "ftin" && height) {
    const totalInches = parseFloat(height) / 2.54;
    const newFeet = Math.floor(totalInches / 12);
    const newInches = (totalInches % 12).toFixed(1);

    setFeet(newFeet.toString());
    setInches(newInches.toString());
  }

  if (newUnit === "cm" && feet) {
    const totalCm =
      parseFloat(feet || 0) * 30.48 + parseFloat(inches || 0) * 2.54;

    setHeight(totalCm.toFixed(1));
  }

  setHeightUnit(newUnit);
}

function switchWeightUnit(newUnit) {
  if (newUnit === weightUnit) return;

  if (weight) {
    const currentWeight = parseFloat(weight);

    if (newUnit === "lb") {
      setWeight((currentWeight / 0.453592).toFixed(1));
    }

    if (newUnit === "kg") {
      setWeight((currentWeight * 0.453592).toFixed(1));
    }
  }

  setWeightUnit(newUnit);
}
  return (
    <div className="app">
      <div className="tool-card">
        <h1>BMI Calculator</h1>
        <p className="subtitle">
          Calculate your Body Mass Index using your height and weight.
        </p>

        <div className="unit-buttons">
  <button
    className={gender === "male" ? "active" : ""}
    onClick={() => setGender("male")}
  >
    Male
  </button>

  <button
    className={gender === "female" ? "active" : ""}
    onClick={() => setGender("female")}
  >
    Female
  </button>
</div>

<div className="input-group">
  <label>Age</label>
  <input
    type="number"
    placeholder="Enter age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
  />
</div>
 <label>Height</label>
        <div className="unit-buttons">
          <button
            className={heightUnit === "cm" ? "active" : ""}
            onClick={() => switchHeightUnit("cm")}
          >
            cm
          </button>

          <button
            className={heightUnit === "ftin" ? "active" : ""}
            onClick={() => switchHeightUnit("ftin")}
          >
            ft + in
          </button>
        </div>

      {heightUnit === "cm" ? (
          <div className="input-group">
           
            <input
              type="number"
              placeholder="Enter height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        ) : (
          <div className="double-input">
            <div className="input-group">
              <label>Feet</label>
              <input
                type="number"
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Inches</label>
              <input
                type="number"
                placeholder="Inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
              />
            </div>
          </div>
        )}

        <label>Weight</label>

        <div className="unit-buttons">
          <button
            className={weightUnit === "kg" ? "active" : ""}
            onClick={() => switchWeightUnit("kg")}
          >
            kg
          </button>

          <button
            className={weightUnit === "lb" ? "active" : ""}
            onClick={() => switchWeightUnit("lb")}
          >
            lb
          </button>
        </div>

        <div className="input-group">
          
          <input
            type="number"
            placeholder={weightUnit === "kg" ? "Enter weight in kg" : "Enter weight in lb"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button className="clear-button" onClick={clearInputs}>
          Clear
        </button>

        <div className="result-box">
          {bmi ? (
            <>
              <p className="result-label">Your BMI is</p>
              <div className="result-number">{roundedBmi}</div>
              <p className="category">{category}</p>
              <p className="message">{message}</p>
              {roundedBodyFat && (
  <>
    <hr />
    <p className="result-label">
      Estimated Body Fat
    </p>
    <div className="result-number-small">
      {roundedBodyFat}%
    </div>

    <p className="result-label">
      Healthy Weight Range
    </p>

    <div className="result-number-small">
      {minHealthyWeight} - {maxHealthyWeight} {healthyWeightUnit}
    </div>
  </>
)}
            </>
          ) : (
            <p className="placeholder">Enter your height and weight</p>
          )}
        </div>

        <div className="info-box">
          <p>BMI categories:</p>
          <span>Underweight: below 18.5</span>
          <span>Healthy: 18.5 – 24.9</span>
          <span>Overweight: 25 – 29.9</span>
          <span>Obese: 30+</span>
        </div>
      </div>
    </div>
  );
}

export default App;