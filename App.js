import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity,Vibration} from 'react-native';
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from 'react';

const Cacualator = () => {
  const[darkMode, setDarkMode] = useState(false);
  const bgColorFunction = (darkMode) ? "#414853":"#ededed";
  const bgColorNumber = (darkMode) ? "#303946":"#fff";
  const bgColorResult = (darkMode) ? "#282f3b":"#f5f5f5";
  const bgColorThemeButton = (darkMode) ? "#7b8084":"#e5e5e5";
  const bgColorColorHistory = (darkMode) ? "#B5B7BB":"#7c7c7c";
  const colorIcon = (darkMode) ? "white":"black"

  const buttonLeft = [
    ["C", "DEL"],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, "."],
  ]
  const buttonRight = [
    "/","*","-","+","="
  ]
  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setlastNumber] = useState("")
  const calculator =() =>
  {
    let lastChar = currentNumber[currentNumber.length - 1]
    if((lastChar === "+") || (lastChar === "-")||(lastChar ==="*") || (lastChar ==="/")|| (lastChar ==="."))
    {
      setCurrentNumber(currentNumber)
    }
    else{
      let result = eval(currentNumber).toString()
      setCurrentNumber(result)
    }
  }
  const handleInput = (buttonPress) =>{
    switch (buttonPress)
    {
      case "+": case "-": case "*": case "/":
        Vibration.vibrate(35)
        setCurrentNumber(currentNumber + buttonPress)
        break;
      case "DEL":
        Vibration.vibrate(35)
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        break;
      case "C":
        Vibration.vibrate(35)
        setCurrentNumber("")
        setlastNumber("")
        break;
      case "=":
        Vibration.vibrate(35)
        setCurrentNumber(currentNumber + "=")
        calculator()
        break;
      default: 
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber + buttonPress);
        break;
    }
  }
  return (
    <View style = {myStyles.container}>
      <View style = {{...myStyles.containerResult,backgroundColor: bgColorResult}}>
      <TouchableOpacity
       style = {{...myStyles.themeButton,backgroundColor: bgColorThemeButton }} onPress={()=> setDarkMode(!darkMode)}
       >
      <Entypo name = {(darkMode) ? "light-up":"moon"} size ={40} style={{color: colorIcon}} />
      </TouchableOpacity>
      <Text style={{...myStyles.historyText, color: bgColorColorHistory}}>{lastNumber}</Text>
      <Text style={myStyles.resultText}>{currentNumber}</Text>
      </View>
      <View style={myStyles.containerButton}>
        <View style={myStyles.containerButtonLeft}>
          {
            buttonLeft.map((row,index) =>
            <View style={{...myStyles.containerRow,backgroundColor: (index ==0 ? bgColorFunction:bgColorNumber)}}>
              {
                row.map(item =>
                  <TouchableOpacity style={myStyles.button} onPress={()=> handleInput(item)}>
                    <Text style={myStyles.buttonText}>{item}</Text>
                  </TouchableOpacity>
                )
              }
            </View>
            )
          }
        </View>
        <View style={myStyles.containerButtonRight}>
          {
            buttonRight.map((item) =>
            <TouchableOpacity style = {{...myStyles.button}} onPress={() => handleInput(item)}>
                <Text style={{...myStyles.buttonText,color:"#fff"}}>{item}</Text>
            </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  )
}
export default Cacualator;
const myStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerResult:{
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  containerButtonLeft:{
    flex: 3,
  },
  containerButtonRight:{
    flex: 1,
    backgroundColor:"#00b9d6"
  },
  containerButton:{
    flex: 2,
    flexDirection: "row",
  },
  themeButton:{
    marginTop: 50,
    marginLeft: 20,
    borderRadius: 90,
    height: 60,
    width: 60,
    justifyContent:"center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  historyText:{
    fontSize: 20,
    marginRight: 10,
  },
  resultText:{
    color:"#00b9d6",
    fontSize: 35,
    margin: 15,
  },
  button:{
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  buttonText:{
    fontSize: 30,
    fontWeight: "bold"
  },
  containerRow:{
    flex: 1,
    flexDirection: "row"
  },
});
