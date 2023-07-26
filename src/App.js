import './App.css';
import {useState, useEffect} from 'react'

function App() {
  const [outputVal, setOutputVal] = useState("Given inputs do not make a triangle")
  const [sideOneVal, setSideOneVal] = useState("")
  const [sideTwoVal, setSideTwoVal] = useState("")
  const [sideThreeVal, setSideThreeVal] = useState("")
  const [angleOneVal, setAngleOneVal] = useState("")
  const [angleTwoVal, setAngleTwoVal] = useState("")
  const [angleThreeVal, setAngleThreeVal] = useState("")
  const [triangle, setTriangle] = useState(null);

  const numericRegex = /^[0-9]*$/;

  const sideOneChange = event => {
    let input = event.target.value;
    if(numericRegex.test(input)) {
      setSideOneVal(input);
      calculateTriangle()
    }
  }
  const sideTwoChange = event => {
    let input = event.target.value;
    if(numericRegex.test(input)) {
      setSideTwoVal(input);
      calculateTriangle()
    }
  }
  const sideThreeChange = event => {
    let input = event.target.value;
    if(numericRegex.test(input)) {
      setSideThreeVal(input);
      calculateTriangle()
    }
  }

  const resetAngleValues = () => {
    setAngleOneVal(0)
    setAngleTwoVal(0)
    setAngleThreeVal(0)
  }

  const validateTriangle = () => {
    if((sideOneVal !== "" && sideTwoVal !== "" && sideThreeVal !== "")) {
      let one = parseInt(sideOneVal)
      let two = parseInt(sideTwoVal)
      let three = parseInt(sideThreeVal)
      setOutputVal("All three numbers present")
      if((one + two <= three) || (one + three <= two) || (two + three <= one)) {
        setOutputVal("Not a triangle- two sides can add to less than the third")
        resetAngleValues();
        return false;
      }
      return {one,two,three};
    }
    else {
      setOutputVal("Give inputs do not make a triangle")
      resetAngleValues();
      return false;
    }
  }

  const classifyTriangle = (one, two, three) => {
    if(one === two && two === three) {
      setOutputVal("Triangle is equilateral ")
    }
    else if(one === two || two === three || one === three) {
      setOutputVal("Triangle is Isosceles")
    }
    else {
      setOutputVal("Triangle is Scalene")
    }
  }

  const calculateOneAngle = (cosine) => {
    const angleInRadians = Math.acos(cosine)
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees
  }

  const calculateAngles = (one, two, three) => {
    const cosA = (two * two + three * three - one * one) / (2 * two * three);
    const cosB = (one * one + three * three - two * two) / (2 * one * three);
    const cosC = (one * one + two * two - three * three) / (2 * one * two);

    let angleA = calculateOneAngle(cosA).toFixed(3)
    let angleB = calculateOneAngle(cosB).toFixed(3)
    let angleC = calculateOneAngle(cosC).toFixed(3)

    return {angleA, angleB, angleC}
  }

  const classifyAngle = (angle) => {
    if(angle < 90.000) {
      return "acute"
    }
    else if(angle == 90.000) {
      return "right"
    }
    else if (angle > 90.000) {
      return "obtuse"
    }
  }


  const calculateTriangle = () => {
    const result = validateTriangle()
    if(result === false) {
      return false
    }
    const {one, two, three} = result
    classifyTriangle(one, two, three)
    const {angleA, angleB, angleC} = calculateAngles(one, two, three)
    setAngleOneVal(angleA + " degrees. Angle is " + classifyAngle(angleA))
    setAngleTwoVal(angleB + " degrees. Angle is " + classifyAngle(angleB))
    setAngleThreeVal(angleC + " degrees. Angle is " + classifyAngle(angleC))
  }

  useEffect(() => {
    calculateTriangle();
  }, [sideOneVal, sideTwoVal, sideThreeVal]);


  return (
    <div className="App">
      <header className="App-header">
        

          <label className='input'>Side 1: 
            <input type="text" value = {sideOneVal}
            onChange = {sideOneChange}
            />
          </label>
          <label className='input'>Side 2: 
            <input type="text" value = {sideTwoVal}
            onChange = {sideTwoChange}
            />
          </label>
          <label className='input'>Side 3: 
            <input type="text" value = {sideThreeVal}
            onChange = {sideThreeChange}
            />
          </label>
          <div className = 'output'>
            <p>{outputVal}</p>
          </div>



          {/* <div>
            <p>Side one value = {sideOneVal}</p>
          </div>
          <div>
            <p>Side two value = {sideTwoVal}</p>
          </div>
          <div>
            <p>Side three value = {sideThreeVal}</p>
          </div> */}
  
          <div>
            <p>Angle one = {angleOneVal}</p>
            <p>Angle two = {angleTwoVal}</p>
            <p>Angle three = {angleThreeVal}</p>
          </div>
      </header>
    </div>
  );
}

export default App;
