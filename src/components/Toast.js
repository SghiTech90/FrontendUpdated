import Toast from "react-native-simple-toast";

export async function Toaster(msg) {
  Toast.show(msg, Toast.SHORT);
}
